import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './layuot';
import { Favorites } from './Pages/favoritess/index';
import { Login } from './Pages/login/index'
import { Home } from './Pages/home/index'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path="home" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="favorites" element={<Favorites />} />
        </ Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
