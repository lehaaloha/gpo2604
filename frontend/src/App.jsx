
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import Cabinet from './pages/Cabinet';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/cabinet" element={<Cabinet />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;