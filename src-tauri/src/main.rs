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

fn main() {
  tauri::Builder::default()
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
