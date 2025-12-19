#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// UTM 参数配置
const UTM_BASE = '?utm_source=blog&utm_medium=referral';

// 文章目录到 campaign 名称的映射
const CAMPAIGN_MAP = {
  'solo-creator-multi-platform-strategy': 'solo-creator-guide',
  'multipost-vs-buffer': 'vs-buffer',
  'multipost-vs-hootsuite': 'vs-hootsuite',
  'multipost-vs-xinbang': 'vs-xinbang',
  'multipost-vs-yixiaoer': 'vs-yixiaoer',
  'platforms-introduce': 'platform-list',
  'introducing-multipost': 'introduction',
  'saas-boosts-social-media-efficiency-podcast': 'podcast-saas',
};

// 检测链接位置类型并返回 utm_content
function detectLinkType(line) {
  // Card CTA 按钮
  if (line.includes('<Card') && line.includes('href=')) {
    return 'cta';
  }
  // 表格中的链接
  if (line.trim().startsWith('|') || line.includes('|')) {
    return 'table';
  }
  // 任务清单中的链接
  if (line.trim().match(/^-\s*\[\s*\]/)) {
    return 'checklist';
  }
  // 默认为正文内链接
  return 'inline';
}

// 处理单个文件
function processFile(filePath) {
  console.log(`Processing: ${filePath}`);

  // 从文件路径提取文章目录名
  const pathParts = filePath.split(path.sep);
  const articleDir = pathParts[pathParts.indexOf('docs') + 1];
  const campaign = CAMPAIGN_MAP[articleDir] || articleDir;

  // 读取文件内容
  let content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  let modified = false;

  // 逐行处理
  const newLines = lines.map(line => {
    // 跳过已经有 UTM 参数的链接
    if (line.includes('utm_source=')) {
      return line;
    }

    // 查找 multipost.app 链接
    if (line.includes('https://multipost.app')) {
      const linkType = detectLinkType(line);
      const utmParams = `${UTM_BASE}&utm_campaign=${campaign}&utm_content=${linkType}`;

      // 替换链接
      const newLine = line.replace(
        /https:\/\/multipost\.app(?!\/)/g,
        `https://multipost.app${utmParams}`
      );

      if (newLine !== line) {
        modified = true;
        console.log(`  ✓ Added UTM params (${linkType})`);
      }

      return newLine;
    }

    return line;
  });

  // 如果有修改，保存文件
  if (modified) {
    fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
    console.log(`  ✅ File updated`);
    return true;
  } else {
    console.log(`  ⏭️  No changes needed`);
    return false;
  }
}

// 递归查找所有 .mdx 文件
function findMdxFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...findMdxFiles(fullPath));
    } else if (item.endsWith('.mdx')) {
      files.push(fullPath);
    }
  }

  return files;
}

// 主函数
function main() {
  const contentDir = path.join(__dirname, 'content', 'docs');

  console.log('🔍 Scanning for .mdx files...\n');
  const mdxFiles = findMdxFiles(contentDir);

  console.log(`Found ${mdxFiles.length} .mdx files\n`);
  console.log('📝 Adding UTM parameters...\n');

  let updatedCount = 0;
  for (const file of mdxFiles) {
    // 只处理包含 multipost.app 链接的文件
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('https://multipost.app')) {
      if (processFile(file)) {
        updatedCount++;
      }
      console.log('');
    }
  }

  console.log(`\n✅ Complete! Updated ${updatedCount} files`);
}

main();
