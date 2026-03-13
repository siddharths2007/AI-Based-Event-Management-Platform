import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './landing';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}