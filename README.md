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

-  Error with `svelte.config.js`
   
   <details>
    <summary>LOGS</summary>
    <pre>
      Initialize language server at  d:/Sagnik/Projects/svelte-app
      Initialize new ts service at  
      Trying to load config for d:/Sagnik/Projects/svelte-app/src/App.svelte
      Error while loading config
      Error: Cannot find module 'svelte-preprocess'
      Require stack:
      - d:\Sagnik\Projects\svelte-app\svelte.config.js
      - c:\Users\A\.vscode\extensions\svelte.svelte-vscode-99.0.32\node_modules\cosmiconfig\dist\loaders.js
      - c:\Users\A\.vscode\extensions\svelte.svelte-vscode-99.0.32\node_modules\cosmiconfig\dist\ExplorerBase.js
      - c:\Users\A\.vscode\extensions\svelte.svelte-vscode-99.0.32\node_modules\cosmiconfig\dist\Explorer.js
      - c:\Users\A\.vscode\extensions\svelte.svelte-vscode-99.0.32\node_modules\cosmiconfig\dist\index.js
      - c:\Users\A\.vscode\extensions\svelte.svelte-vscode-99.0.32\node_modules\svelte-language-server\dist\src\plugins\svelte\SveltePlugin.js
      - c:\Users\A\.vscode\extensions\svelte.svelte-vscode-99.0.32\node_modules\svelte-language-server\dist\src\plugins\index.js
      - c:\Users\A\.vscode\extensions\svelte.svelte-vscode-99.0.32\node_modules\svelte-language-server\dist\src\server.js
      - c:\Users\A\.vscode\extensions\svelte.svelte-vscode-99.0.32\node_modules\svelte-language-server\bin\server.js
          at Function.Module._resolveFilename (internal/modules/cjs/loader.js:717:15)
          at Module._load (internal/modules/cjs/loader.js:622:27)
          at Module._load (electron/js2c/asar.js:717:26)
          at Function.Module._load (electron/js2c/asar.js:717:26)
          at Module.require (internal/modules/cjs/loader.js:775:19)
          at require (internal/modules/cjs/helpers.js:68:18)
          at Object.<anonymous> (d:\Sagnik\Projects\svelte-app\svelte.config.js:1:26)
          at Module._compile (internal/modules/cjs/loader.js:880:30)
          at Object.Module._extensions..js (internal/modules/cjs/loader.js:892:10)
          at Module.load (internal/modules/cjs/loader.js:735:32) {
        code: 'MODULE_NOT_FOUND',
        requireStack: [
          'd:\\Sagnik\\Projects\\svelte-app\\svelte.config.js',
          'c:\\Users\\A\\.vscode\\extensions\\svelte.svelte-vscode-99.0.32\\node_modules\\cosmiconfig\\dist\\loaders.js',
          'c:\\Users\\A\\.vscode\\extensions\\svelte.svelte-vscode-99.0.32\\node_modules\\cosmiconfig\\dist\\ExplorerBase.js',
          'c:\\Users\\A\\.vscode\\extensions\\svelte.svelte-vscode-99.0.32\\node_modules\\cosmiconfig\\dist\\Explorer.js',
          'c:\\Users\\A\\.vscode\\extensions\\svelte.svelte-vscode-99.0.32\\node_modules\\cosmiconfig\\dist\\index.js',
          'c:\\Users\\A\\.vscode\\extensions\\svelte.svelte-vscode-99.0.32\\node_modules\\svelte-language-server\\dist\\src\\plugins\\svelte\\SveltePlugin.js',
          'c:\\Users\\A\\.vscode\\extensions\\svelte.svelte-vscode-99.0.32\\node_modules\\svelte-language-server\\dist\\src\\plugins\\index.js',
          'c:\\Users\\A\\.vscode\\extensions\\svelte.svelte-vscode-99.0.32\\node_modules\\svelte-language-server\\dist\\src\\server.js',
          'c:\\Users\\A\\.vscode\\extensions\\svelte.svelte-vscode-99.0.32\\node_modules\\svelte-language-server\\bin\\server.js'
        ]
      }
      No svelte.config.js found but one is needed. Using https://github.com/sveltejs/svelte-preprocess as fallback
      Using svelte-preprocess v3.7.4 from c:\Users\A\.vscode\extensions\svelte.svelte-vscode-99.0.32\node_modules\svelte-preprocess
      Using Svelte v3.19.2 from c:\Users\A\.vscode\extensions\svelte.svelte-vscode-99.0.32\node_modules\svelte-language-server\node_modules\svelte\compiler
      Using Svelte v3.19.2 from c:\Users\A\.vscode\extensions\svelte.svelte-vscode-99.0.32\node_modules\svelte-language-server\node_modules\svelte\compiler
      Preprocessing failed
      Error: Cannot find any of modules: node-sass,sass
          at Object.exports.importAny (c:\Users\A\.vscode\extensions\svelte.svelte-vscode-99.0.32\node_modules\svelte-preprocess\dist\utils.js:1:2844)

    </pre>
   </details>

    If we look at logs it seems like svelte extension unable to get packages in `svelte.config.js` due to yarn 2s own module resolution.
    
    **FIX!!**
    The fix was pretty simple, just had to call the pnp api to take over the module resolution
    ```js
    // svelte.config.js
    require('./.pnp.js').setup()
    const sveltePreprocess = require("svelte-preprocess");

    module.exports = {
      preprocess: sveltePreprocess(),
    };
    ```
