# Changelog for osjs-panels

## 3.0.29 - 2020-11-26

* Updated dependencies

## 3.0.28 - 2020-08-17

* Added translation fallback

## 3.0.27 - 2020-07-03

* Removed redundant DOM element in windows panelitem

## 3.0.25 - 2020-02-29

* Updated README.md
* Updates to RTL styles
* Updated files section in package.json
* Added timestamps to CHANGELOG.md

## 3.0.24 - 2020-02-17

* Update vi_VN translation (#37)
* Updated en_EN translations

## 3.0.23 - 2020-02-16

* Now using @osjs/dev-meta
* Updated pt_BR translations (#36)

## 3.0.22 - 2020-02-13

* Fixed icon positioning on RTL
* Added missing locales

## 3.0.21 - 2020-02-04

* Added support for showing applications in root menu (#29)
* Updated menu generation
* Updated copyright notices in preambles

## 3.0.20 - 2020-01-15

* Added toggle to application menu (#26)
* Updated a require to import
* Now using @osjs/stylelint-config
* Updated dotfiles
* Updated webpack config
* Updated dependencies
* Moved some devDependencies to dependencies
* Updated exports in main
* Moved @osjs/event-emitter to (non-dev) dependencies.

## 3.0.19 - 2019-08-24

* Added support for disabling contextmenu (#23)

## 3.0.18 - 2019-04-16

* Updated dependencies
* Refactored keyboard shortcut handling (#16)

## 3.0.17 - 2019-03-26

* Added configurable icon in menu panelitem (closes #20)

## 3.0.16 - 2019-03-18

* Updated windows contextmenu

## 3.0.15 - 2019-01-27

* Fixed an issue with window list not initializing with correct windows

## 3.0.14 - 2019-01-26

* Fixed an issue with window list not respecting visiblity attribute

## 3.0.13 - 2019-01-25

* Pass on options from panel item definitions (#22)

## 3.0.12 - 2019-01-20

* Increase click target for panel items (#15)

## 3.0.11 - 2019-01-18

* Updated panelitem event registration
* Added keybinding for opening application menu (#19) (Closes #16)

## 3.0.10 - 2019-01-17

* Updated panel event emitters (#14)
* Updated README
* ESlint pass
* Updated eslintrc
* Updated copyright(s)

## 3.0.9 - 2019-01-01

* Added RTL support

## 3.0.8 - 2018-12-29

* Don't show panel menu when settings are locked

## 3.0.7 - 2018-12-28

* Updated some panel item DOM structure
* Updated dependencies

## 3.0.6 - 2018-12-01

* Sort menu category apps alphabetically (#9)
* Sort menu categories alphabetically (#9)
* Added German (de_DE) translations (#5)

## 3.0.5 - 2018-11-30

* Updated some Core#url usage

## 3.0.4 - 2018-11-22

* Fixed resource resolution in menu item

## 3.0.3 - 2018-11-17

* Menu now supports absolute url icons

## 3.0.2 - 2018-11-03

* Add Slovenian (sl_SI) translation (#6)

## 3.0.1 - 2018-10-27

* Removed @osjs/common

## 3.0.0-alpha.36 - 2018-10-23

* Added French (fr_FR) translations (#4)
* Updated some construction and destruction handling

## 3.0.0-alpha.35 - 2018-10-16

* Some updates to window list panel item

## 3.0.0-alpha.34 - 2018-10-13

* Fixed positioning

## 3.0.0-alpha.33 - 2018-09-30

* Updated dependencies

## 3.0.0-alpha.32 - 2018-09-29

* Updated dependencies

## 3.0.0-alpha.31 - 2018-09-27

* Updated dependencies

## 3.0.0-alpha.30 - 2018-09-16

* Updated launching in application menu

## 3.0.0-alpha.29 - 2018-08-30

* Added vi_VN locales (#3)

## 3.0.0-alpha.28 - 2018-08-21

* Updated dependencies
* Updated some metadata usage

## 3.0.0-alpha.27 - 2018-08-18

* Added localization

## 3.0.0-alpha.26 - 2018-07-27

* Updated window listing item
* Correctly destroy panel items on #destroy
* Separate tray click events
* Fixed eslint comment warnings

## 3.0.0-alpha.25 - 2018-07-24

* Temporarily change to blue image in menu

## 3.0.0-alpha.24 - 2018-07-24

* Prebuild npm package

## 3.0.0-alpha.23 - 2018-07-20

* Fixed text cut-off in certain areas

## 3.0.0-alpha.22 - 2018-07-18

* Added travis-ci badge to README
* Lint pass
* Added initial travis-ci config

## 3.0.0-alpha.21 - 2018-07-16

* Added separator to Menu

## 3.0.0-alpha.20 - 2018-07-16

* Better settings storage handling

## 3.0.0-alpha.19 - 2018-07-14

* Added contextmenu + position select to panels

## 3.0.0-alpha.18 - 2018-07-14

* Window list item now automatically expands items

## 3.0.0-alpha.17 - 2018-07-13

* Window list now respects 'visibility' attribute

## 3.0.0-alpha.16 - 2018-06-18

* Updated usage og PM provider in Menu item
* Add locale for application categories
* Removed unwanted dotfile
* Added missing .eslintrc
* Added missing .gitignore

## 3.0.0-alpha.15 - 2018-06-09

* Add locale support for clock
* Added locale support for menu applications

## 3.0.0-alpha.14 - 2018-06-05

* Hide 'hidden' packages from launch menu (#2)

## 3.0.0-alpha.13 - 2018-05-25

* Added ontop panel attribute
* Support multiple panel positions
* Added icon to menu

## 3.0.0-alpha.12 - 2018-05-23

* Updated Menu titles (#1)

## 3.0.0-alpha.11 - 2018-05-23

* Removed static initialization of panels (now done in client)

## 3.0.0-alpha.10 - 2018-05-06

* Added npmignore
* Added CHANGELOG

## 3.0.0-alpha.9 - 2018-04-27

* Load items from options in Panel
* Now using '@osjs/common' module
* Added esdoc config

## 3.0.0-alpha.8 - 2018-04-07

* Updated menu to latest packages api

## 3.0.0-alpha.7 - 2018-03-31

* Updated docs
* Minor cleanup
* Added panel item registry w/configuration support

## 3.0.0-alpha.6 - 2018-03-25

* Menu can now use configured application categories
* Remove debug message
* Split up styles
* Vertically align tray icons
* Added Tray item
* Updated application launch events in window panel item
* Corrected URLs in package.json

## 3.0.0-alpha.5 - 2018-03-19

Initial public release
