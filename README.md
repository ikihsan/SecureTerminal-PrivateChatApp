# Secure Terminal - Private Chat App

A clandestine, terminal-based private messaging application built with Next.js, Convex, and Tailwind CSS.

## Features

- **Secure Authentication**: Device-based hashing and attempt limiting
- **Private Connections**: Connect with users via username and connection code
- **Ephemeral Media**: Media files with configurable TTL (auto-deletion)
- **Terminal UI**: Retro terminal aesthetic with neon colors and animations
- **Real-time Messaging**: Powered by Convex for live updates

## Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Convex (serverless database and functions)
- **Styling**: Custom CSS with terminal theme
- **Deployment**: Ready for Vercel/Netlify + Convex

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up Convex: `npx convex dev`
4. Configure environment variables in `.env.local`
5. Run development server: `npm run dev`

## Environment Variables

- `NEXT_PUBLIC_CONVEX_URL`: Your Convex deployment URL

## Project Structure

- `src/app/`: Next.js app router pages
- `src/components/`: Reusable UI components
- `convex/`: Backend functions and schema
- `public/`: Static assets

## Security Features

- Device fingerprinting for session management
- Attempt limiting with IP-based bans
- Ephemeral media storage
- Password hashing with bcrypt

## Deployment

1. Deploy Convex: `npx convex deploy`
2. Build Next.js: `npm run build`
3. Deploy to your hosting platform

## Contributing

Please ensure all changes maintain the terminal aesthetic and security standards.
```json
{
  "name": "dark-army-terminal",
  "colors": {
    "background": "#0A0A0B",
    "panel": "#0F1113",
    "primary": "#2BFF7A",
    "accent": "#4CE6E6",
    "warning": "#FFB84D",
    "highlight": "#D4AF37",
    "text": "#A7B0B8"
  },
  "font": "JetBrains Mono, monospace"
}