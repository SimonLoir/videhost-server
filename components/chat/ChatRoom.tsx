import React, { useState } from 'react';
import io from 'socket.io-client';
import chat from '../../styles/Chat.module.scss';
import SendIcon from '@material-ui/icons/Send';
import { useRouter } from 'next/router';
import Message from './Message';
let socket: SocketIOClient.Socket;
export default function Chat(props) {
    const router = useRouter();
    return <ChatSimple {...props} router={router} />;
}

class ChatSimple extends React.Component {
    public state: {
        loggedIn: boolean;
        value: string;
        messages: any[];
        id: any;
    };
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            value: '',
            messages: [],
            id: props.router.query.id,
        };
    }
    componentDidMount() {
        fetch('/api/socket').finally(() => {
            socket = io();

            socket.on('connect', () => {
                console.log('connect');
                socket.emit('login', {
                    token: 'test',
                    id: socket.id,
                    name: this.state.id,
                });
            });

            socket.on('auth', (id) => {
                if (id == socket.id) {
                    this.setState({ loggedIn: true });
                }
            });

            socket.on('message', (message) => {
                console.log('message', message);
                this.state.messages.push(message);
                this.setState({});
            });
        });
    }
    render() {
        return (
            <div className={chat.room}>
                {this.state.loggedIn ? (
                    <>
                        <div className={chat.header}>Messages</div>
                        <div className={chat.messages}>
                            {this.state.messages.map((m, i) => (
                                <Message
                                    key={i}
                                    message={m.value}
                                    author={m.author}
                                />
                            ))}
                        </div>
                        <div className={chat.sender_actions}>
                            <input
                                type='text'
                                value={this.state.value}
                                onChange={(e) => {
                                    this.setState({ value: e.target.value });
                                }}
                            />
                            <button
                                onClick={() => {
                                    if (this.state.value.trim().length > 3) {
                                        socket.emit(
                                            'message-' + this.state.id,
                                            {
                                                value: this.state.value.trim(),
                                                author: socket.id,
                                            }
                                        );
                                        this.setState({ value: '' });
                                    }
                                }}
                            >
                                <SendIcon />
                            </button>
                        </div>
                    </>
                ) : (
                    <div>Chargement du chat ...</div>
                )}
            </div>
        );
    }
}
