import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Route,BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Rigister from './components/Rigister';
import Manuplate from './components/Manuplate';
import Update from './components/Update';
import Check from './components/Check';
import ForgotPsw from './components/ForgotPsw';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   
   <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/rigister" element={<Rigister />} />
      <Route path="/manuplate" element={<Manuplate />} />
      <Route path="/update" element={<Update />} />
      <Route path="/check" element={<Check />} />
      <Route path="/forgotpsw" element={<ForgotPsw />} />
    </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
