import React from 'react';

const WebSock = () => {



    if (true) {
        return (
            <div className="center">
                <div className='form'>
                    <input type='text' placeholder='Введите ваше имя'/>
                    <button>Войти</button>
                </div>
            </div>
        )
    }

    return (
        <div className="center">
            <div>
                <div className='form'>
                    <input type='text' />
                    <button >Отправить</button>
                </div>
                <div>
                    <div>
                        <div className='connection_message'></div>
                        <div className='connection_message'></div>
                        <div className='message'></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WebSock;