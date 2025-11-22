import pool from './db';

const CREATE_TABLE_FACULTAD_SQL: string = `
    CREATE TABLE IF NOT EXISTS facultad (
        id SERIAL PRIMARY KEY,
        codigo VARCHAR(10) NOT NULL UNIQUE,
        nombre VARCHAR(150) NOT NULL,
        estado VARCHAR(10) NOT NULL DEFAULT 'ACTIVA',
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
`;

export async function initializeTables(): Promise<void> {
  try {
    console.log('Creando/verificando tablas...');
    await pool.query(CREATE_TABLE_FACULTAD_SQL);
    console.log('Tabla "facultad" creada/verificada.');
  } catch (error) {
    console.error('❌ Error durante la inicialización de tablas:', error);
    throw new Error('Ha ocurrido un error con la base de datos.');
  }
}
