import Container from "@mui/material/Container";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { DataProvider } from "./context/DataContext.jsx";
import ProtectedRoutes from "./router/ProtectedRoutes.jsx";

import Header from "./components/Header.jsx";
import AllItemsPage from "./views/AllItemsPage.jsx";
import MainList from "./views/MainList.jsx";
import Profile from "./views/Profile.jsx";
import SignUp from "./views/SignUp.jsx";
import SignIn from "./views/SignIn.jsx";

function App() {
  return (
    <Router>
      <Container maxWidth="sm">
        <AuthProvider>
          <DataProvider>
            <Header />
            <Routes>
              <Route element={<ProtectedRoutes />}>
                <Route path="/" element={<MainList />} />
                <Route path="/all-items" element={<AllItemsPage />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
            </Routes>
          </DataProvider>
        </AuthProvider>
      </Container>
    </Router>
  );
}

export default App;
