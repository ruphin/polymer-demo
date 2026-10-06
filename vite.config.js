import { defineConfig } from 'vite';
import { readFileSync, existsSync, globSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import CoffeeScript from 'coffeescript';
import * as sass from 'sass';

// The app is a Polymer 0.4 app that relies on HTML imports (polyfilled at
// runtime by vendor/platform/platform.js). Vite cannot bundle HTML imports,
// so the element/page HTML files, CoffeeScript and SCSS sources are served
// and emitted as standalone static files, mirroring the old gulp build.
const root = resolve(import.meta.dirname, 'app');

const compileCoffee = (file) =>
  CoffeeScript.compile(readFileSync(file, 'utf8'), { bare: true, filename: file });
const compileScss = (file) => sass.compile(file, { style: 'expanded' }).css;

// Map a requested output path to its source file and compiler.
function resolveSource(urlPath) {
  const path = join(root, decodeURIComponent(urlPath));
  if (!path.startsWith(root + '/') || path.startsWith(join(root, 'public') + '/')) return null;
  if (path.endsWith('.js')) {
    const src = path.replace(/\.js$/, '.coffee');
    if (existsSync(src)) return { type: 'application/javascript', compile: () => compileCoffee(src) };
  } else if (path.endsWith('.css')) {
    const src = path.replace(/\.css$/, '.scss');
    if (existsSync(src)) return { type: 'text/css', compile: () => compileScss(src) };
  } else if (path.endsWith('.html') && path !== join(root, 'index.html') && existsSync(path)) {
    // Serve HTML imports raw, without Vite's client injection.
    return { type: 'text/html', compile: () => readFileSync(path, 'utf8') };
  }
  return null;
}

function polymerAssets() {
  return {
    name: 'polymer-assets',
    // Keep <link rel="import"> tags untouched (no hashing/rewriting).
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => html.replace(/<link rel="import"/g, '<link vite-ignore rel="import"'),
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const source = resolveSource(req.url.split('?')[0]);
        if (!source) return next();
        try {
          res.setHeader('Content-Type', source.type);
          res.end(source.compile());
        } catch (err) {
          next(err);
        }
      });
    },
    generateBundle() {
      const files = globSync(['**/*.coffee', '**/*.scss', '**/*.html'], {
        cwd: root,
        exclude: (f) => f === 'index.html' || f.startsWith('public'),
      });
      for (const file of files) {
        const fileName = relative(root, join(root, file)).replace(/\.coffee$/, '.js').replace(/\.scss$/, '.css');
        this.emitFile({ type: 'asset', fileName, source: resolveSource('/' + fileName).compile() });
      }
    },
  };
}

export default defineConfig({
  root,
  build: {
    outDir: resolve(import.meta.dirname, 'dist'),
    emptyOutDir: true,
  },
  plugins: [polymerAssets()],
});
