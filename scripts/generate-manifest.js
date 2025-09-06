#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const videosDir = path.join(__dirname, '..', 'public', 'videos');
const manifestPath = path.join(videosDir, 'media-manifest.json');

const videoExtensions = ['.mp4', '.webm', '.mov', '.avi', '.mkv'];
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
const excludeFiles = ['.ds_store', 'thumbs.db', '.gitkeep', '.gitignore', 'media-manifest.json'];

try {
  const files = fs.readdirSync(videosDir);
  
  const mediaItems = files
    .filter(file => {
      const fileName = file.toLowerCase();
      
      // Skip system/hidden files
      if (excludeFiles.includes(fileName) || fileName.startsWith('.')) {
        return false;
      }
      
      // Check for valid media extensions
      return videoExtensions.some(ext => fileName.endsWith(ext)) || 
             imageExtensions.some(ext => fileName.endsWith(ext));
    })
    .map((file, index) => {
      const fileName = file.toLowerCase();
      const isVideo = videoExtensions.some(ext => fileName.endsWith(ext));
      
      return {
        id: index,
        src: `/videos/${file}`,
        name: file,
        type: isVideo ? 'video' : 'image'
      };
    });

  fs.writeFileSync(manifestPath, JSON.stringify(mediaItems, null, 2));
  console.log(`Generated manifest with ${mediaItems.length} media files`);
  console.log('Manifest saved to:', manifestPath);
} catch (error) {
  console.error('Error generating manifest:', error);
  process.exit(1);
}
