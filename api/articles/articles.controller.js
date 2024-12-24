const ArticlesService = require("./articles.service");
const UnauthorizedError = require("../../errors/unauthorized");

class ArticlesController {
  async create(req, res, next) {
    try {
      const userId = req.user._id; // Récupérer l'ID de l'utilisateur connecté depuis req.user
      const article = await ArticlesService.createArticle(req.body, userId);
      req.io.emit("article:create", article);
      res.status(201).json(article);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const articleId = req.params.id;
      const userRole = req.user.role;

      if (userRole !== "admin") {
        throw new UnauthorizedError("Vous n'avez pas les permissions nécessaires pour modifier cet article.");
      }

      const article = await ArticlesService.updateArticle(articleId, req.body);
      res.json(article);
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const articleId = req.params.id;
      const userRole = req.user.role;

      if (userRole !== "admin") {
        throw new UnauthorizedError("Vous n'avez pas les permissions nécessaires pour supprimer cet article.");
      }

      await ArticlesService.deleteArticle(articleId);
      req.io.emit("article:delete", { id: articleId });
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }

  async getByUser(req, res, next) {
    try {
      const userId = req.params.userId;
      const articles = await ArticlesService.getArticlesByUser(userId);
      res.json(articles);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ArticlesController();
