require('./.pnp.js').setup()
const sveltePreprocess = require("svelte-preprocess");

module.exports = {
  preprocess: sveltePreprocess(),
};
