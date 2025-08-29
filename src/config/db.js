import pkg from 'pg';
import 'dotenv/config';

const { Pool } = pkg;

export const pool = new Pool({
  host: process.env.DB_HOST,      //localhost
  port: process.env.DB_PORT,      //5432
  user: process.env.DB_USER,      //postgres
  password: process.env.DB_PASSWORD,  //1234567j
  database: process.env.DB_NAME, //gestaofinanceira
});