# Firebase Chat App

A modern real-time chat application built with Next.js 14 and Firebase.

## Features

- 🔐 **Google Authentication** - Secure sign-in with Google
- 💬 **Real-time Messaging** - Instant message delivery using Firebase Firestore
- 👥 **Online Presence** - See who's online in the chat
- 📱 **Responsive Design** - Works on desktop and mobile
- 🎨 **Modern UI** - Clean, beautiful interface built with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Backend**: Firebase (Authentication + Firestore)
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- A Firebase project

### 1. Clone the Repository

```bash
git clone https://github.com/tharindumendis/firebase-chat-app.git
cd firebase-chat-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable **Authentication**:
   - Go to Authentication → Sign-in method
   - Enable "Google"
4. Enable **Firestore Database**:
   - Go to Firestore Database → Create database
   - Start in test mode (for development)
5. Get your config:
   - Go to Project Settings → Your apps → Web app
   - Copy the config object

### 4. Configure Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Firebase credentials:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
```

### 5. Set Up Firestore Security Rules

Copy the rules from `firestore.rules` to your Firebase Console:

1. Go to Firestore Database → Rules
2. Replace the existing rules with the content from `firestore.rules`
3. Publish

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js 14 App Router
│   ├── page.tsx           # Landing/login page
│   ├── chat/
│   │   └── page.tsx       # Chat page (protected)
│   └── globals.css        # Global styles
├── components/
│   ├── auth/              # Authentication components
│   ├── chat/             # Chat-specific components
│   └── ui/               # Reusable UI components
├── hooks/                # Custom React hooks
├── libs/
│   └── firebase/         # Firebase configuration
├── types/                # TypeScript types
└── constants/           # App constants
```

## Firebase Data Model

### Collections

- **users/{userId}** - User profiles
- **chatrooms/{chatroomId}** - Chat room metadata
- **chatrooms/{chatroomId}/messages** - Messages in a chat room
- **chatrooms/{chatroomId}/presence** - Online status tracking

## Production Deployment

### Building for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy!

## License

MIT License - feel free to use this project for learning and development.
