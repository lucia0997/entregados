import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Base from './pages/bases/base';
import Login from './pages/login/login';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Base />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
