//! The tauri wrapper app for the onlivfe web UI

#![cfg_attr(nightly, feature(doc_auto_cfg))]
#![deny(clippy::all)]
#![forbid(unsafe_code)]
#![deny(clippy::cargo)]
#![deny(rustdoc::invalid_html_tags)]
#![warn(clippy::pedantic)]
#![warn(clippy::nursery)]
// Not much can be done about it :/
#![allow(clippy::multiple_crate_versions)]
#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

type Interface =
  onlivfe_wrapper::Onlivfe<onlivfe_cache_store::OnlivfeCacheStorageBackend>;

use serde::{Serialize, Deserialize};
use ts_rs::TS;

#[derive(TS, Serialize, Deserialize)]
#[ts(export)]
pub enum PlatformType {
  VRChat,
  ChilloutVR,
  NeosVR,
}

#[derive(TS, Serialize, Deserialize)]
#[serde(tag = "status", content = "data")]
#[ts(export)]
pub enum AuthStatus {
  Success(PlatformId),
  RequiresSecondFactor,
  Error(String),
}

impl From<onlivfe::PlatformType> for PlatformType {
  fn from(value: onlivfe::PlatformType) -> Self {
    match value {
      onlivfe::PlatformType::VRChat => Self::VRChat,
      onlivfe::PlatformType::ChilloutVR => Self::ChilloutVR,
      onlivfe::PlatformType::NeosVR => Self::NeosVR,
    }
  }
}

#[derive(TS, Serialize, Deserialize)]
#[ts(export)]
pub struct PlatformId((PlatformType, String));

impl From<onlivfe::PlatformAccountId> for PlatformId {
  fn from(value: onlivfe::PlatformAccountId) -> Self {
    PlatformId((PlatformType::from(value.platform()), value.id_as_string()))
  }
}

#[derive(TS, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
pub struct GenericAccount {
  pub id: PlatformId,
  /// Can be an empty string for no picture
  pub pfp_url: String,
  pub display_name: String,
}

impl From<onlivfe::PlatformAccount> for GenericAccount {
  fn from(v: onlivfe::PlatformAccount) -> Self {
    let id = PlatformId::from(v.id());
    match v {
      onlivfe::PlatformAccount::VRChat(v) => {
        let user = v.data.as_user();
        Self {
          id,
          display_name: user.base.display_name.clone(),
          pfp_url: user
            .base
            .profile_pic_override
            .as_ref()
            .unwrap_or_else(|| &user.base.current_avatar_image_url)
            .to_string(),
        }
      }
      onlivfe::PlatformAccount::ChilloutVR(v) => Self {
        id,
        display_name: v.data.base.name,
        pfp_url: v.data.avatar.image_url,
      },
      onlivfe::PlatformAccount::NeosVR(v) => Self {
        id,
        display_name: v.data.username,
        pfp_url: v
          .data
          .profile
          .and_then(|p| p.icon_url)
          .map_or_else(|| "".to_string(), |v| v.to_string()),
      },
    }
  }
}

#[tauri::command]
async fn authenticated_accounts(
  interface: tauri::State<'_, Interface>,
) -> Result<Vec<GenericAccount>, String> {
  let account_ids = interface.authenticated_accounts().await?;
  // TODO: proper async loop
  let mut accounts = vec![];
  for account_id in account_ids {
    accounts.push(
      interface.platform_account(account_id.clone(), account_id).await?.into(),
    );
  }

  Ok(accounts)
}

#[tauri::command]
async fn login(
  interface: tauri::State<'_, Interface>,
  credentials: onlivfe::LoginCredentials,
) -> Result<AuthStatus, String> {
  let resp = interface.login(credentials).await;
  let status = resp.map_or_else(
    |e| {
      match e {
        _ => AuthStatus::Error("An error occurred with the login".to_string()),
      }
    },
    |id| AuthStatus::Success(PlatformId::from(id)),
  );

  Ok(status)
}

fn main() {
  onlivfe_wrapper::init("desktop", env!("CARGO_PKG_VERSION")).unwrap();
  let store =
    onlivfe_cache_store::OnlivfeCacheStorageBackend::new("desktop").unwrap();
  let interface: Interface = onlivfe_wrapper::Onlivfe::new(store).unwrap();
  tauri::Builder::default()
    .manage(interface)
    .invoke_handler(tauri::generate_handler![authenticated_accounts, login])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
