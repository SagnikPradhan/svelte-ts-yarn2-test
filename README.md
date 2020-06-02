# svelte-yarn2-test

- Testing repo for yarn 2 and svelte
- Based on [Svelte Template](https://github.com/sveltejs/template)

## Reproduction steps

```bash
# Clone svelte app
npx degit sveltejs/template svelte-app
cd svelte-app

# Set yarn version to berry
yarn set version berry
yarn install

# Svelte preprocess init
yarn add --dev svelte-preprocess typescript sass
# Create svelte.config.js
# Edit rollup.config.js
# Edit App.svelte
```

## Observation

1. ### Error with `svelte.config.js`

   If we look at logs it seems like svelte extension unable to get packages in `svelte.config.js` due to yarn 2s own module resolution. The fix was pretty simple, just had to call the pnp api to take over the module resolution.

   ```js
   // svelte.config.js
   require("./.pnp.js").setup();
   const sveltePreprocess = require("svelte-preprocess");

   module.exports = {
     preprocess: sveltePreprocess(),
   };
   ```

2. Error with typescript plugin
