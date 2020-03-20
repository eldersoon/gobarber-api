import 'babel-polyfill';
import app from './app';
import cors from 'cors';

app.listen(3000);
app.use(cors());
