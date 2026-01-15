# App Template

Use this template to create new apps for the mini OS.

## Quick Start

1. Copy this entire folder to a new location:
   ```bash
   cp -r src/apps/_template src/apps/MyNewApp
   ```

2. Update `app.manifest.json`:
   - Change `id` to a unique identifier (e.g., `my-new-app`)
   - Set `name` to the display name
   - Update `description`, `icon`, `category`, `defaultSize`
   - Set `touchOptimized: true` if app works well on touch devices

3. Rename component files:
   ```bash
   mv src/apps/MyNewApp/Template.jsx src/apps/MyNewApp/MyNewApp.jsx
   mv src/apps/MyNewApp/Template.css src/apps/MyNewApp/MyNewApp.css
   ```

4. Update CSS import in your component:
   ```jsx
   import './MyNewApp.css';
   ```

5. Register your app in `src/core/appRegistry.js`:
   - Import your component
   - Add to `componentMap`
   - Add icon to `iconMap` (if using custom icon)

6. Add entry to `src/data/appsConfig.json`:
   ```json
   {
     "id": "my-new-app",
     "name": "My New App",
     "icon": "custom-icon.png",
     "category": "utilities",
     "defaultSize": { "width": 600, "height": 400 },
     "touchOptimized": true,
     "description": "My awesome new app"
   }
   ```

## Using Shared Data

Access centralized data using hooks:

```jsx
import { useUserData, useProjects, useExperience } from '../../context/DataContext';

const MyNewApp = () => {
  const { profile, contact, socials } = useUserData();
  const projects = useProjects();
  const { experience, education } = useExperience();
  
  return <div>{profile.name}</div>;
};
```

## Touch Optimization Tips

- Use minimum 44px touch targets
- Add `-webkit-overflow-scrolling: touch` for smooth scrolling
- Use `@media (pointer: coarse)` for touch-specific styles
- Avoid hover-dependent interactions
