import { AppBar, Toolbar, Typography, Button } from "@mui/material";

function Topbar() {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography sx={{ flexGrow: 1 }}>
          Library Management
        </Typography>

        <Button color="inherit" onClick={logout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;