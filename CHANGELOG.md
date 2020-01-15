# Changelog for osjs-panels

## 3.0.20

* Added toggle to application menu (#26)
* Updated a require to import
* Now using @osjs/stylelint-config
* Updated dotfiles
* Updated webpack config
* Updated dependencies
* Moved some devDependencies to dependencies
* Updated exports in main
* Moved @osjs/event-emitter to (non-dev) dependencies.

## 3.0.19

* Added support for disabling contextmenu (#23)

## 3.0.18

* Updated dependencies
* Refactored keyboard shortcut handling (#16)

## 3.0.17

* Added configurable icon in menu panelitem (closes #20)

## 3.0.16

* Updated windows contextmenu

## 3.0.15

* Fixed an issue with window list not initializing with correct windows

## 3.0.14

* Fixed an issue with window list not respecting visiblity attribute

## 3.0.13

* Pass on options from panel item definitions (#22)

## 3.0.12

* Increase click target for panel items (#15)

## 3.0.11

* Updated panelitem event registration
* Added keybinding for opening application menu (#19) (Closes #16)

## 3.0.10

* Updated panel event emitters (#14)
* Updated README
* ESlint pass
* Updated eslintrc
* Updated copyright(s)

## 3.0.9

* Added RTL support

## 3.0.8

* Don't show panel menu when settings are locked

## 3.0.7

* Updated some panel item DOM structure
* Updated dependencies

## 3.0.6

* Sort menu category apps alphabetically (#9)
* Sort menu categories alphabetically (#9)
* Added German (de_DE) translations (#5)

## 3.0.5

* Updated some Core#url usage

## 3.0.4

* Fixed resource resolution in menu item

## 3.0.3

* Menu now supports absolute url icons

## 3.0.2

* Add Slovenian (sl_SI) translation (#6)

## 3.0.1

* Removed @osjs/common

## 3.0.0-alpha.36

* Added French (fr_FR) translations (#4)
* Updated some construction and destruction handling

## 3.0.0-alpha.35

* Some updates to window list panel item

## 3.0.0-alpha.34

* Fixed positioning

## 3.0.0-alpha.33

* Updated dependencies

## 3.0.0-alpha.32

* Updated dependencies

## 3.0.0-alpha.31

* Updated dependencies

## 3.0.0-alpha.30

* Updated launching in application menu

## 3.0.0-alpha.29

* Added vi_VN locales (#3)

## 3.0.0-alpha.28

* Updated dependencies
* Updated some metadata usage

## 3.0.0-alpha.27

* Added localization

## 3.0.0-alpha.26

* Updated window listing item
* Correctly destroy panel items on #destroy
* Separate tray click events
* Fixed eslint comment warnings

## 3.0.0-alpha.25

* Temporarily change to blue image in menu

## 3.0.0-alpha.24

* Prebuild npm package

## 3.0.0-alpha.23

* Fixed text cut-off in certain areas

## 3.0.0-alpha.22

* Added travis-ci badge to README
* Lint pass
* Added initial travis-ci config

## 3.0.0-alpha.21

* Added separator to Menu

## 3.0.0-alpha.20

* Better settings storage handling

## 3.0.0-alpha.19

* Added contextmenu + position select to panels

## 3.0.0-alpha.18

* Window list item now automatically expands items

## 3.0.0-alpha.17

* Window list now respects 'visibility' attribute

## 3.0.0-alpha.16

* Updated usage og PM provider in Menu item
* Add locale for application categories
* Removed unwanted dotfile
* Added missing .eslintrc
* Added missing .gitignore

## 3.0.0-alpha.15

* Add locale support for clock
* Added locale support for menu applications

## 3.0.0-alpha.14

* Hide 'hidden' packages from launch menu (#2)

## 3.0.0-alpha.13

* Added ontop panel attribute
* Support multiple panel positions
* Added icon to menu

## 3.0.0-alpha.12

* Updated Menu titles (#1)

## 3.0.0-alpha.11

* Removed static initialization of panels (now done in client)

## 3.0.0-alpha.10

* Added npmignore
* Added CHANGELOG

## 3.0.0-alpha.9

* Load items from options in Panel
* Now using '@osjs/common' module
* Added esdoc config

## v3.0.0-alpha.8

* Updated menu to latest packages api

## v3.0.0-alpha.7

* Updated docs
* Minor cleanup
* Added panel item registry w/configuration support

## v3.0.0-alpha.6

* Menu can now use configured application categories
* Remove debug message
* Split up styles
* Vertically align tray icons
* Added Tray item
* Updated application launch events in window panel item
* Corrected URLs in package.json

## v3.0.0-alpha.5

Initial public release
