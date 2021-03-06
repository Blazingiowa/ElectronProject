import React from "react";
import { hashHistory } from "react-router";
import RoomItem from "./RoomItem";
import firebase from "firebase/firebase-browser";

const ICON_CHAT_STYLE = {
    fontsize: 120,
    color: "#DDD"
};

const FROM_STYLE = {
    display: "flex"
};

const BUTTON_STYLE = {
    marginLeft: 10
};

export default class Rooms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomName: "",
            rooms: []
        };

        this.db = firebase.database();
        this.handleOnChangeRoomName = this.handleOnChangeRoomName.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    componentDidMount() {
        //コンポ初期化時にチャットルーム一覧取得
        this.fetchRooms();
    }

    handleOnChangeRoomName(e) {
        this.setState({
            roomName: e.target.value
        });
    }

    //新規チャットルーム作成処理
    handleOnSubmit(e) {
        const { roomName } = this.state;
        e.preventDefault();
        if (!roomName.length) {
            return;
        }
        //firebaseにチャットルームデータ作成
        const newRoomRef = this.db.ref("/chatrooms").push();
        const newRoom = {
            description: roomName
        };
        newRoomRef.update(newRoom).then(() => {
            this.setState({ roomName: "" });
            return this.fetchRooms().then(() => {
                hashHistory.push(`/rooms/${newRoomRef.key}`);
            });
        });
    }

    //チャットルーム一覧の取得処理
    fetchRooms() {
        return this.db.ref("/chatrooms").limitToLast(20).once("value").then(snapshot => {
            const rooms = [];
            snapshot.forEach(item => {
                rooms.push(Object.assign({ key: item.key }, item.val()));
            });
            this.setState({ rooms });
        });
    }

    //チャットルーム描画処理
    renderRoomList() {
        const { roomId } = this.props.params;
        const { rooms, roomName } = this.state;
        return (
            <div className="list-group">
                {rooms.map(r => <RoomItem room={r} key={r.key} selected={r.key === roomId} />)}
                <div className="list-group-header">
                    <form style={FROM_STYLE} onSubmit={this.handleOnSubmit}>
                        <input type="text" className="form-control" placeholder="New room" onChange={this.handleOnChangeRoomName} value={roomName} />
                        <button className="btn btn-default" style={BUTTON_STYLE}>
                            <span className="icon icon-plus" />
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    //チャットルーム詳細の描画
    renderRoom() {
        if (this.props.children) {
            return this.props.children;
        }

        else {
            return (
                <div className="text-center">
                    <div style={ICON_CHAT_STYLE}>
                        <span className="icon icon-chat" />
                    </div>
                    <p>
                        Join a chat room from the sider on create your chat room.
                    </p>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="pane-group">
                <div className="pane-sm sidebar">{this.renderRoomList()}</div>
                <div className="pane">{this.renderRoom()}</div>
            </div>
        );
    }
}

