"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactRouter = require("react-router");

var _Login = require("./Login");

var _Login2 = _interopRequireDefault(_Login);

var _Signup = require("./Signup");

var _Signup2 = _interopRequireDefault(_Signup);

var _Rooms = require("./Rooms");

var _Rooms2 = _interopRequireDefault(_Rooms);

var _Room = require("./Room");

var _Room2 = _interopRequireDefault(_Room);

var _firebaseBrowser = require("firebase/firebase-browser");

var _firebaseBrowser2 = _interopRequireDefault(_firebaseBrowser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Routingの定義
var appRouting = _react2.default.createElement(
    _reactRouter.Router,
    { history: _reactRouter.hashHistory },
    _react2.default.createElement(
        _reactRouter.Route,
        { path: "/" },
        _react2.default.createElement(_reactRouter.Route, { path: "login", component: _Login2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: "signup", component: _Signup2.default }),
        _react2.default.createElement(
            _reactRouter.Route,
            { path: "rooms", component: _Rooms2.default },
            _react2.default.createElement(_reactRouter.Route, { path: ":roomId", component: _Room2.default })
        )
    )
);

// Routingの初期化
if (!location.hash.length) {
    location.hash = "#/login";
}

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAzj4rKz-w-pwP_Ik5bfCkYnMITTvbd_BU",
    authDomain: "electron-chat-70f97.firebaseapp.com",
    databaseURL: "https://electron-chat-70f97.firebaseio.com",
    projectId: "electron-chat-70f97",
    storageBucket: "electron-chat-70f97.appspot.com",
    messagingSenderId: "413714119266",
    appId: "1:413714119266:web:5f004745372e3bb8562f3b",
    measurementId: "G-3TJQPQ8RWB"
};
// Initialize Firebase
_firebaseBrowser2.default.initializeApp(firebaseConfig);
//firebase.analytics();

// Applicationの描画
(0, _reactDom.render)(appRouting, document.getElementById("app"));