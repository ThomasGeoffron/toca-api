import React, { Suspense } from "react";
import "./App.css";
import { AuthProvider } from "./hooks/auth";
import { Spinner } from "flowbite-react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoute from "@components/ProtectedRoutes";

const Login = React.lazy(() => import("@pages/Login"));
const Register = React.lazy(() => import("@pages/Register"));
const Home = React.lazy(() => import("@pages/Home"));

const Tracking = React.lazy(() => import("@pages/Events/Tracking"));
const Heatmap = React.lazy(() => import("@pages/Events/Heatmap"));
const PageView = React.lazy(() => import("@pages/Events/PageView"));
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
                <Route
                  path="events/tracking"
                  element={<ProtectedRoute el={Tracking} />}
                />
                <Route
                  path="events/heatmap"
                  element={<ProtectedRoute el={Heatmap} />}
                />
                <Route
                  path="events/page-views"
                  element={<ProtectedRoute el={PageView} />}
                />
              </Route>
            </Routes>
          </Router>
        </Suspense>
      </AuthProvider>
    </div>
  );
}

export default App;
