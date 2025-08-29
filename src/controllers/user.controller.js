import bcrypt from 'bcrypt';
import { z } from 'zod';
import { findUserByEmail, createUser } from '../models/user.model.js';

const registerSchema = z.object({
  nome: z.string().min(2, 'Nome muito curto'),
  email: z.string().email('Email inválido'),
  senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres')
});

export async function register(req, res) {
  try {
    const parse = registerSchema.safeParse(req.body);
    if (!parse.success) {
      const erros = parse.error.issues.map(i => i.message);
      return res.status(400).json({ error: erros });
    }

    const { nome, email, senha } = parse.data;

    const exists = await findUserByEmail(email);
    if (exists) {
      return res.status(409).json({ error: 'Email já cadastrado' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const user = await createUser({ nome, email, senhaHash });

    res.status(201).json({ message: 'Usuário criado com sucesso', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
}

export async function getAllUsers(req, res) {
  try {
    const users = await findAllUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
}