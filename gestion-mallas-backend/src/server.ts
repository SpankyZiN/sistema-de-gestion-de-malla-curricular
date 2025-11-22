import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { initializeTables } from './setup-db';
import pool from './db';
import facultadRoutes from './routes/facultad.routes';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/facultades', facultadRoutes);

app.get('/', (req, res) => {
  res.send('API Gestión de Mallas - OK');
});

async function startServer() {
  try {
    await initializeTables();

    app.listen(PORT, () => {
      console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
    });

    process.on('SIGINT', async () => {
      console.log('\nCerrando server...');
      await pool.end();
      console.log('Conexión a la base de datos cerrad..');
      process.exit(0);
    });
  } catch (error) {
    console.error('🔥 Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

startServer();
