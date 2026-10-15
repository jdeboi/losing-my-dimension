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
cd client
npm install --legacy-peer-deps
npm start      # dev server
npm run build  # static output in client/build
```

## Deploying
Any static host works. `client/public/_redirects` sends every path to `index.html`, so links straight to a sketch (e.g. `/flush`) work on Netlify and Cloudflare Pages.

- Root directory: `client`
- Build command: `npm install --legacy-peer-deps && npm run build`
- Output directory: `build`
- Env: `NODE_VERSION=20`, `CI=false` (so lint warnings don't fail the build)

## License
[Attribution-NonCommercial-ShareAlike](license.md)
