/*
 * OS.js - JavaScript Cloud/Web Desktop Platform
 *
 * Copyright (c) 2011-2019, Anders Evenrud <andersevenrud@gmail.com>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * @author  Anders Evenrud <andersevenrud@gmail.com>
 * @licence Simplified BSD License
 */

import {h} from 'hyperapp';
import PanelItem from '../panel-item';

const mapWindow = win => {
  return {
    wid: win.wid,
    icon: win.state.icon,
    title: win.state.title,
    focused: win.state.focused,
    attributes: Object.assign({}, win.attributes),
    state: Object.assign({}, win.state),
    raise: () => {
      win.raise();
      win.focus();
    },
    restore: () => win.restore(),
    maximize: () => win.maximize(),
    minimize: () => win.minimize(),
    close: () => win.close()
  };
};

/**
 * Window List
 *
 * @desc Window List Panel Item. Also displays launching applications.
 */
export default class WindowsPanelItem extends PanelItem {

  init() {
    if (this.inited) {
      return;
    }

    const filter = win => !win.inited || !win.rendered ||
      typeof win.attributes.visibility === 'undefined' ||
      win.attributes.visibility === 'global';

    const actions = super.init({
      launchers: [],
      windows: this.core.make('osjs/windows').list()
        .filter(filter)
        .map(mapWindow)
    }, {
      add: win => state => {
        const found = state.windows.find(w => w.wid === win.wid);
        if (found) {
          return state;
        }

        const windows = state.windows
          .filter(filter)
          .concat([win]);

        return {windows};
      },

      remove: win => ({windows}) => {
        const foundIndex = windows.findIndex(w => w.wid === win.wid);
        if (foundIndex !== -1) {
          windows.splice(foundIndex, 1);

          return {windows};
        }

        return {};
      },

      change: win => state => {
        const windows = state.windows;
        const foundIndex = state.windows.findIndex(w => w.wid === win.wid);
        if (foundIndex !== -1) {
          windows[foundIndex] = win;
        }

        return {windows};
      },

      addLauncher: name => state => ({launchers: [...state.launchers, name]}),

      removeLauncher: name => state => {
        const foundIndex = state.launchers.findIndex(n => n === name);
        const launchers = [...state.launchers];
        if (foundIndex !== -1) {
          launchers.splice(foundIndex, 1);
        }

        return {launchers};
      }
    });

    const onlaunch = (name) => actions.addLauncher(name);
    const onlaunched = (name) => actions.removeLauncher(name);
    const ondestroy = (win) => actions.remove(mapWindow(win));
    const oncreate = (win) => actions.add(mapWindow(win));
    const onchange = (win) => actions.change(mapWindow(win));

    this.core.on('osjs/application:launch', onlaunch);
    this.core.on('osjs/application:launched', onlaunched);
    this.core.on('osjs/window:destroy', ondestroy);
    this.core.on('osjs/window:render', oncreate);
    this.core.on('osjs/window:change', onchange);

    this.on('destroy', () => {
      this.core.off('osjs/application:launch', onlaunch);
      this.core.off('osjs/application:launched', onlaunched);
      this.core.off('osjs/window:destroy', ondestroy);
      this.core.off('osjs/window:render', oncreate);
      this.core.off('osjs/window:change', onchange);
    });
  }

  render(state, actions) {
    const _ = this.core.make('osjs/locale').translate;
    const windows = state.windows.map(w => h('div', {
      'data-has-image': w.icon ? true : undefined,
      'data-focused': w.focused ? 'true' : 'false',
      onclick: () => w.raise(),
      oncontextmenu: ev => {
        ev.stopPropagation();
        ev.preventDefault();
        this.core.make('osjs/contextmenu').show({
          position: ev.target,
          menu: [
            {
              label: w.state.maximized ? _('LBL_RESTORE') : _('LBL_MAXIMIZE'),
              onclick: () => w.attributes.maximizable ? (w.state.maximized ? w.restore() : w.maximize()) : null,
              disabled: !w.attributes.maximizable
            },
            {
              label: w.state.minimized ? _('LBL_RAISE') : _('LBL_MINIMIZE'),
              onclick: () => w.attributes.minimizable ? (w.state.minimized ? w.raise() : w.minimize()) : null,
              disabled: !w.attributes.minimizable
            },
            {type: 'separator'},
            {
              label: _('LBL_CLOSE'),
              onclick: () => w.attributes.closeable ? w.close() : null,
              disabled: !w.attributes.closeable
            }
          ]
        });
      },
      className: 'osjs-panel-item--clickable osjs-panel-item--icon'
    }, [
      h('img', {
        src: w.icon,
        alt: w.title || '(window)',
      }),
      h('span', {}, w.title || '(window)'),
    ]));

    const special = state.launchers.map(name => h('div', {
    }, h('div', {}, h('span', {}, `Launching '${name}'`))));

    const children = [...windows, ...special];

    return super.render('windows', children);
  }

}
