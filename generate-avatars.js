import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as core from '@dicebear/core';
import * as collection from '@dicebear/collection';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.join(__dirname, 'static', 'avatars');

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Generate 20 avatars
for (let i = 1; i <= 20; i++) {
    const avatar = core.createAvatar(collection.micah, {
        seed: `avatar-${i}-2`,
        size: 128,
        backgroundColor: ['b6e3f4', 'c0aede', 'd1d4f9', 'ffd5dc', 'ffdfbf'],
        baseColor: ['fff'],
        mouth: ['smile', 'smirk']
    });

    const svg = avatar.toString();
    
    fs.writeFileSync(path.join(outputDir, `${i}.svg`), svg);
    console.log(`Generated avatar ${i}.svg`);
}

console.log('Avatar generation complete!');