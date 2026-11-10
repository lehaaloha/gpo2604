
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import Cabinet from './pages/Cabinet';
import TestPage from './pages/TestPage';
import ResultPage from './pages/ResultPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/cabinet" element={<Cabinet />} />
        <Route path="/test/:id" element={<TestPage />} />
        <Route path="/test/:id/result" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;