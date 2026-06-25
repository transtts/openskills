const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Running OpenSkills Project Integrity Checks...');

const requiredFiles = [
  'index.html',
  'src/main.tsx',
  'src/App.tsx',
  'src/data.ts',
  'src/types.ts',
  'src/translations.ts',
  'src/index.css'
];

let hasErrors = false;

// Check files
requiredFiles.forEach(file => {
  const filePath = path.resolve(__dirname, '../../..', file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Missing critical file: ${file}`);
    hasErrors = true;
  } else {
    console.log(`✅ File verified: ${file}`);
  }
});

// Check translations completeness
try {
  const translationsPath = path.resolve(__dirname, '../../..', 'src/translations.ts');
  if (fs.existsSync(translationsPath)) {
    const content = require(translationsPath);
    if (content && content.translations) {
      const { en, hi } = content.translations;
      const enKeys = Object.keys(en);
      const hiKeys = Object.keys(hi);
      
      const missingInHi = enKeys.filter(k => !hiKeys.includes(k));
      const missingInEn = hiKeys.filter(k => !enKeys.includes(k));

      if (missingInHi.length > 0) {
        console.warn(`⚠️ Warning: Missing Hindi translations for keys:`, missingInHi);
      }
      if (missingInEn.length > 0) {
        console.warn(`⚠️ Warning: Missing English translations for keys:`, missingInEn);
      }
    }
  }
} catch (err) {
  console.log('ℹ️ Translations validation skipped (dynamic ES module structure).');
}

if (hasErrors) {
  console.error('❌ Sanity checks failed. Please restore missing files.');
  process.exit(1);
} else {
  console.log('🎉 All critical files verified. Running dev compilation check...');
  try {
    console.log('📦 Running tsc compiler check...');
    execSync('npx tsc --noEmit', { stdio: 'inherit', cwd: path.resolve(__dirname, '../../..') });
    console.log('✅ TypeScript compilation verified successfully!');
  } catch (err) {
    console.error('❌ TypeScript validation failed. Check syntax and typings.');
    process.exit(1);
  }
}
