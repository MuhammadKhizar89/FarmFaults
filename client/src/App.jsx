import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signin" element={<h1>This is SignIn Page</h1>} />
          <Route path="/signup" element={<h1>This is SignUp Page</h1>} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<h1>This is DashBoard Page</h1>} />
            <Route path="/leaderboard" element={<Leaderboard/>} />
            <Route path="/account" element={<h1>This is Account Page</h1>} />
            <Route path="/report-error" element={<h1>This is Report Error Page</h1>} />
            <Route path="/view-map" element={<h1>This is View Map Page</h1>} />
            <Route path="/logout" element={<h1>This is not a page</h1>} />
          </Route>
          <Route path="/about" element={<h1>This is Aboout Page</h1>} />
          <Route path="/contact" element={<h1>This is Contact Page</h1>} />
          <Route path="/*" element={<h1>This is Not Found Page</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;