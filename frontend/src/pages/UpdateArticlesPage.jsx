import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Alert, Spinner, Form, Row, Col } from "react-bootstrap";

function UpdateArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [editingSlug, setEditingSlug] = useState(null);
  const [form, setForm] = useState({ title: "", description: "", body: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const token = localStorage.getItem("token");

        const userRes = await axios.get("http://localhost:3000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const articlesRes = await axios.get("http://localhost:3000/api/articles");
        const myArticles = articlesRes.data.articles.filter(
          (article) => article.author.id === userRes.data.id
        );

        setArticles(myArticles);
      } catch (err) {
        setError("Failed to load your articles");
      }
    };

    fetchArticles();
  }, [success]);

  const handleEdit = (article) => {
    setEditingSlug(article.slug);
    setForm({
      title: article.title,
      description: article.description || "",
      body: article.body,
    });
    setError("");
    setSuccess("");
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/api/articles/${editingSlug}`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess("Article updated!");
      setEditingSlug(null);
    } catch (err) {
      setError("Failed to update article");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="mt-4">
      <h3>Update Articles</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      {!articles.length && <Spinner animation="border" />}
      <Row>
        {articles.map((article) => (
          <Col md={6} lg={4} key={article.id} className="mb-4">
            <Card>
              <Card.Body>
                {editingSlug === article.slug ? (
                  <>
                    <Form.Group className="mb-2">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Form.Label>Body</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="body"
                        rows={3}
                        value={form.body}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Button variant="success" onClick={handleUpdate}>
                      Save
                    </Button>{" "}
                    <Button
                      variant="secondary"
                      onClick={() => setEditingSlug(null)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Card.Title>{article.title}</Card.Title>
                    <Card.Text>{article.description}</Card.Text>
                    <Button onClick={() => handleEdit(article)}>Edit</Button>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default UpdateArticlesPage;

