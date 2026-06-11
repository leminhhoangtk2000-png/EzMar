import { RouterProvider } from 'react-router';
import { router } from './routes';
import { BrandProvider } from './context/BrandContext';

export default function App() {
  return (
    <BrandProvider>
      <RouterProvider router={router} />
    </BrandProvider>
  );
}