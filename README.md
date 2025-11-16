# PrivateChat

A secure and private messaging application designed for confidential conversations. Built with modern web technologies to ensure user privacy and data security.

## Features

- **Secure Authentication**: User registration, login, and password recovery
- **Private Chat Rooms**: Create and join private chat sessions with unique IDs
- **Dashboard**: Manage your chats and connections
- **Media Sharing**: Share files and media securely
- **Connection Management**: Control who can join your private chats
- **Ban System**: Moderate and ban users if needed
- **Session Tracking**: Keep track of active sessions
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Convex (serverless backend)
- **Authentication**: Custom auth system with Convex
- **Styling**: Tailwind CSS for modern UI
- **Deployment**: Ready for Vercel or other platforms

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Convex account

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd PrivateChat
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Convex:
   ```bash
   npx convex dev
   ```

4. Create a `.env.local` file in the root directory and add your Convex URL and other environment variables.

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                 # Next.js app router pages
│   ├── auth/           # Authentication pages
│   ├── app/            # Main app pages (dashboard, chat)
│   └── components/     # Reusable UI components
convex/                 # Convex backend functions and schema
public/                 # Static assets
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Privacy & Security

This application prioritizes user privacy:
- End-to-end encryption for messages
- Secure user authentication
- Private chat rooms with access control
- No data logging or tracking

## License

[MIT License](LICENSE)

## Support

For support or questions, please open an issue on GitHub.