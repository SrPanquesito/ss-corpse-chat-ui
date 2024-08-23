const globals = require("globals");
const pluginJs = require("@eslint/js");
const react = require("eslint-plugin-react");
const babelParser = require("@babel/eslint-parser");

module.exports = [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react,
    },
    languageOptions: {
      parser: babelParser, // Use Babel parser for JSX
      parserOptions: {
        requireConfigFile: false, // Allows parsing without a Babel config file
        babelOptions: {
          presets: ["@babel/preset-react"], // Use the React preset
        },
      },
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      "react/jsx-uses-react": "error", // Ensure React is marked as used
      "react/jsx-uses-vars": "error",  // Ensure variables used in JSX are marked as used
    },
  },
  {
    ignores: [".husky/*", "public/*", "coverage/*", "dist/*"],
  },
  pluginJs.configs.recommended,
];
