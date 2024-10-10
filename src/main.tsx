import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
  } catch (error) {
    console.error('Error rendering the app:', error);
    rootElement.innerHTML = '<div style="color: red; padding: 20px;">An error occurred while rendering the app. Please check the console for details.</div>';
  }
} else {
  console.error('Root element not found');
  document.body.innerHTML = '<div style="color: red; padding: 20px;">Root element not found. Please check your HTML structure.</div>';
}