import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Spinner, Alert, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";

function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/articles')
      .then(response => {
        setArticles(response.data.articles);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch articles');
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="mt-4">
      {articles.map(article => (
        <Card key={article.id} className="mb-4 shadow-sm">
          {article.image && (
            <Card.Img
              variant="top"
              src={article.image}
              style={{ maxHeight: "250px", objectFit: "cover" }}
              alt={article.title}
            />
          )}
          <Card.Body>
            <Card.Title>{article.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {article.description}
            </Card.Subtitle>
            <Card.Text>
              {article.body.length > 250
                ? `${article.body.slice(0, 250)}...`
                : article.body}
            </Card.Text>
            <Button
              as={Link}
              to={`/articles/${article.slug}`}
              variant="primary"
            >
              Loe rohkem
            </Button>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default ArticlesPage;
