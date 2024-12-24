const express = require("express");
const ArticlesController = require("./articles.controller"); // Import correct
const authMiddleware = require("../../middlewares/auth"); // Middleware d'authentification

const router = express.Router();

// Routes pour les articles
router.post("/", authMiddleware, ArticlesController.create); // Création d'un article
router.put("/:id", authMiddleware, ArticlesController.update); // Mise à jour d'un article
router.delete("/:id", authMiddleware, ArticlesController.delete); // Suppression d'un article
router.get("/user/:userId", ArticlesController.getByUser); // Récupération des articles d'un utilisateur (public)

module.exports = router; // Assurez-vous que vous exportez bien le routeur
