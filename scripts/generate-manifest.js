#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

const capturesDir = path.join(__dirname, '..', 'public', 'captures');
const manifestPath = path.join(capturesDir, 'media-manifest.json');

const videoExtensions = ['.mp4', '.webm', '.mov', '.avi', '.mkv'];
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
const excludeFiles = ['.ds_store', 'thumbs.db', '.gitkeep', '.gitignore', 'media-manifest.json'];

async function getImageDimensions(filePath) {
  try {
    const { stdout } = await execAsync(`identify -ping -format "%w %h" "${filePath}"`);
    const [width, height] = stdout.trim().split(' ').map(Number);
    return { width, height };
  } catch (error) {
    console.warn(`Could not get dimensions for image: ${filePath}`);
    return { width: 400, height: 600 };
  }
}

async function getVideoDimensions(filePath) {
  try {
    const { stdout } = await execAsync(`ffprobe -v quiet -print_format json -show_streams "${filePath}"`);
    const data = JSON.parse(stdout);
    const videoStream = data.streams.find(stream => stream.codec_type === 'video');
    if (videoStream) {
      return { width: videoStream.width, height: videoStream.height };
    }
    return { width: 400, height: 600 };
  } catch (error) {
    console.warn(`Could not get dimensions for video: ${filePath}`);
    return { width: 400, height: 600 };
  }
}

async function generateManifest() {
  try {
    const files = fs.readdirSync(capturesDir);
    
    const filteredFiles = files.filter(file => {
      const fileName = file.toLowerCase();
      
      if (excludeFiles.includes(fileName) || fileName.startsWith('.')) {
        return false;
      }
      
      return videoExtensions.some(ext => fileName.endsWith(ext)) || 
             imageExtensions.some(ext => fileName.endsWith(ext));
    });

    const mediaItems = await Promise.all(
      filteredFiles.map(async (file, index) => {
        const fileName = file.toLowerCase();
        const isVideo = videoExtensions.some(ext => fileName.endsWith(ext));
        const filePath = path.join(capturesDir, file);
        
        const dimensions = isVideo 
          ? await getVideoDimensions(filePath)
          : await getImageDimensions(filePath);
        
        return {
          id: index,
          src: `/captures/${file}`,
          name: file,
          type: isVideo ? 'video' : 'image',
          width: dimensions.width,
          height: dimensions.height,
          aspectRatio: dimensions.width / dimensions.height
        };
      })
    );

    fs.writeFileSync(manifestPath, JSON.stringify(mediaItems, null, 2));
    console.log(`Generated manifest with ${mediaItems.length} media files`);
    console.log('Manifest saved to:', manifestPath);
  } catch (error) {
    console.error('Error generating manifest:', error);
    process.exit(1);
  }
}

generateManifest();
