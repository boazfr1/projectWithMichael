import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
// import Register from './components/Register';
// import Home from './components/Home';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './component/homePage';
import Login from './component/login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Login />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
