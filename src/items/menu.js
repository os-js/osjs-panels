/*
 * OS.js - JavaScript Cloud/Web Desktop Platform
 *
 * Copyright (c) 2011-2020, Anders Evenrud <andersevenrud@gmail.com>
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
import * as languages from '../locales';
import defaultIcon from '../logo-blue-32x32.png';

const sortBy = fn => (a, b) => -(fn(a) < fn(b)) || +(fn(a) > fn(b));
const sortByLabel = iter => String(iter.label).toLowerCase();

const makeTree = (core, icon, __) => {
  const configuredCategories = core.config('application.categories');
  const locale = core.make('osjs/locale');

  const getIcon = (m, fallbackIcon) => m.icon
    ? (m.icon.match(/^(https?:)\//)
      ? m.icon
      : core.url(m.icon, {}, m))
    : fallbackIcon;

  const getTitle = (item) => locale
    .translatableFlat(item.title, item.name);

  const getCategory = (cat) => locale
    .translate(cat);

  const createCategory = c => ({
    icon: c.icon ? {name: c.icon} : icon,
    label: getCategory(c.label),
    items: []
  });

  const createItem = m => ({
    icon: getIcon(m, icon),
    label: getTitle(m),
    data: {
      name: m.name
    }
  });

  const createCategoryTree = (metadata) => {
    const categories = {};

    metadata
      .filter(m => m.hidden !== true)
      .forEach((m) => {
        const cat = Object.keys(configuredCategories).find(c => c === m.category) || 'other';
        const found = configuredCategories[cat];

        if (!categories[cat]) {
          categories[cat] = createCategory(found);
        }

        categories[cat].items.push(createItem(m));
      });

    Object.keys(categories).forEach(k => {
      categories[k].items.sort(sortBy(sortByLabel));
    });

    const result = Object.values(categories);
    result.sort(sortBy(sortByLabel));

    return result;
  };

  const createFlatMenu = (metadata) => {
    const pinned = [
      ...core.config('application.pinned', [])
      // TODO: User configurable pinned items
    ];

    const items = metadata
      .filter(m => pinned.indexOf(m.name) !== -1)
      .map(createItem);

    if (items.length) {
      items.sort(sortBy(sortByLabel));
      return [
        {type: 'separator'},
        ...items
      ];
    }

    return [];
  };

  const createSystemMenu = () => ([{
    type: 'separator'
  }, {
    icon,
    label: __('LBL_SAVE_AND_LOG_OUT'),
    data: {
      action: 'saveAndLogOut'
    }
  }, {
    icon,
    label: __('LBL_LOG_OUT'),
    data: {
      action: 'logOut'
    }
  }]);

  return (metadata) => {
    const categories = createCategoryTree(metadata);
    const flat = createFlatMenu(metadata);
    const system = createSystemMenu();

    return [
      ...categories,
      ...flat,
      ...system
    ];
  };
};

/**
 * Menu
 *
 * @desc Menu Panel Item
 */
export default class MenuPanelItem extends PanelItem {

  render(state, actions) {
    const _ = this.core.make('osjs/locale').translate;
    const __ = this.core.make('osjs/locale').translatable(languages);
    const icon = this.options.icon || defaultIcon;

    const logout = async (save) => {
      if (save) {
        await this.core.make('osjs/session').save();
      }

      this.core.make('osjs/auth').logout();
    };

    const makeMenu = makeTree(this.core, icon, __);

    const onclick = (ev) => {
      const packages = this.core.make('osjs/packages')
        .getPackages(m => (!m.type || m.type === 'application'));

      this.core.make('osjs/contextmenu').show({
        menu: makeMenu([].concat(packages)),
        position: this.$element,
        callback: (item) => {
          const {name, action} = item.data || {};

          if (name) {
            this.core.run(name);
          } else if (action === 'saveAndLogOut') {
            logout(true);
          } else if (action === 'logOut') {
            logout(false);
          }
        },
        toggle: true
      });
    };

    const onmenuopen = () => {
      const els = Array.from(this.panel.$element.querySelectorAll('.osjs-panel-item[data-name="menu"]'));
      els.forEach(el => el.querySelector('.osjs-panel-item--icon').click());
    };

    this.core.on('osjs/desktop:keybinding:open-application-menu', onmenuopen);
    this.on('destroy', () => this.core.off('osjs/desktop:keybinding:open-application-menu', onmenuopen));

    return super.render('menu', [
      h('div', {
        onclick,
        className: 'osjs-panel-item--clickable osjs-panel-item--icon'
      }, [
        h('img', {
          src: icon,
          alt: _('LBL_MENU')
        }),
        h('span', {}, _('LBL_MENU'))
      ])
    ]);
  }

}
