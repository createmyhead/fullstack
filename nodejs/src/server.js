import express from 'express';
const cors = require('cors');
import initRouter from './routes/initRouter';


const app = express();
app.use(cors());
app.use(express.static('./src/public'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

require('dotenv').config();
const PORT = process.env.PORT || 3001;

initRouter(app);





app.listen(PORT, ()=> {console.log(`sever running port : ${PORT}`)});