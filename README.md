# PeopleHub — HR Portal

A complete, runnable HR portal website with an embedded Azure-powered HR assistant chat popup.

## Project structure

```text
/frontend
  /src
    /components
    /data
    /pages
    /styles
  index.html
  package.json
  tsconfig.json
  tsconfig.node.json
  vite.config.ts
/backend
  package.json
  server.js
/netlify
  /functions
    chat.ts
/netlify.toml
/.env.example
/.gitignore
README.md
```

## Local development

1. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Install backend dependencies:
   ```bash
   cd ../backend
   npm install
   ```

3. Create an environment file at the workspace root:
   ```bash
   copy .env.example .env
   ```

4. Start the backend:
   ```bash
   cd backend
   npm start
   ```

5. Start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```

6. Open the Vite app at http://localhost:5173

## Azure OpenAI setup

Set these values in the workspace root .env file:

- AZURE_OPENAI_ENDPOINT
- AZURE_OPENAI_API_KEY
- AZURE_OPENAI_DEPLOYMENT

If these values are not present, the chat popup falls back to a canned mock response so the demo still works.

## GitHub + Netlify deployment

1. Create a GitHub repository and push the workspace contents.
2. In Netlify, create a new site from the GitHub repository.
3. Set the build command to:
   ```bash
   cd frontend && npm install && npm run build
   ```
4. Set the publish directory to:
   ```bash
   frontend/dist
   ```
5. Set the functions directory to:
   ```bash
   netlify/functions
   ```
6. Add these environment variables in Netlify Site settings → Environment variables:
   - AZURE_OPENAI_ENDPOINT
   - AZURE_OPENAI_API_KEY
   - AZURE_OPENAI_DEPLOYMENT

## Netlify function

The chat endpoint is also available as a Netlify Function at /api/chat through the Netlify function implementation in netlify/functions/chat.ts.
