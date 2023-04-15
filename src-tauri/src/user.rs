use serde::{Deserialize, Serialize};
use ts_rs::TS;

#[derive(TS, Serialize, Deserialize)]
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

#[derive(TS, Serialize, Deserialize)]
#[ts(export)]
pub struct PlatformId((PlatformType, String));

impl From<onlivfe::PlatformAccountId> for PlatformId {
  fn from(value: onlivfe::PlatformAccountId) -> Self {
    Self((PlatformType::from(value.platform()), value.id_as_string()))
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
            .unwrap_or(&user.base.current_avatar_image_url)
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
          .map_or_else(String::new, |v| v.to_string()),
      },
    }
  }
}
