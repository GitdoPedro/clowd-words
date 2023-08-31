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

/*io.on('connection', async (socket) => {
  try {
    // Obter todas as palavras do banco de dados
    const words = await Word.findAll();
    
    // Enviar as palavras para o cliente recém-conectado usando o evento receive_word
    socket.emit('receive_word', words);

    socket.on('set_word', async (text) => {
      try {
        // Emitir o evento para o Socket.IO
        io.emit('receive_word', {
          text,
          textId: socket.id,
        });

        // Realizar a operação de POST no backend
        const response = await fetch('/api/word', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text }), // Envie a palavra para o backend
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error);
        }
      } catch (error) {
        console.error('Erro ao adicionar palavra:', error.message);
      }
    });
  } catch (error) {
    console.error('Erro ao obter palavras do banco de dados:', error.message);
  }
});*/


const Word = WordModel(sequelize, sequelize.Sequelize.DataTypes);
sequelize.sync().then(() => {
   app.use('/api/word', wordRoutes);
  server.listen(PORT, () => console.log('Server running....'));
}).catch((error) => {
  console.error('Error initializing the database:', error);
});
