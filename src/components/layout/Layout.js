import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Box } from "@mui/material";

function Layout({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Topbar />
        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
}

export default Layout;