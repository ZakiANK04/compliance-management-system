# Compliance Management System

A comprehensive compliance management system built with React, TypeScript, and AI integration.

## Features

- AI-powered gap analysis using Google's Gemini 2.0 Flash
- Policy management with PDF export
- Risk assessment and monitoring
- Compliance status tracking
- Interactive dashboards and reports

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Google Cloud account (for Gemini API)
- OpenAI account (optional, for fallback)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/compliance-management-system.git
cd compliance-management-system
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Add your API keys to the `.env` file:
```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

## Development

Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Building for Production

1. Build the application:
```bash
npm run build
# or
yarn build
```

2. Preview the production build:
```bash
npm run preview
# or
yarn preview
```

## Deployment

### GitHub Pages

1. Add the following to your `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/compliance-management-system",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

2. Install gh-pages:
```bash
npm install --save-dev gh-pages
# or
yarn add -D gh-pages
```

3. Deploy:
```bash
npm run deploy
# or
yarn deploy
```

### Vercel Deployment

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

### Netlify Deployment

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Deploy:
```bash
netlify deploy
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| VITE_GEMINI_API_KEY | Google Gemini API key |
| VITE_OPENAI_API_KEY | OpenAI API key (optional) |
| VITE_API_URL | Backend API URL |
| VITE_BACKEND_URL | Backend service URL |
| VITE_DATABASE_URL | Database connection URL |

## Project Structure

```
src/
├── components/     # React components
├── lib/           # Utility functions and services
│   └── rag/       # RAG implementation
├── types/         # TypeScript type definitions
├── styles/        # Global styles
└── App.tsx        # Main application component
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@yourdomain.com or open an issue in the GitHub repository. 