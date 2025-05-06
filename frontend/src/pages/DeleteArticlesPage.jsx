import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Alert, Row, Col, Spinner } from "react-bootstrap";

function DeleteArticles() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchMyArticles = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/api/articles/me/articles", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setArticles(res.data.articles);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load your articles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyArticles();
  }, []);

  const handleDelete = async (slug) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/articles/my/${slug}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setArticles(prev => prev.filter(article => article.slug !== slug));
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete article.");
    }
  };

  return (
    <div className="mt-5">
      <h2>Delete Articles</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading && <Spinner animation="border" className="d-block mx-auto mt-4" />}

      <Row className="mt-4">
        {articles.map(article => (
          <Col key={article.id} md={4} className="mb-4">
            <Card>
              {article.image && (
                <Card.Img
                  variant="top"
                  src={article.image}
                  style={{ objectFit: "cover", height: "200px" }}
                />
              )}
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(article.slug)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default DeleteArticles;
