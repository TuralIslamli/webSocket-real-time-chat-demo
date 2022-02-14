import React, { useRef, useState } from 'react';

const WebSock = () => {
    const [connected, setConnected] = useState(false)
    const [userName, setUserName] = useState('')
    const [value, setValue] = useState('')
    const [messages, setMessages] = useState([])
    const socket = useRef()

    function connect() {
        socket.current = new WebSocket('ws://localhost:5001')

        socket.current.onopen = () => {
            setConnected(true)
            const message = {
                event: 'connection',
                userName,
                id: Date.now()
            }
            console.log('message :>> ', message);
            socket.current.send(JSON.stringify(message))
        }

        socket.current.onmessage = (event) => {
            console.log('event :>> ', event.data);
            const message = JSON.parse(event.data)
            setMessages(prev => [message, ...prev])
        }

        socket.current.onclose = () => {
            console.log('WebSocket закрыт')
            setConnected(false)
        }

        socket.current.onerror = () => {
            console.log('WebSocket произошла ошибка')
            setConnected(false)
        }

    }
    console.log('messages :>> ', messages);

    const sendMessage = async () =>{
        const message = {
            userName,
            message: value,
            id: Date.now(),
            event: 'message'
        }
        socket.current.send(JSON.stringify(message))
        setValue('')
    }


    if (!connected) {
        return (
            <div className="center">
                <div className='form'>
                    <input type='text' placeholder='Введите ваше имя' value={userName} onChange={e => setUserName(e.target.value)} />
                    <button onClick={connect}>Войти</button>
                </div>
            </div>
        )
    }

    return (
        <div className="center">
            <div>
                <div className='form'>
                    <input type='text' value={value} onChange={e => setValue(e.target.value)}/>
                    <button onClick={sendMessage}>Отправить</button>
                </div>
                <div className='messages'>
                    {
                        messages.map(item =>
                            <div key = {item.id}>
                               {
                                   item.event === 'connection' ?
                                   <div className='connection_message'>{item.userName} подключился.</div>
                                   :
                                   <div className='message'>{item.userName}: {item.message}</div>
                               } 
                            </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default WebSock;