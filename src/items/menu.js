/*
 * OS.js - JavaScript Cloud/Web Desktop Platform
 *
 * Copyright (c) 2011-2018, Anders Evenrud <andersevenrud@gmail.com>
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

const menuIcon = require('../logo-white-32x32.png');
const defaultIcon = require('../logo-blue-32x32.png');

const getIcon = (m) => m.icon
  ? `/apps/${m._path}/${m.icon}`
  : defaultIcon;

const getTitle = item => // TODO
  item.title && item.title.en_EN
    ? item.title.en_EN
    : item.name;

const makeTree = (core, metadata) => {
  const configuredCategories = core.config('application.categories') || {
    other: {
      label: 'Other',
      icon: {name: 'applications-other'}
    }
  };

  const categories = {};

  metadata.forEach((m) => {
    const cat = Object.keys(configuredCategories).find(c => c === m.category) || 'other';
    const found = configuredCategories[cat];

    if (!categories[cat]) {
      categories[cat] = {
        icon: found.icon ? {name: found.icon} : defaultIcon,
        label: found.label,
        items: []
      };
    }

    categories[cat].items.push({
      icon: getIcon(m),
      label: getTitle(m),
      data: {
        name: m.name
      }
    });
  });

  const system = [{
    icon: defaultIcon,
    label: 'Save Session & Log Out',
    data: {
      action: 'saveAndLogOut'
    }
  }, {
    icon: defaultIcon,
    label: 'Log Out',
    data: {
      action: 'logOut'
    }
  }];

  return [...Object.values(categories), ...system];
};

/**
 * Menu
 *
 * @desc Menu Panel Item
 */
export default class MenuPanelItem extends PanelItem {

  render(state, actions) {
    const logout = async (save) => {
      if (save) {
        await this.core.make('osjs/session').save();
      }

      this.core.make('osjs/auth').logout();
    };

    const onclick = (ev) => {
      const packages = this.core.make('osjs/packages')
        .metadata
        .filter(m => m.type === 'application');

      this.core.make('osjs/contextmenu').show({
        menu: makeTree(this.core, [].concat(packages)),
        position: ev.target,
        callback: (item) => {
          const {name, action} = item.data || {};

          if (name) {
            this.core.make('osjs/package', name);
          } else if (action === 'saveAndLogOut') {
            logout(true);
          } else if (action === 'logOut') {
            logout(false);
          }
        }
      });
    };

    return super.render('menu', [
      h('span', {
        onclick,
        style: {
          backgroundImage: `url(${menuIcon})`
        }
      }, 'Menu')
    ]);
  }

}
