module.exports = {
  apps : [{
    name: "university",
    script: "./src/App.js",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}