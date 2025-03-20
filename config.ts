const fs = require('fs');
const path = require('path');

const apiUrl = 'https://api.themoviedb.org/3/';
const tmdbApiKey = process.env["TMDB_API_KEY"];

if (!tmdbApiKey) {
  console.error('TMDB_API_KEY is not set in the environment.');
  process.exit(1);
}

const content = `export const environment = {
  production: false,
  API_URL: '${apiUrl}',
  API_KEY: '${tmdbApiKey}'
};
`;

const envFilePath = path.join(__dirname, 'src', 'environments', 'environment.ts');

fs.writeFileSync(envFilePath, content, { encoding: 'utf8' });
