import { Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

function Sidebar() {
  const role = localStorage.getItem("role");

  const menu = [
    { text: "Dashboard", path: "/dashboard", roles: ["STUDENT", "ADMIN"] },
    { text: "Books", path: "/books", roles: ["STUDENT", "ADMIN"] },
    { text: "Add Book", path: "/add-book", roles: ["ADMIN"] },
    { text: "Issue Book", path: "/issue-book", roles: ["ADMIN"] },
    { text: "Return Book", path: "/return-book", roles: ["ADMIN"] },
    { text: "Users", path: "/users", roles: ["ADMIN"] },
    { text: "Logs", path: "/logs", roles: ["ADMIN"] },
  ];

  const filteredMenu = menu.filter(item => item.roles.includes(role));

  return (
    <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
      <List sx={{ width: 240, pt: 8 }}>
        {filteredMenu.map((item) => (
          <ListItemButton component={Link} to={item.path} key={item.text}>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;