import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Base from './pages/bases/base';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Base />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
