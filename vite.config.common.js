import path from 'path';

/** @typedef {import("@types/npmcli__package-json").PackageJson} PackageJson */

/**
* generate a vite config object
*
* example use:
*
* ```
* import pkg from './package.json';
* import getViteConfig from './vite.config.common.js';
* export default getViteConfig({pkg, __dirname});
* ```
*
* @param {Object} options
* @param {PackageJson} options.pkg data of package.json
* @param {string} options.__dirname __dirname of vite.config.js
* @param {string} [options.entryFile] main source. default: index.js
*
* @return {import("vite").UserConfig}
*/
export default function getViteConfig(options) {

  const pkg = options.pkg;

  const entryFile = options.entryFile || 'index.js';

  const distDir = path.dirname(pkg.module);
  const scriptBase = path.basename(pkg.module || "index.js", ".js");
  const styleFile = path.relative(distDir, pkg.style || "index.css");

  // camelCaseName
  const libName = (
    pkg.name.split(/[^a-zA-Z0-9]+/).reduce((acc, part) => (
      acc ? (acc + part[0].toUpperCase() + part.slice(1)) : part
    ), "")
  );

  const assetsDir = '';
  const outputDefaults = {
    // remove hashes from filenames
    chunkFileNames: `${assetsDir}[name].js`,
    assetFileNames: (assetInfo) => {
      // rename style.css https://github.com/vitejs/vite/issues/4863
      if (assetInfo.name == 'style.css') {
        return styleFile;
      }
      return `${assetsDir}[name].[ext]`;
    },
  };

  /** @type {import("vite").UserConfig} */
  return {
    clearScreen: false,
    worker: {
      rollupOptions: {
        output: {
          ...outputDefaults,
        }
      },
    },
    build: {
      // https://vitejs.dev/guide/build.html#library-mode
      lib: {
        target: 'esnext',
        //formats: ['es', 'umd'],
        formats: ['es'], // ESM only
        entry: path.resolve(options.__dirname, entryFile),
        name: libName,
        fileName: scriptBase,
      },
      minify: false,
      //sourcemap: true,
      rollupOptions: {
        external: Object.keys(pkg.dependencies || {}),
        output: {
          ...outputDefaults,
        },
      },
    },
    plugins: [
    ],
  };
}
