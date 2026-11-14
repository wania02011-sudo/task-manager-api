// Part A: command-line tool
// Usage: node cli.js "Buy groceries"
const title = process.argv.slice(2).join(' ').trim();

if (!title) {
  console.error('Usage: node cli.js "Task title"');
  process.exit(1);
}

console.log(`Task created: ${title}`);
