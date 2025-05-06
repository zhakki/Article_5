import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Spinner, Alert, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function MyArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMyArticles = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/api/articles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const myId = JSON.parse(atob(token.split('.')[1])).userId;
      const myArticles = res.data.articles.filter(
        (article) => article.author?.id === myId
      );

      setArticles(myArticles);
    } catch (err) {
      setError("Failed to fetch articles.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug) => {
    const confirmed = window.confirm("Are you sure you want to delete this article?");
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/articles/my/${slug}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setArticles((prev) => prev.filter((a) => a.slug !== slug));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete article.");
    }
  };

  useEffect(() => {
    fetchMyArticles();
  }, []);

  return (
    <Container className="mt-4">
      <h2>My Articles</h2>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {articles.map((article) => (
        <Card key={article.id} className="mb-3">
          <Card.Body>
            <Card.Title>{article.title}</Card.Title>
            <Card.Text>{article.description}</Card.Text>
            {article.image && (
              <img
                src={article.image}
                alt="Article"
                style={{ maxWidth: "100%", maxHeight: "200px", objectFit: "cover" }}
              />
            )}
            <div className="mt-3">
              <Link to={`/articles/${article.slug}`}>
                <Button variant="primary" className="me-2">Read</Button>
              </Link>
              <Link to={`/articles/edit/${article.slug}`}>
                <Button variant="warning" className="me-2">Edit</Button>
              </Link>
              <Button variant="danger" onClick={() => handleDelete(article.slug)}>
                Delete
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default MyArticlesPage;
