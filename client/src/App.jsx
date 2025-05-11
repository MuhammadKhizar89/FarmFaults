import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Account from "./pages/Account";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ReportError from "./pages/ReportError";
import ViewMap from "./pages/ViewMap";
import Logout from "./pages/Logout";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <div className="!text-tertiary">
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signin" element={<Signin/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route element={<PrivateRoute />}>
            <Route path="/leaderboard" element={<Leaderboard/>} />
            <Route path="/account" element={<Account/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/account" element={<Account/>} />
            <Route path="/report-error" element={<ReportError />} />
            <Route path="/view-map" element={<ViewMap />} />
            <Route path="/logout" element={<Logout/>} />
          </Route>
          <Route path="/*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;