import React, { Suspense } from 'react';
import './App.css';
import { Spinner } from 'flowbite-react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoutes';
import { AuthProvider } from './hooks/auth';

const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Home = React.lazy(() => import('./pages/Home'));

const Tracking = React.lazy(() => import('./pages/Events/Tracking'));
const Sessions = React.lazy(() => import('./pages/Events/Sessions'));
const Heatmap = React.lazy(() => import('./pages/Events/Heatmap'));
const PageView = React.lazy(() => import('./pages/Events/PageView'));

function App() {
  return (
    <div>
      <Suspense
        fallback={
          <Spinner aria-label="Chargement..." color="info" size="xl" />
          }
      >
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route path="/">
                <Route index element={<ProtectedRoute el={Home} />} />
                <Route
                  path="/tracking"
                  element={<ProtectedRoute el={Tracking} />}
                />
                <Route
                  path="/sessions"
                  element={<ProtectedRoute el={Sessions} />}
                />
                <Route
                  path="/heatmap"
                  element={<ProtectedRoute el={Heatmap} />}
                />
                <Route
                  path="/views"
                  element={<ProtectedRoute el={PageView} />}
                />
                <Route
                  path="*"
                  element="Cette page n'existe pas"
                />
              </Route>
            </Routes>
          </AuthProvider>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
