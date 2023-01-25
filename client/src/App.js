import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './component/homePage';
import Login from './component/login';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  );
}

export default App;
