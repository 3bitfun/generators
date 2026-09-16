# 3bitFun GENERATORS

Fake generators. Real jokes. One hub, many pages.

## What's in here

- index.html - the hub, lists every generator
- style.css - shared retro stylesheet used by every page
- generators.js - shared helpers (log, progress bar, popups, etc.)
- <slug>/index.html - one sub-page per generator

## Adding a new generator

1. Open make.ps1
2. Add a new hashtable to the $Generators array
3. Run .\make.ps1 -Force
4. Commit and push

## Running the script

    .\make.ps1
    .\make.ps1 -Force

## Deploying to GitHub Pages

1. Push this folder to a repo named "generators" under the 3bitfun org
2. Repo Settings -> Pages -> Source: main branch, / (root)
3. Site is live at https://3bitfun.github.io/generators/