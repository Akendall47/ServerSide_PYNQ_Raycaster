import { build } from 'esbuild';
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzip } from 'node:zlib';
import { promisify } from 'node:util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(__dirname, 'src');
const templateDir = path.join(__dirname, 'templates');
const distDir = path.join(__dirname, 'dist');
const gzipAsync = promisify(gzip);

function extractBody(html, label) {
  const match = html.match(/<body[^>]*>([\s\S]*?)(?:<\/body>|<\/html>)/i);
  if (!match) {
    throw new Error(`Failed to extract <body> from ${label}`);
  }
  return match[1].trim();
}

async function generateTemplateModule() {
  const [pynqTemplate, simTemplate] = await Promise.all([
    readFile(path.join(templateDir, 'pynq-template.html'), 'utf8'),
    readFile(path.join(templateDir, 'sim-template.html'), 'utf8'),
  ]);

  const moduleSource = `export const monitorMarkup = ${JSON.stringify({
    pynq: extractBody(pynqTemplate, 'pynq-template.html'),
    sim: extractBody(simTemplate, 'sim-template.html'),
  }, null, 2)};\n`;

  await mkdir(srcDir, { recursive: true });
  await writeFile(path.join(srcDir, 'templates.generated.js'), moduleSource, 'utf8');
}

async function gzipDistAssets(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  await Promise.all(entries.map(async (entry) => {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await gzipDistAssets(entryPath);
      return;
    }
    if (!entry.isFile() || !entry.name.endsWith('.js')) return;
    const data = await readFile(entryPath);
    const compressed = await gzipAsync(data, { level: 9 });
    await writeFile(`${entryPath}.gz`, compressed);
  }));
}

async function main() {
  await rm(distDir, { recursive: true, force: true });
  await mkdir(distDir, { recursive: true });
  await generateTemplateModule();

  await build({
    entryPoints: {
      'monitor-ui': path.join(srcDir, 'monitor-ui.jsx'),
    },
    outdir: distDir,
    bundle: true,
    splitting: true,
    minify: true,
    sourcemap: false,
    format: 'esm',
    platform: 'browser',
    target: ['es2020'],
    entryNames: '[name]',
    chunkNames: 'chunks/[name]-[hash]',
    jsx: 'automatic',
    loader: {
      '.js': 'jsx',
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
    absWorkingDir: rootDir,
  });

  await gzipDistAssets(distDir);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
