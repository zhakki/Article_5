import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Spinner, Alert, Row, Col, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  return (
    <Row className="mt-5">
      {/* Sidebar */}
      <Col md={3}>
        <Card>
          <Card.Body>
            <Card.Title>Minu artiklid ja võimalused</Card.Title>

            <Button
              variant="outline-primary"
              className="mb-2 w-100"
              onClick={() => navigate("/my-articles")}
            >
              My Articles
            </Button>

            <Button
              variant="outline-success"
              className="mb-2 w-100"
              onClick={() => navigate("/articles/new")}
            >
              New Articles
            </Button>

            <Button
              variant="outline-warning"
              className="mb-2 w-100"
              onClick={() => navigate("/my-articles/update")}
            >
              Update Articles
            </Button>

            <Link to="/my-articles/delete">
              <Button variant="outline-danger" className="w-100">
                Delete Articles
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </Col>

      {/* Profile Content */}
      <Col md={9}>
        <Card className="p-4">
          <h2 className="mb-3 text-center">User Profile</h2>

          {error && <Alert variant="danger">{error}</Alert>}

          {!user && !error && (
            <Spinner animation="border" className="mx-auto d-block" />
          )}

          {user && (
            <div>
              <p><strong>ID:</strong> {user.id}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Role:</strong> {user.role}</p>
            </div>
          )}
        </Card>
      </Col>
    </Row>
  );
}

export default ProfilePage;
