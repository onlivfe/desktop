## features

- single identity/profile across multiple social VR platforms
- see people currently online
  - ~~single area with multiple platforms~~

## data

- 

## hurdles

- managing multiple user profiles/identities, with multiple accounts
- multiple accounts for a single user
  - SOLUTION: create "mappings", which can be shared, and are not tied to a unique id globally
  - if there is a sync/someone updates a mapping from someone else
    - check existing user ids when there is a profile sync push
    - ask the user if they want to overwrite
- using an account on multiple computers/vms

## ui design

- displays which instances your friends are in (most users by default)
- generally who is online
- preference to icons and colors, rather than text, if possible
  - world icons and user icons
  - in VRCX, it does not display world icons
- (optional) draggable windows/layers
- general idea of viewing information at a glance and allow it to be compared (if possible)
- breakpoint for wider screens: wide would be sidebar, narrow would be modal/draggable window - also selectable by user for override
- 