import Express from "express";
import cors from 'cors';
import routes from './routes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = Express();
app.use(Express.urlencoded({ extended: false }));
app.use(Express.json());
app.use(cors({
    credentials: true,
    origin: '*'
}));

app.use(routes);

app.listen(process.env.PORT, () => {
    console.log(`Server listening to ${process.env.PORT}`);
});
