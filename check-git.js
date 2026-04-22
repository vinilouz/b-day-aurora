import { execSync } from 'child_process';
try {
  console.log('git status:');
  console.log(execSync('git status').toString());
} catch (e) {
  console.log('Error running git', e.message);
}
