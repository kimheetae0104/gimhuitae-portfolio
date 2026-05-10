import fs from 'fs';
import path from 'path';

const dir = './src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove window.Component = Component
  content = content.replace(/window\.[a-zA-Z0-9_]+\s*=\s*[a-zA-Z0-9_]+;\n?/g, '');
  
  // Remove /* global React, ... */
  content = content.replace(/\/\* global .*? \*\/\n?/g, '');
  
  // Find component name
  const match = content.match(/function\s+([a-zA-Z0-9_]+)\s*\(/);
  if (match) {
    const componentName = match[1];
    content += `\nexport default ${componentName};\n`;
  }
  
  fs.writeFileSync(filePath, content);
});
