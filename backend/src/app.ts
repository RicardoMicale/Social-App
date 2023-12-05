import cors from 'cors';
import express from 'express';

const app = express();

app.set('port', Number(process.env.PORT || 7777));
app.use(cors());

export default app;
