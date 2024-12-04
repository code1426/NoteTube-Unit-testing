import { app } from ".";

const PORT = 3000;

export const server = app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Shutdown the server
export const shutdown = async () => server.close();
