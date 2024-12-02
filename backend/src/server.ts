import { app } from ".";

const PORT = 3000;

export const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Shutdown the server
export const shutdown = async () => server.close();
