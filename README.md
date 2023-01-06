# Onlivfe desktop

Onlivfe is tool that allows for listing your friends quickly on different platforms, mainly social VR, without having to actually open the actual platform's game/interface programs individually.

## Installation & updating

This is very early in progress, there aren't any installable packages yet.

### Smart Screen

Edge and Chrome apparently treat all unsigned executables as viruses.
Getting a trusted signing certificate would cost a lot of money, which we're not doing for a hobby project.

There's a decent chance that you can click on "Show more" type of buttons to manage to still download the self-signed executable.
You could also use Firefox with download scanning disabled.
Or you could completely disable smart screen (We wouldn't recommend it though).

If you're paranoid about the security or just really techy, We welcome you to [build the app from source](#building) yourself.

## License

To be determined.

Note that the license is [AGPL](https://tldrlegal.com/license/gnu-affero-general-public-license-v3-(agpl-3.0)).
This is mainly meant to prevent anyone from commercializing this application.

In a short and non-legally binding way:
AGPL means that if you make changes and distribute the software, you will also have to provide the source code if asked for it.
In addition you'll need to provide the source code for any remote clients of the application if they ask for it.
You could technically sell it, but you'd still need to give out the source code if asked for it as well as build instructions, at which point, why would anyone pay you for it if they can just build it for free?

This isn't legal advice of course, just my interpretation of the license.

## Development

If you encounter bugs or have any other feedback, you can find me `ljoonal#2847` in the NeosVR/ChilloutVR discord as well as the Neos Modding discord server.

### Requirements

Basic requirements:

- [Git](https://git-scm.com)
- [Rust](https://www.rust-lang.org/)

### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

### Building

Start off by cloning the project with git.

```sh
git clone --recurse-submodules https://github.com/onlivfe/desktop
```

Then open the project folder in your terminal, run `yarn` and after the packages have been installed, you can run `yarn tauri dev` for a local dev build.
