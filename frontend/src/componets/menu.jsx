import { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from '../assets/log.webp';
import { Link, useNavigate } from "react-router-dom";  // Import useNavigate for redirection

const CustomNavbar = () => {
  const [active, setActive] = useState("Home");
  const [userEmail, setUserEmail] = useState(""); // State to store the email
  const navigate = useNavigate(); // Hook to handle redirection

  // Use useEffect to load the email from localStorage when the component mounts
  useEffect(() => {
    // Check if there's a valid token in localStorage
    const authToken = localStorage.getItem("authToken");

    // If no token exists, redirect to the login page
    if (!authToken) {
      navigate("/login"); // Change '/login' to your login route
    } else {
      const storedEmail = localStorage.getItem("email"); // Retrieve the email if the token is valid
      if (storedEmail) {
        setUserEmail(storedEmail); // Set the email to the state
      }
    }
  }, [navigate]); // Re-run the effect whenever navigate changes (route change)

  return (
    <Navbar expand="md" bg="dark" variant="dark" fixed="top" className="shadow-lg">
      <Container>
        {/* Brand Name */}
        <Navbar.Brand href="#" className="fw-bold fs-3">
          <img src={logo} alt="My Image" style={{ marginLeft: '0px', marginTop: '0px', width: '100%', maxWidth: '80px' }} />
        </Navbar.Brand>

        {/* Mobile Toggle Button */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Collapsible Navbar */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {[
              { name: "Home", path: "/dashboard" },
              { name: "All Apps", path: "/admin-allapps" },
              { name: "Create App", path: "/create-app" },
              { name: "Cancelled Apps Users", path: "/admin-cancelled" },
              { name: "Scheduled Apps ", path: "/admin-scheduled" },
              { name: "Completed Apps", path: "/admin-completed" },
            ].map(({ name, path }) => (
              <Nav.Link
                as={Link}
                key={name}
                to={path}
                className={`mx-2 fw-medium  nav-link-item ${
                  active === name ? "text-primary fw-bold" : "text-white"
                }`}
                onClick={() => setActive(name)}
              >
                {name}
              </Nav.Link>
            ))}
          </Nav>

          {/* Call-to-Action Button */}
          <Button variant="" className="navbutton">
            <span className="user-name" id="localStorageValue">
              {userEmail ? userEmail : "No email found"}  {/* Show the email or fallback text */}
            </span>
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
