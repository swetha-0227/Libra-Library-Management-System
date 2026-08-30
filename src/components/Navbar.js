import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ background: "#333", padding: "10px", color: "white" }}>
      <Link to="/dashboard" style={{ margin: "10px", color: "white" }}>Dashboard</Link>
      <Link to="/books" style={{ margin: "10px", color: "white" }}>Books</Link>
      <Link to="/users" style={{ margin: "10px", color: "white" }}>Users</Link>

      <button onClick={logout} style={{ float: "right" }}>Logout</button>
    </div>
  );
}

export default Navbar;