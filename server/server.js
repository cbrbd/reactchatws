const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'build')))

//main route that serves front end from build folder
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

//way to get the ip
app.get('/ip', function(req, res){
    const ifaces = require('os').networkInterfaces();
    let address;

    Object.keys(ifaces).forEach(dev => {
    ifaces[dev].filter(details => {
        if (details.family === 'IPv4' && details.internal === false) {
        address = details.address;
        }
    });
    
});
res.json(address);
})

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {

    ws.on('message', (message) => {
        wss.clients.forEach(function each(client){
            client.send(JSON.stringify(JSON.parse(message).dataToSend))
        })
    });
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  })

server.listen(process.env.PORT || 8000, () => {
    console.log(`Server started on port ${server.address().port}`);
});