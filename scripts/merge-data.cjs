const fs = require('fs');
const path = require('path');

const logFilePath = 'C:/Users/Computers/.gemini/antigravity-ide/brain/7466ac07-718a-4ed6-aed2-41cacebf91fd/.system_generated/logs/transcript_full.jsonl';
const targetFilePath = path.resolve(__dirname, '../src/data.ts');

try {
  console.log('Reading log file...');
  const fileContent = fs.readFileSync(logFilePath, 'utf8');
  const lines = fileContent.trim().split('\n');
  
  let targetLine = null;
  for (const line of lines) {
    if (!line) continue;
    const parsed = JSON.parse(line);
    if (parsed.step_index === 94) {
      targetLine = parsed;
      break;
    }
  }

  if (!targetLine) {
    throw new Error('Could not find step_index 94 in the transcript logs.');
  }

  console.log('Extracting JSON from user request...');
  const content = targetLine.content;
  const startTag = '<USER_REQUEST>\n';
  const endTag = '\n</USER_REQUEST>';
  
  let jsonString = content;
  if (content.includes(startTag)) {
    jsonString = content.substring(content.indexOf(startTag) + startTag.length);
  }
  if (jsonString.includes(endTag)) {
    jsonString = jsonString.substring(0, jsonString.indexOf(endTag));
  }

  const payload = JSON.parse(jsonString);
  
  const skills = JSON.parse(payload.skills);
  const categories = JSON.parse(payload.categories);
  const collections = JSON.parse(payload.collections);
  const resources = JSON.parse(payload.resources);
  const prompts = JSON.parse(payload.prompts);

  console.log(`Parsed data summary:`);
  console.log(`- Skills: ${skills.length}`);
  console.log(`- Categories: ${categories.length}`);
  console.log(`- Collections: ${collections.length}`);
  console.log(`- Resources: ${resources.length}`);
  console.log(`- Prompts: ${prompts.length}`);

  // Generate TypeScript code
  const outputCode = `import { Skill, Category, Collection, Resource, Prompt } from './types';

export const initialCategories: Category[] = ${JSON.stringify(categories, null, 2)};

export const initialSkills: Skill[] = ${JSON.stringify(skills, null, 2)};

export const initialCollections: Collection[] = ${JSON.stringify(collections, null, 2)};

export const initialResources: Resource[] = ${JSON.stringify(resources, null, 2)};

export const initialPrompts: Prompt[] = ${JSON.stringify(prompts, null, 2)};
`;

  console.log('Writing to src/data.ts...');
  fs.writeFileSync(targetFilePath, outputCode, 'utf8');
  console.log('🎉 Successfully merged local CMS data into src/data.ts!');

} catch (error) {
  console.error('Error during merging:', error);
}
