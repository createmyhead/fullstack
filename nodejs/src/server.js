import express from 'express';
const cors = require('cors');
import initRouter from './routes/initRouter';


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/public'));

require('dotenv').config();
const PORT = process.env.PORT || 3001;

initRouter(app);





app.listen(PORT, ()=> {console.log(`sever running port : ${PORT}`)});