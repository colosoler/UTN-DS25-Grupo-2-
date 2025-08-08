import express from 'express';
import { userRoutes } from './routes/user.routes';
import { materialRoutes } from './routes/material.routes';
import { materiaRoutes } from './routes/materia.route'
import { handleError } from './middlewares/error.middleware';
import { logRequest } from './middlewares/logger.middleware';
import { carreraRoutes } from './routes/carrera.route';
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logRequest);

app.use('/users', userRoutes);
app.use('/materials', materialRoutes);
app.use('/materias', materiaRoutes);
app.use('/carreras', carreraRoutes)


app.use(handleError);
app.listen(PORT, () => {
 console.log(` Server running on port ${PORT}`);
});
