import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Public from "./function/Routes/Public";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import Movie from "./pages/public/Movie";
import Welcome from "./pages/public/Welcome";
import BookMovie from "./pages/private/User/BookMovie";
import Private from "./function/Routes/Private";
import Dashboard from "./pages/private/User/Dashboard";
import Layout from "./components/Layout/Layout";
import Admin from "./function/Routes/Admin";
import AdminDashboard from "./pages/private/Admin/AdminDashboard";
import AdminMovie from "./pages/private/Admin/AdminMovie";
import AdminUsers from "./pages/private/Admin/AdminUsers";
import AdminTickets from "./pages/private/Admin/AdminTickets";
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<Private />}>
            <Route path="/movie/:movieId" element={<BookMovie />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* For Admin */}
            <Route element={<Admin />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/movies" element={<AdminMovie />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/ticket" element={<AdminTickets />} />
            </Route>
          </Route>
          <Route path="/" element={<Welcome />}>
            {/* Public Routes */}
            <Route path="/" element={<AdminDashboard />} />
          </Route>
          <Route element={<Public />}>
            <Route path="/movie" element={<Movie />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
