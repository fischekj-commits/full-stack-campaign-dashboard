import pool from '../config/database';
import { User, RegisterDTO } from '../types/user';
import bcrypt from 'bcryptjs';

export const userModel = {
  async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0] || null;
  },

  async findById(id: number): Promise<User | null> {
    const result = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  },

  async create(data: RegisterDTO): Promise<User> {
    const passwordHash = await bcrypt.hash(data.password, 10);

    const result = await pool.query(
      'INSERT INTO users (email, name, password_hash) VALUES ($1, $2, $3) RETURNING *',
      [data.email, data.name, passwordHash]
    );

    return result.rows[0];
  },

  async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  },
};
