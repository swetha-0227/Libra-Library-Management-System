import {
  TextField, Button, Paper, Typography, Box, FormControl, InputLabel, Select, MenuItem, IconButton
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import API from "../api/axiosConfig";
import { toast } from "react-toastify";
import ConfirmDialog from "../components/common/ConfirmDialog";

function EditBook() {
  const [book, setBook] = useState({ title: "", author: "", categoryId: "" });
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchBook = useCallback(async () => {
    try {
      const res = await API.get(`/books/${id}`);
      setBook({
        title: res.data.title,
        author: res.data.author,
        categoryId: res.data.category?.id || ""
      });
      setLoading(false);
    } catch (error) {
      toast.error("Error loading book");
      console.error(error);
      navigate('/books');
    }
  }, [id, navigate]);

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBook();
  }, [fetchBook]);

  const validateBook = () => {
    if (!book.title.trim() || !book.author.trim() || !book.categoryId) {
      toast.error("All fields are required");
      return false;
    }
    return true;
  };

  const submit = async () => {
    if (!validateBook()) return;
    setConfirmOpen(true);
  };

  const confirmSubmit = async () => {
    try {
      await API.put(`/books/${id}`, {
        title: book.title,
        author: book.author,
        category: { id: book.categoryId }
      });
      toast.success("Book Updated Successfully");
      navigate('/books');
      setConfirmOpen(false);
    } catch (error) {
      toast.error("Error updating book");
      console.error(error);
    }
  };

  const addCategory = async () => {
    if (!newCategory.trim()) {
      toast.error("Category name is required");
      return;
    }
    try {
      await API.post("/categories", { name: newCategory });
      toast.success("Category Added");
      setNewCategory("");
      setShowAddCategory(false);
      fetchCategories();
    } catch (error) {
      toast.error("Error adding category");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <Layout>
        <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
          <Typography variant="h4" gutterBottom>Edit Book</Typography>
          <Typography>Loading...</Typography>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
        <Typography variant="h4" gutterBottom>Edit Book</Typography>
        <Paper sx={{ p: 3 }}>
          <TextField
            fullWidth
            label="Title"
            value={book.title}
            onChange={(e) => setBook({ ...book, title: e.target.value })}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            label="Author"
            value={book.author}
            onChange={(e) => setBook({ ...book, author: e.target.value })}
            sx={{ mb: 2 }}
            required
          />
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <FormControl fullWidth required>
              <InputLabel>Category</InputLabel>
              <Select
                value={book.categoryId}
                label="Category"
                onChange={(e) => setBook({ ...book, categoryId: Number(e.target.value) })}
              >
                {categories.map(cat => (
                  <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <IconButton onClick={() => setShowAddCategory(!showAddCategory)} sx={{ ml: 1 }}>
              <Add />
            </IconButton>
          </Box>
          {showAddCategory && (
            <Box sx={{ display: 'flex', mb: 2 }}>
              <TextField
                fullWidth
                label="New Category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <Button onClick={addCategory} variant="outlined" sx={{ ml: 1 }}>
                Add
              </Button>
            </Box>
          )}
          <Button
            variant="contained"
            fullWidth
            onClick={submit}
            sx={{ mt: 2 }}
          >
            Update Book
          </Button>
        </Paper>
        <ConfirmDialog
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={confirmSubmit}
          title="Confirm Update Book"
          message="Are you sure you want to update this book?"
        />
      </Box>
    </Layout>
  );
}

export default EditBook;