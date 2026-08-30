import {
  TextField, Button, Paper, Typography, Box, Link
} from "@mui/material";
import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import API from "../api/axiosConfig";
import { toast } from "react-toastify";
import ConfirmDialog from "../components/common/ConfirmDialog";

function Register() {
  const [user, setUser] = useState({ username: "", password: "", confirmPassword: "" });
  const [confirmOpen, setConfirmOpen] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!user.username.trim() || !user.password || !user.confirmPassword) {
      toast.error("All fields are required");
      return false;
    }

    if (user.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }

    if (user.password !== user.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  };

  const submit = () => {
    if (!validateForm()) return;
    setConfirmOpen(true);
  };

  const confirmSubmit = async () => {
    try {
      await API.post("/auth/register", {
        username: user.username,
        password: user.password
      });
      toast.success("Registration successful! Please login.");
      navigate("/");
      setConfirmOpen(false);
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Registration failed";
      toast.error(`Registration failed: ${message}`);
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        p: 2
      }}
    >
      <Paper sx={{ p: 4, maxWidth: 400, width: '100%' }}>
        <Typography variant="h4" gutterBottom align="center">
          Student Registration
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
          Create your account to access the library system
        </Typography>

        <TextField
          fullWidth
          label="Username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          sx={{ mb: 2 }}
          required
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          sx={{ mb: 2 }}
          required
        />

        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          value={user.confirmPassword}
          onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
          sx={{ mb: 3 }}
          required
        />

        <Button
          variant="contained"
          fullWidth
          onClick={submit}
          sx={{ mb: 2 }}
        >
          Register
        </Button>

        <Box sx={{ textAlign: 'center' }}>
          <Link component={RouterLink} to="/" variant="body2">
            Already have an account? Login here
          </Link>
        </Box>
      </Paper>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmSubmit}
        title="Confirm Registration"
        message="Are you sure you want to create this account?"
      />
    </Box>
  );
}

export default Register;