import { Response, Request } from 'express';
import { app, pool } from '.';

const PORT = 3000;

// FOR TESTING

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// TEST GET REQUEST
app.get('/', async (_request: Request, response: Response) => {
  try {
    const result = await pool.query('SELECT * FROM app_users');
    response.status(200).json({
      data: result.rows,
    });
  } catch (error) {
    response.status(500).json({ error: 'An unexpected error occurred' });
  }
});

// TEST POST REQUEST
app.post('/', async (request: Request, response: Response) => {
  try {
    const { name } = request.body as { name: string };
    const result = await pool.query(
      'INSERT INTO app_users (name) VALUES ($1) RETURNING *',
      [name],
    );
    response.status(201).json({
      data: result.rows,
    });
  } catch (error) {
    response.status(500).json({ error: error });
  }
});
