module.exports = {
  apps: [
    {
      name: "lootopia-client",
      script: "./server.js",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
      watch: false,
      autorestart: true,
      max_memory_restart: "500M",
    },
  ],
};
