import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Link,
  Alert,
  Paper,
  InputAdornment,
  IconButton,
  CircularProgress
} from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
      } else {
        // Save JWT token to localStorage
        localStorage.setItem("token", data.token);
        // Show loading for a moment before navigating
        setTimeout(() => {
          setLoading(false);
          // Redirect to dashboard or home
          navigate("/dashboard");
        }, 1000);
      }
    } catch (err) {
      setError("Network error");
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f6fa",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper elevation={6} sx={{ p: 4, width: "100%", borderRadius: 3 }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <LockOutlinedIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h4" gutterBottom fontWeight={700}>
              Login
            </Typography>
          </Box>
          {loading ? (
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4 }}>
              <CircularProgress />
              <Box sx={{ mt: 2 }}>Logging in...</Box>
            </Box>
          ) : (
            <form onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                fullWidth
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((show) => !show)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3, mb: 2, fontWeight: 600, letterSpacing: 1 }}
              >
                Login
              </Button>
            </form>
          )}
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Typography variant="body2">
              Don't have an account?{" "}
              <Link component={RouterLink} to="/register" underline="hover">
                Register
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}