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
import Panel from './panel';
import WindowsPanelItem from './items/windows';
import TrayPanelItem from './items/tray';
import ClockPanelItem from './items/clock';
import MenuPanelItem from './items/menu';

/**
 * OS.js Panel Service Provider
 *
 * Provides methods to handle panels on a desktop
 */
export default class PanelServiceProvider {

  constructor(core, args = {}) {
    this.core = core;
    this.panels = [];
    this.registry = args.registry || {};
  }

  destroy() {
    this.panels.forEach(panel => panel.destroy());
    this.panels = [];
  }

  async init() {
    this.core.singleton('osjs/panels', () => ({
      register: (...args) => this._registerPanelItem(...args),
      create: (...args) => this._createPanel(...args),
      get: (...args) => this._getPanelItem(...args)
    }));

    // Default provided panel items
    this._registerPanelItem('menu', MenuPanelItem);
    this._registerPanelItem('windows', WindowsPanelItem);
    this._registerPanelItem('tray', TrayPanelItem);
    this._registerPanelItem('clock', ClockPanelItem);
  }

  start() {
    this._createPanel();
    this.panels.forEach(p => p.init());
  }

  _createPanel(options = {}) {
    const panel = new Panel(this.core, options);
    this.panels.push(panel);
  }

  _registerPanelItem(name, classRef) {
    this.registry[name] = classRef;
  }

  _getPanelItem(name) {
    return this.registry[name];
  }

}
