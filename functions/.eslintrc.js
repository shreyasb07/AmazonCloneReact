module.exports = {
  root: true,
  env: {
    es2017: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    quotes: ["error", "double"],
    "quote-props": ["error", "as-needed"],
    "max-len": ["error", {code: 160}],
  },
};
