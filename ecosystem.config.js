module.exports = {
  apps: [
    {
      name: "app",
      script: "./www/app.js",
      env_production: {
        NODE_ENV: "production",
      },
      log_file: "./logs/combined.log", // Enregistrer tous les logs combinés
      error_file: "./logs/err.log", // Enregistrer les erreurs dans err.log
      max_memory_restart: "200M", // Redémarrer l'application si elle dépasse 200 Mo
      instances: 3, // Lancer 3 instances en parallèle
      exec_mode: "cluster", // Mode cluster pour répartir la charge
    },
  ],
};
