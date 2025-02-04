import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import { Layout } from './layuot/Layout';
import { Loader } from './Components/loader/Loader';
import ErrorBoundary from './Components/error-boundary/ErrorBoundary';
import './App.css';

const Home = lazy(() => import('./Pages/home/Home'));
const Movie = lazy(() => import('./Pages/movie/Movie'));
const Favorites = lazy(() => import('./Pages/favoritess/Favorites'));
const Login = lazy(() => import('./Pages/login/Login'));

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/home" replace />} />
            <Route
              path="home"
              element={
                <ErrorBoundary>
                  <Suspense fallback={<Loader />}>
                    <Home />
                  </Suspense>
                </ErrorBoundary>
              }
            />
            <Route
              path="/movie/:id"
              element={
                <ErrorBoundary>
                  <Suspense fallback={<Loader />}>
                    <Movie />
                  </Suspense>
                </ErrorBoundary>
              }
            />
            <Route
              path="login"
              element={
                <ErrorBoundary>
                  <Suspense fallback={<Loader />}>
                    <Login />
                  </Suspense>
                </ErrorBoundary>
              }
            />
            <Route
              path="favorites"
              element={
                <ErrorBoundary>
                  <Suspense fallback={<Loader />}>
                    <Favorites />
                  </Suspense>
                </ErrorBoundary>
              }
            />
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  );
}

export default App;
