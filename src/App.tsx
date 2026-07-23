import { Toaster } from 'react-hot-toast';
import { AppRoutes } from './routes/AppRoutes';

export function App() {
  return (
    <>
      <AppRoutes />
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
    </>
  );
}

export default App;
