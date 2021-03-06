const airbnb = require('@neutrinojs/airbnb');
const reactComponents = require('@neutrinojs/react-components');
const jest = require('@neutrinojs/jest');

module.exports = {
  options: {
    root: __dirname,
  },
  use: [
    airbnb({
      eslint: {
        parserOptions: {
          'ecmaVersion': 11,
        },
        rules: {
          'object-curly-newline': ["error", { "multiline": true, "consistent": true }],
          'comma-dangle': ["error", "never"]
        }
      }
    }),
    reactComponents({
      components: '.'
    }),
    jest(),
  ],
};
