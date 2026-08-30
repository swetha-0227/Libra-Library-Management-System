import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import IssueBook from "./pages/IssueBook";
import ReturnBook from "./pages/ReturnBook";
import Register from "./pages/Register";
import Users from "./pages/Users";
import ActivityLog from "./pages/ActivityLog";
import PrivateRoute from "./components/PrivateRoute";
import RoleRoute from "./components/RoleRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
      <Routes>

        {/* 🔓 Public Route */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔐 Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/books"
          element={
            <PrivateRoute>
              <Books />
            </PrivateRoute>
          }
        />

        {/* 🔐 Admin-only */}
        <Route
          path="/add-book"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={["ADMIN"]}>
                <AddBook />
              </RoleRoute>
            </PrivateRoute>
          }
        />

        <Route
          path="/edit-book/:id"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={["ADMIN"]}>
                <EditBook />
              </RoleRoute>
            </PrivateRoute>
          }
        />

        <Route
          path="/issue-book"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={["ADMIN"]}>
                <IssueBook />
              </RoleRoute>
            </PrivateRoute>
          }
        />

        <Route
          path="/return-book"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={["ADMIN"]}>
                <ReturnBook />
              </RoleRoute>
            </PrivateRoute>
          }
        />

        {/* 🔐 Admin only */}
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={["ADMIN"]}>
                <Users />
              </RoleRoute>
            </PrivateRoute>
          }
        />

        <Route
          path="/logs"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={["ADMIN"]}>
                <ActivityLog />
              </RoleRoute>
            </PrivateRoute>
          }
        />

      </Routes>

      {/* 🔔 Toast Notifications */}
      <ToastContainer position="top-right" autoClose={2000} />
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;