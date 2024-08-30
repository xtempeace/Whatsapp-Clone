
import express from 'express';
import cors from 'cors';

import Connection from './database/db.js';
import Route from './routes/route.js';
import bodyParser from 'body-parser';

const app = express();

app.use(cors())
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/',Route)




Connection();

const port = 8000; //port number



//1
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});