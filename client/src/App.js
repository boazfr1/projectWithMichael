import './App.css';
import Login from './component/login';
// import Register from './components/Register';
// import Home from './components/Home';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './component/homePage';
import UserInfo from './component/userInfo';
import Posts from './component/posts';
import Todos from './component/todos';
import { UserProvider } from '../src/component/userInfoContext';


function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/userInfo' element={<UserInfo />} />
        <Route path='/posts' element={<Posts />} />
        <Route path='/todos' element={<Todos />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
