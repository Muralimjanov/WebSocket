import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from 'config';
import initializeWebSocket from './Controllers/WebSocket.js';
import { registerUser, loginUser } from './Controllers/UserControllers.js';
import checkAuth from './Utils/checkAuth.js';
import { userValidationRules, validate } from './Validations/useValidations.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(checkAuth);

app.post('/register', userValidationRules(), validate, registerUser);
app.post('/login', loginUser);

const PORT = config.get('serverPort');

const start = async () => {
  try {
    await mongoose.connect(config.get('dbUrl'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB connected');

    const httpServer = http.createServer(app);
    initializeWebSocket(httpServer);

    httpServer.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (error) {
    console.error('Server start error:', error);
  }
};

start();
