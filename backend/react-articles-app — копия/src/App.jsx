import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ArticlesPage from "./pages/ArticlesPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import Layout from "./components/Layout";
import CreateArticlePage from "./pages/CreateArticlePage.jsx";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import MyArticlesPage from "./pages/MyArticlesPage";
import UpdateArticlesPage from "./pages/UpdateArticlesPage";
import DeleteArticlesPage from "./pages/DeleteArticlesPage";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/articles" element={<ArticlesPage />} />        
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/articles/new" element={<CreateArticlePage />} />
          <Route path="/articles/:slug" element={<ArticleDetailPage />} />
          <Route path="/my-articles" element={<MyArticlesPage />} />
          <Route path="/my-articles/update" element={<UpdateArticlesPage />} />
          <Route path="/my-articles/delete" element={<DeleteArticlesPage />} />


          
          </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
