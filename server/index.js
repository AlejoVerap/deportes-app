const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/escenarios', require('./routes/escenario.routes'));
app.use('/api/reservas', require('./routes/reserva.routes'));
app.use('/api/admin', require('./routes/admin.routes'));
app.use('/api/usuarios', require('./routes/usuario.routes'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
