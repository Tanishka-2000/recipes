import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom';
import App from './App.jsx'
import './index.css'

const router = createBrowserRouter([{
    path: '*',
    element: <App />
  }
]);

const client = new QueryClient({
    defaultOptions:{
        queries: {
            staleTime: 1000 * 60 * 5
        }
    }
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={client}>
        <RouterProvider router={router} />
    </QueryClientProvider>
);