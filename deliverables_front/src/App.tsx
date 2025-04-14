import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import RequestReference from './pages/base/requestReference/requestReference';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RequestReference />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
