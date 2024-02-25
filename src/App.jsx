import SignUp from "./components/SignUp.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <SignUp />
      </AuthProvider>
    </>
  );
}

export default App;
