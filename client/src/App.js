import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './component/homePage';
import Login from './component/login';
import { UserProvider } from '../src/component/userInfoContext';


function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
