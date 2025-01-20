import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { Layout } from './layuot'; // Твой Layout-компонент
import { Favorites } from './Pages/favoritess/index'; // Твоя страница Favorites
import { Login } from './Pages/login/index'; // Твоя страница Login
import { Home } from './Pages/home/index'; // Главная страница
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="home" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="favorites" element={<Favorites />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
