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
import * as languages from '../locales';

export default class UserPanelItem extends PanelItem {
  
  render(state, actions) {
    const _ = this.core.make('osjs/locale').translate;
    const __ = this.core.make('osjs/locale').translatable(languages);
    
    const onclick = ev => {
      this.core.make('osjs/contextmenu').show({
        position: ev.target,
        menu: [
          { label: __('LBL_SAVE_AND_LOG_OUT'), onclick: async ev => {
            await this.core.make('osjs/session').save();
            this.core.make('osjs/auth').logout();
          } },
          { label: __('LBL_LOG_OUT'), onclick: ev => this.core.make('osjs/auth').logout() }
        ]
      });
    };
    
    return super.render('menu', [
      h('span', {
        onclick,
        style: {
          backgroundImage: this.core.make('osjs/theme').icon('user-info') /* TODO: use user profile icon */
        }
      },this.core.make('osjs/auth').user().username)
    ])
  }
  
}
