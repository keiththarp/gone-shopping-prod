import Container from "@mui/material/Container";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";

import Header from "./components/Header.jsx";
import HomePage from "./views/HomePage.jsx";
import SignUp from "./views/SignUp.jsx";

function App() {
  return (
    <Router>
      <Container maxWidth="sm">
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </AuthProvider>
      </Container>
    </Router>
  );
}

export default App;
