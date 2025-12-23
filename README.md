# Penguin Card Generator

A pixel art style holiday card generator built with React, TypeScript, and Konva.js.

## Features

- 🎨 Pixel art style design with custom templates
- 🎯 Drag-and-drop stickers with resize and delete functionality
- ✍️ Customizable text fields (To, From, Message)
- 🎲 Random message generator with holiday jokes
- 💾 Save and share your cards
- 📱 Fully responsive mobile design

## Development

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Deployment on Render

This project is configured for deployment on Render.

### Option 1: Using render.yaml (Recommended)

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. In Render dashboard, select "New" → "Blueprint"
3. Connect your repository
4. Render will automatically detect the `render.yaml` file and deploy

### Option 2: Manual Setup

1. Push your code to a Git repository
2. In Render dashboard, select "New" → "Web Service"
3. Connect your repository
4. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: `Node`
5. Deploy!

The app will be available at `https://your-service-name.onrender.com`

## Project Structure

```
penguin-card/
├── src/
│   ├── components/      # React components
│   ├── data/           # Stickers and templates data
│   ├── styles/         # CSS modules
│   ├── types/          # TypeScript types
│   └── utils/          # Utility functions
├── public/             # Static assets
├── server.js           # Express server for production
├── render.yaml         # Render deployment configuration
└── vite.config.ts      # Vite configuration
```

## Technologies

- React 18
- TypeScript
- Vite
- Konva.js / react-konva
- Express (production server)
