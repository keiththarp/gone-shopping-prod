import Container from "@mui/material/Container";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoutes from "./router/ProtectedRoutes.jsx";

import Header from "./components/Header.jsx";
import HomePage from "./views/HomePage.jsx";
import Profile from "./views/Profile.jsx";
import SignUp from "./views/SignUp.jsx";
import SignIn from "./views/SignIn.jsx";

function App() {
  return (
    <Router>
      <Container maxWidth="sm">
        <AuthProvider>
          <Header />
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </AuthProvider>
      </Container>
    </Router>
  );
}

export default App;
