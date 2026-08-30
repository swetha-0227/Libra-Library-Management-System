import { Box, TextField, Button, Paper, Typography, Link } from "@mui/material";
import { useState } from "react";
import API from "../api/axiosConfig";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await API.post("/auth/login", data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      toast.success("Login Successful");
      navigate("/dashboard");
    } catch {
      toast.error("Invalid Credentials");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg,#667eea,#764ba2)",
      }}
    >
      <Paper sx={{ p: 4, width: 350 }}>
        <Typography variant="h5">Login</Typography>

        <TextField fullWidth label="Username" sx={{ mt: 2 }}
          onChange={(e) => setData({...data, username: e.target.value})}
        />

        <TextField fullWidth label="Password" type="password" sx={{ mt: 2 }}
          onChange={(e) => setData({...data, password: e.target.value})}
        />

        <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={login}>
          Login
        </Button>

        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
          New student?&nbsp;
          <Link component={RouterLink} to="/register">
            Register here
          </Link>
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1, textAlign: 'center' }}>
          Role is determined automatically based on your account.
        </Typography>
      </Paper>
    </Box>
  );
}

export default Login;