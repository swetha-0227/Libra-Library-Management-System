import {
  TextField, Button, Paper, Typography, Box, FormControl, InputLabel, Select, MenuItem, IconButton
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import API from "../api/axiosConfig";
import { toast } from "react-toastify";
import ConfirmDialog from "../components/common/ConfirmDialog";

function AddBook() {
  const [book, setBook] = useState({ title: "", author: "", categoryId: "" });
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

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
      await API.post("/books", {
        title: book.title,
        author: book.author,
        category: { id: book.categoryId }
      });
      toast.success("Book Added Successfully");
      navigate('/books');
      setBook({ title: "", author: "", categoryId: "" });
      setConfirmOpen(false);
    } catch (error) {
      toast.error("Error adding book");
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

  return (
    <Layout>
      <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
        <Typography variant="h4" gutterBottom>Add New Book</Typography>
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
            Add Book
          </Button>
        </Paper>
        <ConfirmDialog
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={confirmSubmit}
          title="Confirm Add Book"
          message="Are you sure you want to add this book?"
        />
      </Box>
    </Layout>
  );
}

export default AddBook;