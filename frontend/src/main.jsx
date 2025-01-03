import { createRoot } from 'react-dom/client';  // Correct import
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import StorecontextProvider from './context/Storecontext.jsx';

createRoot(document.getElementById('root')).render(
 
    <BrowserRouter>
    <StorecontextProvider>
    <App />
    </StorecontextProvider>
    </BrowserRouter>
  
);

