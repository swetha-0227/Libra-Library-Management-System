import { Grid, Paper, Typography, Box, List, ListItem, ListItemText, Chip, Divider, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import Layout from "../components/layout/Layout";
import { useEffect, useState } from "react";
import API from "../api/axiosConfig";

function Dashboard() {
  const [stats, setStats] = useState({ totalBooks: 0, issued: 0, overdue: 0 });
  const [history, setHistory] = useState([]);
  const [issuedBooks, setIssuedBooks] = useState([]);

  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchStats();
    fetchHistory();
    if (role === "STUDENT") {
      fetchIssuedBooks();
    }
  }, [role]);

  const fetchStats = async () => {
    try {
      const res = await API.get("/dashboard/stats");
      setStats(res.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await API.get("/dashboard/history");
      setHistory(res.data);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const fetchIssuedBooks = async () => {
    try {
      const res = await API.get("/issue/user");
      setIssuedBooks(res.data);
    } catch (error) {
      console.error("Error fetching issued books:", error);
    }
  };

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>Dashboard</Typography>
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6">Total Books</Typography>
              <Typography variant="h3" color="primary">{stats.totalBooks}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6">Issued</Typography>
              <Typography variant="h3" color="secondary">{stats.issued}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6">Overdue</Typography>
              <Typography variant="h3" color="error">{stats.overdue}</Typography>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Recent Activity</Typography>
              <List>
                {history.slice(0, 5).map((item, index) => (
                  <div key={index}>
                    <ListItem>
                      <ListItemText
                        primary={item.action}
                        secondary={`${item.bookTitle} - ${new Date(item.date).toLocaleDateString()}`}
                      />
                      <Chip 
                        label={item.status} 
                        color={item.status === 'Overdue' ? 'error' : 'default'} 
                        size="small" 
                      />
                    </ListItem>
                    {index < history.length - 1 && <Divider />}
                  </div>
                ))}
              </List>
            </Paper>
          </Grid>
          {role === "STUDENT" ? (
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>My Issued Books</Typography>
                {issuedBooks.length > 0 ? (
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Book Title</TableCell>
                        <TableCell>Author</TableCell>
                        <TableCell>Due Date</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {issuedBooks.map((issue) => (
                        <TableRow key={issue.id}>
                          <TableCell>{issue.book.title}</TableCell>
                          <TableCell>{issue.book.author}</TableCell>
                          <TableCell>{new Date(issue.dueDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Chip
                              label={new Date(issue.dueDate) < new Date() ? "Overdue" : "Active"}
                              color={new Date(issue.dueDate) < new Date() ? "error" : "primary"}
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No books currently issued
                  </Typography>
                )}
              </Paper>
            </Grid>
          ) : (
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>Due Soon</Typography>
                <List>
                  {history.filter(item => item.dueSoon).slice(0, 5).map((item, index) => (
                    <div key={index}>
                      <ListItem>
                        <ListItemText
                          primary={item.bookTitle}
                          secondary={`Due: ${new Date(item.dueDate).toLocaleDateString()}`}
                        />
                        <Chip label="Due Soon" color="warning" size="small" />
                      </ListItem>
                      {index < history.filter(item => item.dueSoon).length - 1 && <Divider />}
                    </div>
                  ))}
                </List>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Box>
    </Layout>
  );
}

export default Dashboard;