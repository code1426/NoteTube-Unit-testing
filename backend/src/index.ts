import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

export const app = express();

// initialize the database connection
export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
console.log(`Connected to database ${process.env.DATABASE_URL}`);

// use express.json to allow to parse JSON requests
app.use(cors()).use(express.json());
