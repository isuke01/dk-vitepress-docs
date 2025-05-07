import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Polyfill __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SYNC_TARGETS = [
  {
    name: 'Components',
    source: path.join(__dirname, '..', '..', 'Local Sites', 'dk-library', 'app', 'public', 'dekode-library', 'components'),
    target: path.resolve('./src/dk-library/components'),
    isLibrary: false
  },
  {
    name: 'Library Items',
    source: path.join(__dirname, '..', '..', 'Local Sites', 'dk-library', 'app', 'public', 'dekode-library', 'library'),
    target: path.resolve('./src/dk-library/library'),
    isLibrary: true
  }
];

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
}

function copyFileWithDirStructure(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
  console.log(`📎 Copied asset: ${src} → ${dest}`);
}

function findImagePaths(markdown) {
  const regex = /!\[.*?\]\((\.\/.*?)\)/g;
  const paths = [];
  let match;
  while ((match = regex.exec(markdown)) !== null) {
    paths.push(match[1]);
  }
  return paths;
}

function enhanceMarkdownFile(mdPath, hasScreenshot, itemKey = null, isLibrary = false, sourceDir = null) {
  let content = fs.readFileSync(mdPath, 'utf-8');
  const lines = content.split('\n');
  let newLines = [];
  let tocInserted = false;
  let screenshotInserted = false;
  let composerInjected = false;

  let composerBlock = [];

  // Prepare Composer block if needed
  if (isLibrary && itemKey && sourceDir) {
    const composerPath = path.join(sourceDir, 'composer.json');
    if (fs.existsSync(composerPath)) {
      try {
        const composer = JSON.parse(fs.readFileSync(composerPath, 'utf-8'));
        const version = composer.version || '*';
        composerBlock = [
          '',
          '## 💡 Install via Composer:',
          '```bash',
          `composer require dekode-library/${itemKey}:${version}`,
          '```',
          ''
        ];
        console.log(`🎼 Prepared composer require for ${itemKey}`);
      } catch (err) {
        console.warn(`⚠️ Could not parse composer.json for ${itemKey}: ${err.message}`);
      }
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // After # Heading → insert screenshot
    if (!screenshotInserted && /^#\s+/.test(line)) {
      newLines.push(line);
      if (hasScreenshot) {
        newLines.push('');
        newLines.push('![Screenshot](./screenshot.png)');
      }
      screenshotInserted = true;
      continue;
    }

    // Before first ## Header → insert [[toc]] + composer
    if (!tocInserted && /^##\s+/.test(line)) {
      newLines.push('[[toc]]');
      tocInserted = true;

      if (composerBlock.length && !composerInjected) {
        newLines.push(...composerBlock);
        composerInjected = true;
      }
    }

    newLines.push(line);
  }

  // Fallback: insert toc+composer at end if no ## was found
  if (!tocInserted) {
    newLines.push('[[toc]]');
    if (composerBlock.length && !composerInjected) {
      newLines.push(...composerBlock);
    }
  }

  fs.writeFileSync(mdPath, newLines.join('\n'), 'utf-8');
  console.log(`✏️ Enhanced: ${mdPath}`);
}

function copyReadmesRecursive(sourceDir, targetDir, isLibrary = false, originalSourceDir = null) {
  const entries = fs.readdirSync(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      copyReadmesRecursive(sourcePath, targetPath, isLibrary, sourcePath);
    } else if (entry.isFile() && /^readme\.md$/i.test(entry.name)) {
      ensureDir(targetDir);
      const newTargetPath = path.join(targetDir, 'index.md');
      const markdown = fs.readFileSync(sourcePath, 'utf-8');
      fs.writeFileSync(newTargetPath, markdown);
      console.log(`✔ Copied markdown: ${sourcePath} → ${newTargetPath}`);

      // Copy linked images
      const relImagePaths = findImagePaths(markdown);
      for (const relPath of relImagePaths) {
        const absImagePath = path.resolve(path.dirname(sourcePath), relPath);
        const targetImagePath = path.resolve(targetDir, relPath);
        if (fs.existsSync(absImagePath)) {
          copyFileWithDirStructure(absImagePath, targetImagePath);
        } else {
          console.warn(`⚠️ Image not found: ${absImagePath}`);
        }
      }

      // ✅ Always copy root-level screenshot.png if present
      const screenshotSrc = path.join(path.dirname(sourcePath), 'screenshot.png');
      const screenshotTarget = path.join(targetDir, 'screenshot.png');
      const hasScreenshot = fs.existsSync(screenshotSrc);

      if (hasScreenshot) {
        copyFileWithDirStructure(screenshotSrc, screenshotTarget);
      }

      // Enhance markdown with TOC + Screenshot + Composer
      const itemKey = path.basename(targetDir);
      enhanceMarkdownFile(newTargetPath, hasScreenshot, itemKey, isLibrary, path.dirname(sourcePath));
    }
  }
}

function syncContent({ name, source, target, isLibrary }) {
  console.log(`🔁 Syncing ${name}:`);
  if (!fs.existsSync(source)) {
    console.error(`❌ Source path does not exist: ${source}`);
    return;
  }
  console.log(`📂 Copying from ${source} to ${target}...`);
  copyReadmesRecursive(source, target, isLibrary);
}

// 🔄 Run all sync targets
for (const config of SYNC_TARGETS) {
  syncContent(config);
}
