"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _electron = require("electron");

var _createWindow = require("./createWindow");

var _createWindow2 = _interopRequireDefault(_createWindow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setAppMenu() {

    // テンプレートの定義
    var template = [{
        label: "File",
        submenu: [{ label: "New Window", accelerator: "CmdOrCtrl+N", click: _createWindow2.default }, { type: "separator" }, { label: "Close", accelerator: "CmdOrCtrl+W", role: "close" }]
    }, {
        label: "Edit",
        submenu: [{ label: "Copy", accelerator: "CmdOrCtrl+C", role: "copy" }, { label: "Paste", accelerator: "CmdOrCtrl+V", role: "paste" }, { label: "Cut", accelerator: "CmdOrCtrl+X", role: "cut" }, { label: "Select All", accelerator: "CmdOrCtrl+A", role: "selectall" }]
    }, {
        label: "View",
        submenu: [{
            label: "Reload",
            accelerator: "CmdOrCtrl+R",
            click: function click(item, focusedWindow) {
                return focusedWindow && focusedWindow.reload();
            }
        }, {
            label: "Toggle DevTools",
            accelerator: process.platform === "darwin" ? "Alt+Command+I" : "Ctrl+Shift+I",
            click: function click(item, focusedWindow) {
                return focusedWindow && focusedWindow.toggleDevTools();
            }
        }]
    }];

    // macOS特有の処理
    if (process.platform === "darwin") {
        // テンプレート先頭にメインメニューを追加
        template.unshift({
            label: _electron.app.getName(),
            submenu: [{ role: "about" }, { type: "separator" }, { role: "services", submenu: [] }, { type: "separator" }, { role: "hide" }, { role: "hideothers" }, { role: "unhide" }, { type: "separator" }, { role: "quit" }]
        });
        // テンプレート末尾にウィンドウメニューを追加
        template.push({
            role: "window",
            submenu: [{ role: "minimize" }, { role: "zoom" }]
        });
    }

    // テンプレートからMenuオブジェクトを作成
    var appMenu = _electron.Menu.buildFromTemplate(template);

    // 作成したMenuオブジェクトをアプリケーションに設定
    _electron.Menu.setApplicationMenu(appMenu);
}

exports.default = setAppMenu;