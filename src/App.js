import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import "./App.css";
import Home from "./pages/Home";
import Layout from "./layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Create from "./pages/Create";
import Event from "./pages/Event/index";

const App = () => {
  const { user, authIsReady } = useAuthContext();

  return (
    <>
      {authIsReady && (
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route exact path="/" element={user ? <Home /> : <Navigate to="/login" />} />
              <Route path="/create" element={user ? <Create /> : <Navigate to="/login" />} />
              <Route path="/event/:id" element={user ? <Event /> : <Navigate to="/login" />} />
              <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
