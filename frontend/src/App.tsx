import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="flex h-screen self-center w-screen items-center justify-center bg-green-300">
      <div className="text-9xl text-green-600">BB6</div>
    </div>
  </StrictMode>,
);
