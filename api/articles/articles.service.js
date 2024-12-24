const Article = require("./articles.schema");

class ArticlesService {
  async createArticle(data, userId) {
    // Ajouter l'utilisateur connecté à l'article
    const article = new Article({ ...data, user: userId });
    return article.save();
  }

  async updateArticle(articleId, data) {
    // Mise à jour de l'article
    return Article.findByIdAndUpdate(articleId, data, { new: true });
  }

  async deleteArticle(articleId) {
    // Suppression de l'article
    return Article.findByIdAndDelete(articleId);
  }

  async getArticlesByUser(userId) {
    // Récupérer les articles d'un utilisateur spécifique
    return Article.find({ user: userId }).populate("user", "-password");
  }
}

module.exports = new ArticlesService();
