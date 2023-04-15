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
// Better to be able to name types properly for TS
#![allow(clippy::module_name_repetitions)]
#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]
// We're using the same that other onlivfe crates do
#![allow(clippy::wildcard_dependencies)]

type Interface =
  onlivfe_wrapper::Onlivfe<onlivfe_cache_store::OnlivfeCacheStorageBackend>;

mod auth;
pub use auth::*;
mod user;
pub use user::*;

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
