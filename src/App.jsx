import Container from "@mui/material/Container";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { VisibilityProvider } from "./context/VisibilityContext.jsx";
import { DataProvider } from "./context/DataContext.jsx";
import ProtectedRoutes from "./router/ProtectedRoutes.jsx";

import Header from "./components/Header.jsx";
import AllItemsPage from "./views/AllItemsPage.jsx";
import AllStoresPage from "./views/AllStoresPage.jsx";
import AllAislesPage from "./views/AllAislesPage.jsx";
import MainListPage from "./views/MainList.jsx";
import StoreList from "./views/StoreList";
import Profile from "./views/Profile.jsx";
import SignUp from "./views/SignUp.jsx";
import SignIn from "./views/SignIn.jsx";

function App() {
  return (
    <Router>
      <Container maxWidth="sm">
        <AuthProvider>
          <DataProvider>
            <VisibilityProvider>
              <Header />
              <Routes>
                <Route element={<ProtectedRoutes />}>
                  <Route path="/" element={<MainListPage />} />
                  <Route path="/all-stores" element={<AllStoresPage />} />
                  <Route path="/all-items" element={<AllItemsPage />} />
                  <Route path="/all-aisles" element={<AllAislesPage />} />
                  <Route path="/store-list" element={<StoreList />} />
                  <Route path="/profile" element={<Profile />} />
                </Route>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
              </Routes>
            </VisibilityProvider>
          </DataProvider>
        </AuthProvider>
      </Container>
    </Router>
  );
}

export default App;
