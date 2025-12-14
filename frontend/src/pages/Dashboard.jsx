import { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Checkbox,
  Divider,
  InputAdornment,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const drawerWidth = 260;

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
    <Box sx={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "none",
            background: "#fff",
            boxShadow: "2px 0 8px #f0f1f3",
          },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 4 }}>
          <Avatar sx={{ width: 80, height: 80, mb: 2, bgcolor: "#e0e7ef" }}>
            <PersonIcon sx={{ fontSize: 48, color: "#3b82f6" }} />
          </Avatar>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Welcome,
          </Typography>
          <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
            {profile.name}
          </Typography>
        </Box>
        <Divider />
        <List>
          <ListItem button selected>
            <ListItemIcon>
              <DashboardIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 6 },
          width: `calc(100vw - ${drawerWidth}px)`,
          minHeight: "100vh",
          background: "#f8fafc",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h4" fontWeight={700}>
            Tasks
          </Typography>
          <Button variant="outlined" onClick={handleLogout} sx={{ display: { xs: "block", md: "none" } }}>
            Logout
          </Button>
        </Box>
        <Box
          component="form"
          onSubmit={handleAddTask}
          sx={{
            display: "flex",
            gap: 2,
            mb: 3,
            maxWidth: 600,
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
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          sx={{ mb: 3, maxWidth: 480 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: "0 2px 12px #f0f1f3" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, fontSize: 16 }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 16 }}>Completed</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 16 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={task.completed}
                      onChange={() => handleToggleComplete(task)}
                      icon={<RadioButtonUncheckedIcon />}
                      checkedIcon={<CheckCircleIcon color="success" />}
                    />
                  </TableCell>
                  <TableCell>
                    {/* You can add edit functionality here */}
                    <IconButton onClick={() => handleDeleteTask(task.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {filteredTasks.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No tasks found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}