import React, { Suspense } from "react";
import "./App.css";
import { AuthProvider } from "./hooks/auth";
import { Spinner } from "flowbite-react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoute from "@components/ProtectedRoutes";

const Login = React.lazy(() => import("@pages/Login"));
const Register = React.lazy(() => import("@pages/Register"));
const Home = React.lazy(() => import("@pages/Home"));

function App() {
  // sessionStorage.clear();

  return (
    <div>
      <AuthProvider>
        <Suspense
          fallback={
            <Spinner aria-label="Chargement..." color="info" size="xl" />
          }
        >
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route path="/">
                <Route index element={<ProtectedRoute el={Home} />} />
              </Route>
            </Routes>
          </Router>
        </Suspense>
      </AuthProvider>
    </div>
  );
}

export default App;
