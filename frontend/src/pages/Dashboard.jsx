import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  AppBar,
  Toolbar,
  Paper,
  Grid,
  Divider,
  Avatar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [taskError, setTaskError] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Fetch profile
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetch("http://localhost:5001/api/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(setProfile)
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate, token]);

  // Fetch tasks
  useEffect(() => {
    if (!token) return;
    fetch("http://localhost:5001/api/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setTasks);
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    setTaskError("");
    if (!newTask.trim()) {
      setTaskError("Task title is required");
      return;
    }
    const res = await fetch("http://localhost:5001/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: newTask }),
    });
    if (res.ok) {
      const task = await res.json();
      setTasks([...tasks, task]);
      setNewTask("");
    }
  };

  const handleToggleComplete = async (task) => {
    const res = await fetch(`http://localhost:5001/api/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ completed: !task.completed }),
    });
    if (res.ok) {
      setTasks(
        tasks.map((t) =>
          t.id === task.id ? { ...t, completed: !t.completed } : t
        )
      );
    }
  };

  const handleDeleteTask = async (id) => {
    const res = await fetch(`http://localhost:5001/api/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  if (!profile) return null;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        background: "#f5f6fa",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppBar position="static" color="primary" elevation={2}>
        <Toolbar>
          <AssignmentTurnedInIcon sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 4,
        }}
      >
        <Container maxWidth="md">
          <Grid
            container
            spacing={4}
            alignItems="stretch"
            justifyContent="center"
          >
            <Grid item xs={12} md={5}>
              <Paper
                elevation={4}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  textAlign: "center",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "primary.main",
                    width: 70,
                    height: 70,
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  <AccountCircleIcon sx={{ fontSize: 48 }} />
                </Avatar>
                <Typography variant="h5" gutterBottom fontWeight={700}>
                  Profile
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body1" fontWeight={600}>
                  {profile.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {profile.email}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={7}>
              <Paper
                elevation={4}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <AssignmentTurnedInIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h5" fontWeight={700}>
                    Tasks
                  </Typography>
                </Box>
                <Box
                  component="form"
                  onSubmit={handleAddTask}
                  sx={{
                    display: "flex",
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <TextField
                    label="New Task"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    fullWidth
                    error={!!taskError}
                    helperText={taskError}
                  />
                  <Button type="submit" variant="contained">
                    Add
                  </Button>
                </Box>
                <TextField
                  label="Search Tasks"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  fullWidth
                  size="small"
                  sx={{ mb: 2 }}
                />
                <Divider sx={{ mb: 2 }} />
                <List sx={{ maxHeight: 340, overflow: "auto" }}>
                  {filteredTasks.length === 0 && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      align="center"
                      sx={{ mt: 2 }}
                    >
                      No tasks found.
                    </Typography>
                  )}
                  {filteredTasks.map((task) => (
                    <ListItem
                      key={task.id}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          onClick={() => handleDeleteTask(task.id)}
                          aria-label="delete"
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                      disablePadding
                      sx={{
                        borderRadius: 2,
                        mb: 1,
                        bgcolor: task.completed ? "#e0f7fa" : "inherit",
                      }}
                    >
                      <Checkbox
                        checked={task.completed}
                        onChange={() => handleToggleComplete(task)}
                        sx={{ ml: 1 }}
                      />
                      <ListItemText
                        primary={task.title}
                        sx={{
                          textDecoration: task.completed ? "line-through" : "none",
                          ml: 1,
                          color: task.completed ? "text.secondary" : "text.primary",
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}