import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from '@/pages/auth/Login';
import { Home } from '@/pages/Home';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
