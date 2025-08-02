import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Register from './pages/home/Register/Register.jsx';
import { AuthWrapper } from './components/context/auth.context.jsx';
let router = createBrowserRouter([
  {
    path: "*",
    element: <App />,
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <AuthWrapper>
      <RouterProvider router={router} />,
    </AuthWrapper>
  </StrictMode>,
)
