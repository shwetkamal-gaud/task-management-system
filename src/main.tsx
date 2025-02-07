import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login.tsx'
import { Provider } from 'react-redux'
import store from './redux/store.ts'
import QueryProviders from './QueryProviders.tsx'
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';

const root = document.getElementById('root');
if (root) {

  createRoot(root).render(
    <StrictMode>
      <Provider store={store}>
        <QueryProviders>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </QueryProviders>
      </Provider>
    </StrictMode>
  )
}else{
  console.log("erro")
}
