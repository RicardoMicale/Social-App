import express from 'express';

const app = express();

app.set('port', Number(process.env.PORT || 3000));

export default app;
