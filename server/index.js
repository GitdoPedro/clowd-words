const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const WordModel = require('./models/wordModel');
const wordRoutes = require('./config/routes'); 

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: 'http://localhost:3000' } });

app.use(bodyParser.json());

const PORT = 3001;

io.on('connection', (socket) => {
  socket.on('set_word', (text) => {
    io.emit('receive_word', {
      text,
      textId: socket.id,
    });
  });
});


const Word = WordModel(sequelize, sequelize.Sequelize.DataTypes);
sequelize.sync().then(() => {
   app.use('/api/word', wordRoutes);
  server.listen(PORT, () => console.log('Server running....'));
}).catch((error) => {
  console.error('Error initializing the database:', error);
});
