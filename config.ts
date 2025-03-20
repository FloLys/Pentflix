const fs = require('fs');
const path = require('path');

const apiUrl = 'https://api.themoviedb.org/3/';
const apiKey = process.env["TMDB_API_KEY"];

if (!apiKey) {
  console.error('TMDB_API_KEY is not set in the environment.');
  process.exit(1);
}

const envFilePath = path.join(__dirname, 'src', 'environments', 'environment.ts');

let content = fs.readFileSync(envFilePath, 'utf8');
content = content.replace('{{API_KEY}}', apiKey);

fs.writeFileSync(envFilePath, content, 'utf8');
