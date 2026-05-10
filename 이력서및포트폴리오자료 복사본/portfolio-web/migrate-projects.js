import fs from 'fs';
import path from 'path';

const srcDir = '../files (3)';
const destDir = './src/content/projects';

// Remove dummy files
if (fs.existsSync(path.join(destDir, '01-local-ai.md'))) fs.unlinkSync(path.join(destDir, '01-local-ai.md'));
if (fs.existsSync(path.join(destDir, '02-jann.md'))) fs.unlinkSync(path.join(destDir, '02-jann.md'));

const projects = [
  {
    src: '01_열풍로발열량_LHV_예측_프로젝트.md',
    dest: '01_lhv.md',
    frontmatter: `---
idx: 1
slug: "lhv"
title: "Hot-stove LHV prediction"
titleKo: "열풍로 발열량 LHV 예측"
role: "FORECASTING · TIME SERIES"
year: "2026"
metric: "MAE 11.99"
bg: "linear-gradient(170deg, #DCE3F6 0%, #4F6FE0 100%)"
---

`
  },
  {
    src: '02_비계획_Skinpass_예측_프로젝트.md',
    dest: '02_skinpass.md',
    frontmatter: `---
idx: 2
slug: "skinpass"
title: "Unplanned skinpass anomaly"
titleKo: "비계획 Skinpass 예측"
role: "ANOMALY · CLASSIFICATION"
year: "2026"
metric: "Recall 0.595"
bg: "#0E0E10"
dotted: true
---

`
  },
  {
    src: '03_JANN_FoodAlchemi_iOS_프로젝트.md',
    dest: '03_jann.md',
    frontmatter: `---
idx: 3
slug: "jann-app"
title: "JANN — FoodAlchemi iOS app"
titleKo: "JANN 프로젝트"
role: "iOS · SWIFT · ML"
year: "2026"
metric: "shipped to App Store"
bg: "linear-gradient(180deg, #EFEFF1 0%, #BCBCC2 100%)"
---

`
  }
];

projects.forEach(p => {
  const content = fs.readFileSync(path.join(srcDir, p.src), 'utf8');
  fs.writeFileSync(path.join(destDir, p.dest), p.frontmatter + content);
});

console.log('Done!');
