import fs from 'fs';
import path from 'path';

const inputConfigs = [
  {
    key: 'components',
    root: './src/dk-library/components',
    publicPath: '/dk-library/components',
    flat: false
  },
  {
    key: 'library',
    root: './src/dk-library/library',
    publicPath: '/dk-library/library',
    flat: true
  }
];

function extractTitle(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/^#\s+(.*)$/m);
  return match ? match[1].trim() : null;
}

function toTitleCase(str) {
  return str
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

function generateSidebarSection(rootDir, publicPath, isFlat = false) {
  const sections = [];

  const topDirs = fs.readdirSync(rootDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory());

  if (isFlat) {
    const items = [];

    for (const topDir of topDirs) {
      const moduleIndex = path.join(rootDir, topDir.name, 'index.md');

      if (fs.existsSync(moduleIndex)) {
        const title = extractTitle(moduleIndex) || toTitleCase(topDir.name);
        items.push({
          text: title,
          link: `${publicPath}/${topDir.name}/`,
          items: []
        });
      }
    }

    sections.push({
      text: 'Library modules',
      items
    });
  } else {
    for (const topDir of topDirs) {
      const sectionPath = path.join(rootDir, topDir.name);
      const sectionIndex = path.join(sectionPath, 'index.md');

      const sectionTitle = fs.existsSync(sectionIndex)
        ? extractTitle(sectionIndex) || toTitleCase(topDir.name)
        : toTitleCase(topDir.name);

      const group = {
        text: sectionTitle,
        link: `${publicPath}/${topDir.name}/`,
        items: []
      };

      const subDirs = fs.readdirSync(sectionPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory());

      for (const sub of subDirs) {
        const subPath = path.join(sectionPath, sub.name, 'index.md');
        if (fs.existsSync(subPath)) {
          const subTitle = extractTitle(subPath) || toTitleCase(sub.name);
          group.items.push({
            text: subTitle,
            link: `${publicPath}/${topDir.name}/${sub.name}/`
          });
        }
      }

      sections.push(group);
    }
  }

  return sections;
}

function generateNamedSidebar(configs) {
  const result = {};
  for (const cfg of configs) {
    const resolvedPath = path.resolve(cfg.root);
    result[cfg.key] = generateSidebarSection(resolvedPath, cfg.publicPath, cfg.flat);
  }
  return result;
}

const sidebarMap = generateNamedSidebar(inputConfigs);

// Save as namespaced JSON
const outputPath = './.vitepress/generated-sidebar.json';
fs.writeFileSync(outputPath, JSON.stringify(sidebarMap, null, 2));
console.log(`✔ Sidebar map written to ${outputPath}`);
