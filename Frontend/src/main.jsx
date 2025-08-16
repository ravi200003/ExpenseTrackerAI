import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from "./app/App";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000"; // your C# backend URL  

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
