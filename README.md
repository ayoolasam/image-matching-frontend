// ...existing code...
# Image Matching Frontend (Nuxt)

Minimal Nuxt 3 frontend for the Image Matching / Registration project. Provides a UI to upload stereo image pairs, choose feature-matching algorithms, send images to a processing API, and preview/download results.

## Features
- Upload left/right images and choose an algorithm (FAST, ORB, SIFT, AKAZE, BRISK).
- Send images to backend register endpoint and receive a ZIP with results.
- Preview registered output, matched keypoints, and evaluation metrics.
- Coordinate picker (click to get image coordinates) and CSV export.
- Canvas-based pixel-distance measurement tool.

## Quick start (macOS)
1. Install dependencies:
```bash
npm install
```
2. Start dev server:
```bash
npm run dev
# open http://localhost:3000
```
3. Build and preview production:
```bash
npm run build
npm run preview
```

## Environment
Set API base URL for the backend using the public runtime config variable:
```bash
export NUXT_PUBLIC_API_URL="https://api.example.com"
```
Or add to a `.env` file in the project root.

Expected backend responses:
- A ZIP containing: `registered_output.jpg`, `matched_keypoints.jpg`, and `evaluation_metrics.txt`.

## Important files
- nuxt.config.ts — runtime config and build settings
- package.json — scripts and dependencies
- pages/image-matching.vue — main image-matching UI and ZIP parsing
- pages/image-measurement.vue — coordinate picker + CSV export
- pages/distance-measurement.vue — canvas distance tool
- components/Navigation.vue, layouts/default.vue, assets/css/main.css

## Troubleshooting
- If requests fail, confirm `NUXT_PUBLIC_API_URL` is set and reachable.
- Ensure the backend returns the expected ZIP structure.

## License
No license file included. Add a LICENSE if necessary.
```// filepath: /Users/samuelobayomi/Desktop/image matching project/Frontend/image-frontend/README.md
// ...existing code...
# Image Matching Frontend (Nuxt)

Minimal Nuxt 3 frontend for the Image Matching / Registration project. Provides a UI to upload stereo image pairs, choose feature-matching algorithms, send images to a processing API, and preview/download results.

## Features
- Upload left/right images and choose an algorithm (FAST, ORB, SIFT, AKAZE, BRISK).
- Send images to backend register endpoint and receive a ZIP with results.
- Preview registered output, matched keypoints, and evaluation metrics.
- Coordinate picker (click to get image coordinates) and CSV export.
- Canvas-based pixel-distance measurement tool.

## Quick start (macOS)
1. Install dependencies:
```bash
npm install
```
2. Start dev server:
```bash
npm run dev
# open http://localhost:3000
```
3. Build and preview production:
```bash
npm run build
npm run preview
```

## Environment
Set API base URL for the backend using the public runtime config variable:
```bash
export NUXT_PUBLIC_API_URL="https://api.example.com"
```
Or add to a `.env` file in the project root.

Expected backend responses:
- A ZIP containing: `registered_output.jpg`, `matched_keypoints.jpg`, and `evaluation_metrics.txt`.

## Important files
- nuxt.config.ts — runtime config and build settings
- package.json — scripts and dependencies
- pages/image-matching.vue — main image-matching UI and ZIP parsing
- pages/image-measurement.vue — coordinate picker + CSV export
- pages/distance-measurement.vue — canvas distance tool
- components/Navigation.vue, layouts/default.vue, assets/css/main.css

## Troubleshooting
- If requests fail, confirm `NUXT_PUBLIC_API_URL` is set and reachable.
- Ensure the backend returns the expected ZIP structure.

## License
No license file included. Add a LICENSE if necessary.