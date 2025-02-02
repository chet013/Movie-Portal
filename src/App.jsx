import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import { Layout } from './layuot/Layout';
import { Favorites } from './Pages/favoritess/Favorites';
import { Login } from './Pages/login/Login';
import { Home } from './Pages/home/Home';
import { Movie } from './Pages/movie/Movie';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="home" element={<Home />} />
            <Route path="/movie/:id" element={<Movie />} />
            <Route path="login" element={<Login />} />
            <Route path="favorites" element={<Favorites />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
