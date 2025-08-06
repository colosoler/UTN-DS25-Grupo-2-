import express from 'express';
import { userRoutes } from './routes/user.routes';
import { materialRoutes } from './routes/material.routes';
import { handleError } from './middlewares/error.middleware';
import { logRequest } from './middlewares/logger.middleware';
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logRequest);

app.use('/users', userRoutes);
app.use('/materials', materialRoutes);

app.use(handleError);
app.listen(PORT, () => {
 console.log(` Server running on port ${PORT}`);
});
