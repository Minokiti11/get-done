# Get Done

[日本語](README.ja.md) | English

A simple and beautiful task management app. A PWA (Progressive Web App) inspired by Things 3.

![Get Done](https://img.shields.io/badge/React-19.2.3-blue)
![PWA](https://img.shields.io/badge/PWA-Ready-green)
![License](https://img.shields.io/badge/license-MIT-blue)

## ✔ Features

- 📱 **PWA Support**: Works offline and can be installed as an app
- 🔐 **Authentication**: Sign in with email/password or Google
- 💾 **Cloud Sync**: Tasks are saved to Supabase and synced across devices
- 🔔 **Notifications**: Get reminders before task due dates
- 🎨 **Beautiful UI**: Minimal and refined design inspired by Things 3
- ⚡ **Fast**: React-based with smooth interactions
- 🔍 **Search**: Quickly find tasks
- 📁 **Project Management**: Organize tasks with projects
- ⏰ **Due Dates & Reminders**: Set due dates and get notified before tasks are due

## 🚀 Quick Start

### Requirements

- Node.js 16.x or higher
- npm 8.x or higher

### Installation
```bash
# Clone the repository
git clone https://github.com/Minokiti11/get-done.git
cd get-done

# Install dependencies
npm install
```

### Supabase Setup

1. Create a new project at [Supabase](https://supabase.com)
2. Go to Project Settings > API and copy your project URL and anon key
3. Create a `.env` file in the root directory:
```bash
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```
4. Run the SQL schema in Supabase SQL Editor (see `supabase-schema.sql`)
5. Enable Google OAuth in Supabase:
   - Go to Authentication > Providers
   - Enable Google provider
   - Add your OAuth credentials from [Google Cloud Console](https://console.cloud.google.com)
   - Add authorized redirect URLs:
     - `http://localhost:3000` (for development)
     - `https://your-vercel-domain.vercel.app` (for production)

### Start Development Server
```bash
npm start
```

Open http://localhost:3000 in your browser.

## 📦 Build
```bash
# Build for production
npm run build
```

Optimized files will be generated in the `build` folder.

## 🚀 Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel project settings:
   - `REACT_APP_SUPABASE_URL`: Your Supabase project URL
   - `REACT_APP_SUPABASE_ANON_KEY`: Your Supabase anon key
4. Deploy!

Vercel will automatically build and deploy your app.

## 🎯 Usage

### Creating a Task

1. Click the "New" button at the bottom of the screen
2. Enter task name and press Enter

### Creating a Project

1. Click the "+" button in the "Projects" section of the sidebar
2. Enter project name

### Completing a Task

Click the circle button on the left side of a task to toggle completion status.

### Search

Enter keywords in the search box in the header to filter tasks.

## 📱 Install as PWA

### Desktop (Chrome/Edge)

1. Click the install icon in the address bar
2. Or click "Install" from the banner at the top of the screen

### iOS (Safari)

1. Tap the share button (□↑)
2. Select "Add to Home Screen"

### Android (Chrome)

1. Open menu (⋮)
2. Select "Install app"

## 🛠 Tech Stack

- **Frontend**: React 19.2.3 + TypeScript
- **Backend**: Supabase (Authentication + Database)
- **Icons**: Lucide React
- **PWA**: Service Worker + Web App Manifest
- **Storage**: Supabase PostgreSQL

## 📁 Project Structure
```
get-done/
├── public/
│   ├── index.html          # Main HTML
│   ├── manifest.json       # PWA configuration
│   ├── sw.js              # Service Worker
│   └── icons/             # App icons
├── src/
│   ├── App.js             # Main application
│   ├── App.css            # Styles
│   ├── index.js           # Entry point
│   └── index.css          # Global styles
├── package.json
└── README.md
```

## 🎨 Features

### ✅ Implemented

- [x] Create, edit, and delete tasks
- [x] Toggle task completion
- [x] Project management
- [x] Inbox, Today, and Completed views
- [x] Search functionality
- [x] User authentication (Email/Password & Google)
- [x] Cloud sync with Supabase
- [x] Due date setting
- [x] Task reminders and notifications
- [x] PWA support (offline capability)
- [x] Responsive design

### 🚧 Roadmap

- [ ] Tag functionality
- [ ] Drag & drop reordering
- [ ] Dark mode
- [ ] Areas feature
- [ ] Data export/import

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

MIT License

## 👤 Author

Minori Sugimura
