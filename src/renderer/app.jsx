import React from "react";
import { render } from "react-dom";
import { Router, Route, hashHistory } from "react-router";
import Login from "./Login";
import Signup from "./Signup";
import Rooms from "./Rooms";
import Room from "./Room";
import firebase from "firebase/firebase-browser"

// Routingの定義
const appRouting = (
    <Router history={hashHistory}>
        <Route path="/">
            <Route path="login" component={Login} />
            <Route path="signup" component={Signup} />
            <Route path="rooms" component={Rooms}>
                <Route path=":roomId" component={Room} />
            </Route>
        </Route>
    </Router>
);

// Routingの初期化
if (!location.hash.length) {
    location.hash = "#/login";
}

// Your web app's Firebase configuration
const firebaseConfig = {
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
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

// Applicationの描画
render(appRouting, document.getElementById("app"));