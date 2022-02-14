const ws = require('ws')

const wss = new ws.Server({
    port: 5001,
}, () => console.log('Server started on port 5001'))

wss.on('connection', function connection(ws) {
    ws.on('message', function (message) {
        message = JSON.parse(message)
        if (message.event) {
            broadcastMessage(message)
        }
    })
})

function broadcastMessage(message) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message))
    })
}