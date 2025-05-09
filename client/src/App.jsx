import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Account from "./pages/Account";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ReportError from "./pages/ReportError";
import ViewMap from "./pages/ViewMap";
import Logout from "./pages/Logout";
import Dashboard from "./pages/Dashboard";
function App() {
  return (
    <div className="!text-tertiary">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signin" element={<Signin/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/leaderboard" element={<h1>This is LeaderBoard Page</h1>} />
            <Route path="/account" element={<Account/>} />
            <Route path="/report-error" element={<ReportError />} />
            <Route path="/view-map" element={<ViewMap />} />
            <Route path="/logout" element={<Logout/>} />
          </Route>
          <Route path="/about" element={<h1>This is Aboout Page</h1>} />
          <Route path="/contact" element={<h1>This is Contact Page</h1>} />
          <Route path="/*" element={<h1>This is Not Found Page</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;