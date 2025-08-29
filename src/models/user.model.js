import { pool } from '../config/db.js';

export async function findUserByEmail(email) {
  const { rows } = await pool.query(
    'SELECT * FROM usuarios WHERE email = $1',
    [email]
  );
  return rows[0] || null;
}

export async function createUser({ nome, email, senhaHash }) {
  const { rows } = await pool.query(
    `INSERT INTO usuarios (nome, email, senha_hash)
     VALUES ($1, $2, $3)
     RETURNING id, nome, email, criado_em`,
    [nome, email, senhaHash]
  );
  return rows[0];
}


export async function findAllUsers() {
  const { rows } = await pool.query('SELECT id, nome, email, criado_em FROM usuarios');
  return rows;
}