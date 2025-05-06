import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  Spinner,
  Alert,
  Container,
  Form,
  Button,
} from 'react-bootstrap';

function ArticleDetailPage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingBody, setEditingBody] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 Получение ID текущего пользователя из JWT
  const token = localStorage.getItem('token');
  let currentUserId = null;
  try {
    const payload = JSON.parse(atob(token?.split('.')[1] || 'e30='));
    currentUserId = payload.id || payload.userId;
  } catch (err) {
    console.warn('Invalid token');
  }

  const fetchArticle = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/articles/${slug}`);
      setArticle(res.data.article);
    } catch (err) {
      setError('Failed to load article');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [slug]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    try {
      await axios.post(
        `http://localhost:3000/api/comments/${article.id}`,
        { body: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewComment('');
      fetchArticle();
    } catch (err) {
      setError('Failed to post comment');
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`http://localhost:3000/api/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchArticle();
    } catch (err) {
      setError('Failed to delete comment');
    }
  };

  const handleUpdate = async (commentId) => {
    try {
      await axios.put(
        `http://localhost:3000/api/comments/${commentId}`,
        { body: editingBody },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingCommentId(null);
      setEditingBody('');
      fetchArticle();
    } catch (err) {
      setError('Failed to update comment');
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!article) return null;

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title as="h2">{article.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            <strong>Description:</strong> {article.description}
          </Card.Subtitle>

          {article.image && (
            <Card.Img
              variant="top"
              src={article.image}
              alt={article.title}
              className="my-3"
            />
          )}

          <Card.Text style={{ whiteSpace: 'pre-line' }}>{article.body}</Card.Text>
        </Card.Body>
      </Card>

      <h4 className="mt-5">Comments</h4>
      {article.comment.map((comment) => (
        <Card key={comment.id} className="mb-3">
          <Card.Body>
            <strong>{comment.author.username}:</strong>
            {editingCommentId === comment.id ? (
              <>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={editingBody}
                  onChange={(e) => setEditingBody(e.target.value)}
                  className="my-2"
                />
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => handleUpdate(comment.id)}
                  className="me-2"
                >
                  Save
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setEditingCommentId(null);
                    setEditingBody('');
                  }}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <p>{comment.body}</p>
            )}

            {comment.author.id === currentUserId && editingCommentId !== comment.id && (
              <>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => {
                    setEditingCommentId(comment.id);
                    setEditingBody(comment.body);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(comment.id)}
                >
                  Delete
                </Button>
              </>
            )}
          </Card.Body>
        </Card>
      ))}

      <Form.Group className="mt-4">
        <Form.Label>Add Comment</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button
          className="mt-2"
          onClick={handleCommentSubmit}
          disabled={!newComment.trim()}
        >
          Post Comment
        </Button>
      </Form.Group>
    </Container>
  );
}

export default ArticleDetailPage;
