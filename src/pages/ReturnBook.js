import {
  Table, TableHead, TableRow, TableCell,
  TableBody, Paper, Typography, Box, Button, Chip
} from "@mui/material";
import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import API from "../api/axiosConfig";
import { toast } from "react-toastify";
import ConfirmDialog from "../components/common/ConfirmDialog";

function ReturnBook() {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);

  useEffect(() => {
    fetchIssuedBooks();
  }, []);

  const fetchIssuedBooks = async () => {
    try {
      const res = await API.get("/issue");
      setIssuedBooks(res.data.filter(issue => issue.returnDate === null)); // Only show not returned books
    } catch (error) {
      console.error("Error fetching issued books:", error);
      toast.error("Failed to load issued books");
    }
  };

  const handleReturn = (issue) => {
    setSelectedIssue(issue);
    setConfirmOpen(true);
  };

  const confirmReturn = async () => {
    try {
      await API.post("/issue/return", null, {
        params: { issueId: selectedIssue.id }
      });
      toast.success(`Book "${selectedIssue.book.title}" returned successfully`);
      setConfirmOpen(false);
      setSelectedIssue(null);
      fetchIssuedBooks(); // Refresh the list
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Failed to return book";
      toast.error(`Failed to return book: ${message}`);
      console.error(error);
    }
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>Return Books</Typography>
        <Paper sx={{ p: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Book Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Student</TableCell>
                <TableCell>Issue Date</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {issuedBooks.map((issue) => (
                <TableRow key={issue.id}>
                  <TableCell>{issue.book.title}</TableCell>
                  <TableCell>{issue.book.author}</TableCell>
                  <TableCell>{issue.user.username}</TableCell>
                  <TableCell>{new Date(issue.issueDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(issue.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Chip
                      label={isOverdue(issue.dueDate) ? "Overdue" : "Active"}
                      color={isOverdue(issue.dueDate) ? "error" : "primary"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => handleReturn(issue)}
                    >
                      Return
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {issuedBooks.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                No books currently issued
              </Typography>
            </Box>
          )}
        </Paper>
        <ConfirmDialog
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={confirmReturn}
          title="Confirm Return Book"
          message={`Are you sure you want to return "${selectedIssue?.book.title}" from ${selectedIssue?.user.username}?`}
        />
      </Box>
    </Layout>
  );
}

export default ReturnBook;