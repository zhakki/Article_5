import { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [variant, setVariant] = useState("danger");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/auth/signin", {
        email,
        password,
      });

      // Сохраняем токен в localStorage
      localStorage.setItem("token", res.data.token);

      setVariant("success");
      setMessage("Login successful!");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/profile");
      }, 1000);
    } catch (err) {
      setVariant("danger");
      setMessage(err.response?.data?.message || "Login failed.");
      onClose();
    }
  };

  return (
    <Card className="mx-auto mt-5 p-4" style={{ maxWidth: "400px" }}>
      <h2 className="mb-3 text-center">Login</h2>

      {message && <Alert variant={variant}>{message}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Login
        </Button>
      </Form>
    </Card>
  );
}

export default LoginPage;
