module.exports = function override(config, env) {
    // Add the following to fallback to an empty module for path
    config.resolve.fallback = {
      path: false,
    };
    return config;
  };
  