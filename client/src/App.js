import './App.css';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './component/homePage';
import Login from './component/login';
import { UserProvider } from '../src/component/userInfoContext';
import Posts from './component/Posts';
import ToDos from './component/ToDos';


function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/todos' element={<ToDos />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
