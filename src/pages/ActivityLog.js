import { useEffect, useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, Typography, Box } from "@mui/material";
import API from "../api/axiosConfig";
import Layout from "../components/layout/Layout";

function ActivityLog() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await API.get("/admin/logs");
      setLogs(res.data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>Activity Log</Typography>
        <Paper sx={{ p: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Activity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.length > 0 ? (
                logs.map((log, index) => (
                  <TableRow key={index}>
                    <TableCell>{typeof log === 'string' ? log : JSON.stringify(log)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell>No activity logs available.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </Layout>
  );
}

export default ActivityLog;
