import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
// import Register from './components/Register';
// import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Login />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
