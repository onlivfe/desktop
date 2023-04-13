//! The tauri wrapper app for the onlivfe web UI

#![cfg_attr(nightly, feature(doc_auto_cfg))]
#![deny(clippy::all)]
#![forbid(unsafe_code)]
#![deny(clippy::cargo)]
#![warn(missing_docs)]
#![deny(rustdoc::invalid_html_tags)]
#![warn(rustdoc::missing_doc_code_examples)]
#![warn(clippy::pedantic)]
#![warn(clippy::nursery)]
// Not much can be done about it :/
#![allow(clippy::multiple_crate_versions)]
#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use ts_rs::TS;

#[derive(TS)]
#[ts(export)]
pub enum PlatformType {
  VRChat,
  ChilloutVR,
  NeosVR,
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

#[derive(TS)]
#[ts(export)]
pub struct PlatformId((PlatformType, String));

impl From<onlivfe::PlatformAccountId> for PlatformId {
  fn from(value: onlivfe::PlatformAccountId) -> Self {
    PlatformId((PlatformType::from(value.platform()), value.id_as_string()))
  }
}

#[derive(TS)]
#[ts(export)]
pub struct GenericAccount {
  pub id: PlatformId,
}

impl From<onlivfe::PlatformAccount> for GenericAccount {
  fn from(v: onlivfe::PlatformAccount) -> Self {
    let id = PlatformId::from(v.id());
    match v {
      onlivfe::PlatformAccount::VRChat(v) => Self { id },
      onlivfe::PlatformAccount::ChilloutVR(v) => Self { id },
      onlivfe::PlatformAccount::NeosVR(v) => Self { id },
    }
  }
}

fn main() {
  tauri::Builder::default()
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
