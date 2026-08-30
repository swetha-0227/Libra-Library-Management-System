import {
  TextField, Button, Paper, Typography, Box, Autocomplete
} from "@mui/material";
import { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import API from "../api/axiosConfig";
import { toast } from "react-toastify";
import ConfirmDialog from "../components/common/ConfirmDialog";

function IssueBook() {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    fetchBooks();
    fetchUsers();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await API.get("/books");
      // Only show available books
      setBooks(res.data.filter(book => book.available));
    } catch (error) {
      console.error("Error fetching books:", error);
      toast.error("Failed to load books");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users");
      // Only show students
      setUsers(res.data.filter(user => user.role === "STUDENT"));
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    }
  };

  const validateSelection = () => {
    if (!selectedBook || !selectedUser) {
      toast.error("Please select both a book and a student");
      return false;
    }
    return true;
  };

  const submit = () => {
    if (!validateSelection()) return;
    setConfirmOpen(true);
  };

  const confirmSubmit = async () => {
    try {
      await API.post("/issue", null, {
        params: {
          username: selectedUser.username,
          bookId: selectedBook.id
        }
      });
      toast.success(`Book "${selectedBook.title}" issued to ${selectedUser.username}`);
      setSelectedBook(null);
      setSelectedUser(null);
      setConfirmOpen(false);
      fetchBooks(); // Refresh available books
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Failed to issue book";
      toast.error(`Failed to issue book: ${message}`);
      console.error(error);
    }
  };

  return (
    <Layout>
      <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
        <Typography variant="h4" gutterBottom>Issue Book</Typography>
        <Paper sx={{ p: 3 }}>
          <Autocomplete
            options={books}
            getOptionLabel={(book) => `${book.title} by ${book.author}`}
            value={selectedBook}
            onChange={(event, newValue) => setSelectedBook(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Available Book"
                required
                sx={{ mb: 2 }}
              />
            )}
          />

          <Autocomplete
            options={users}
            getOptionLabel={(user) => user.username}
            value={selectedUser}
            onChange={(event, newValue) => setSelectedUser(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Student"
                required
                sx={{ mb: 2 }}
              />
            )}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={submit}
            sx={{ mt: 2 }}
            disabled={!selectedBook || !selectedUser}
          >
            Issue Book
          </Button>
        </Paper>
        <ConfirmDialog
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={confirmSubmit}
          title="Confirm Issue Book"
          message={`Are you sure you want to issue "${selectedBook?.title}" to ${selectedUser?.username}?`}
        />
      </Box>
    </Layout>
  );
}

export default IssueBook;