import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import AuthProvider from 'react-auth-kit'
import store from './store'
import { UserProvider } from './hooks/userContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider store={store}>
    <UserProvider>
      <App />
    </UserProvider>
    </AuthProvider>
  </React.StrictMode>
)
