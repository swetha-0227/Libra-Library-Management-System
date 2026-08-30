import {
  Table, TableHead, TableRow, TableCell,
  TableBody, TextField, Paper, Select, MenuItem, FormControl, InputLabel, Pagination, Box, Typography, Chip, IconButton
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/axiosConfig";
import Layout from "../components/layout/Layout";
import ConfirmDialog from "../components/common/ConfirmDialog";

function Books() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [availability, setAvailability] = useState("");
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const filterBooks = useCallback(() => {
    let filtered = books.filter(b =>
      b.title?.toLowerCase().includes(search.toLowerCase()) ||
      b.author?.toLowerCase().includes(search.toLowerCase())
    );

    if (category) {
      filtered = filtered.filter(b => b.category?.name === category);
    }

    if (availability) {
      filtered = filtered.filter(b => b.available === (availability === "available"));
    }

    setFilteredBooks(filtered);
    setTotalPages(Math.max(1, Math.ceil(filtered.length / itemsPerPage)));
    setPage(1);
  }, [books, search, category, availability]);

  useEffect(() => {
    fetchCategories();
    fetchBooks();
  }, []);

  useEffect(() => {
    filterBooks();
  }, [filterBooks]);

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchBooks = async () => {
    try {
      const res = await API.get("/books");
      setBooks(res.data);
    } catch (error) {
      console.error("Error fetching books:", error);
      const message = error.response?.data?.message || error.message || "Failed to load books.";
      toast.error(`Failed to load books: ${message}`);
      setBooks([]);
      setFilteredBooks([]);
    }
  };

  const handleEdit = (book) => {
    navigate(`/edit-book/${book.id}`);
  };

  const handleDelete = (book) => {
    setSelectedBook(book);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await API.delete(`/books/${selectedBook.id}`);
      toast.success("Book deleted successfully");
      fetchBooks();
      setConfirmOpen(false);
      setSelectedBook(null);
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Failed to delete book";
      toast.error(`Failed to delete book: ${message}`);
      console.error(error);
    }
  };

  const paginatedBooks = filteredBooks.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>Books</Typography>
        <Paper sx={{ p: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
            <TextField
              label="Search by Title or Author"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FormControl sx={{ minWidth: 160 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                {categories.map(cat => (
                  <MenuItem key={cat.id} value={cat.name}>{cat.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 160 }}>
              <InputLabel>Availability</InputLabel>
              <Select
                value={availability}
                label="Availability"
                onChange={(e) => setAvailability(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="available">Available</MenuItem>
                <MenuItem value="issued">Issued</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Paper>
        <Paper sx={{ p: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Availability</TableCell>
                {role === "ADMIN" && <TableCell>Actions</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedBooks.map((b) => (
                <TableRow key={b.id}>
                  <TableCell>{b.title}</TableCell>
                  <TableCell>{b.author}</TableCell>
                  <TableCell>{b.category?.name || "—"}</TableCell>
                  <TableCell>
                    <Chip
                      label={b.available ? "Available" : "Issued"}
                      color={b.available ? "success" : "error"}
                    />
                  </TableCell>
                  {role === "ADMIN" && (
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(b)}
                        size="small"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(b)}
                        size="small"
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, value) => setPage(value)}
            />
          </Box>
        </Paper>
        <ConfirmDialog
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={confirmDelete}
          title="Confirm Delete Book"
          message={`Are you sure you want to delete "${selectedBook?.title}"? This action cannot be undone.`}
        />
      </Box>
    </Layout>
  );
}

export default Books;