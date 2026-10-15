# Losing My Dimension

Tulane University MFA Thesis Exhibition  
April 2021  
Jenna deBoisblanc  
[jdeboi.com](https://jdeboi.com)  


## Tech Stack
A static React site (p5.js, Babylon.js, Three.js, paper.js, and others). Sketch media is served from the `lmd-bucket` S3 bucket.

The original exhibition also ran a Node/socket.io server for the multiplayer gallery, chat, and critiques. That has been removed; only the sketches remain.

## Development
Runs on current Node (20+). The old webpack needs `--openssl-legacy-provider`, which the npm scripts already set.

```
npm install --legacy-peer-deps
npm start      # dev server at http://localhost:3000/losing-my-dimension
npm run build  # static output in build/
```

## Deploying
Pushing to `main` builds and deploys to GitHub Pages via [.github/workflows/deploy.yml](.github/workflows/deploy.yml), served at [jdeboi.com/losing-my-dimension](https://jdeboi.com/losing-my-dimension/).

The site lives under `/losing-my-dimension/` (set by `homepage` in `package.json`). GitHub Pages can't rewrite URLs, so the build copies `index.html` to `404.html`; links straight to a sketch (e.g. `/losing-my-dimension/flush`) load the app, which then routes to the right sketch.

## License
[Attribution-NonCommercial-ShareAlike](license.md)
