module.exports = function (api) {
  api.cache(true);
  return {
    caches: true,
    plugins: ["macros"],
  };
};
