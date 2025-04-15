import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import RequestReference from './pages/base/requestReference/requestReference';
import Login from './pages/login/login';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<RequestReference />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
