use serde::{Deserialize, Serialize};
use ts_rs::TS;

use crate::{GenericAccount, Interface, PlatformId};

#[derive(TS, Serialize, Deserialize)]
#[serde(tag = "status", content = "data")]
#[ts(export)]
pub enum AuthStatus {
  Success(PlatformId),
  RequiresSecondFactor,
  Error(String),
}

impl From<onlivfe::LoginError> for AuthStatus {
  fn from(value: onlivfe::LoginError) -> Self {
    match value {
      onlivfe::LoginError::RequiresAdditionalFactor(_id) => {
        Self::RequiresSecondFactor
      }
      onlivfe::LoginError::Error(e) => Self::Error(e),
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
  let status = resp.map_or_else(AuthStatus::from, |id| {
    AuthStatus::Success(PlatformId::from(id))
  });

  Ok(status)
}
