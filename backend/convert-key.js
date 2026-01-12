const fs = require('fs');

const oldKey = `-----BEGIN PRIVATE KEY-----
TU_KLUCZ_Z_JSON
-----END PRIVATE KEY-----`;

const newKey = oldKey.replace(/\r?\n/g, '\\n');
fs.writeFileSync('key.env.txt', `GOOGLE_PRIVATE_KEY="${newKey}"`);
console.log('✅ Gotowe! Wklej zawartość key.env.txt do swojego .env');