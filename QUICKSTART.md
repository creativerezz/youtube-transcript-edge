# Quick Start Guide

## Installation & Setup (5 minutes)

### 1. Install Dependencies

```bash
cd youtube-transcript-frontend
npm install
```

This will install:
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui components
- All necessary dependencies

### 2. Run Development Server

```bash
npm run dev
```

The app will start at: **http://localhost:3000**

### 3. Start Using the App

1. Open http://localhost:3000 in your browser
2. You'll see the home page with two tabs: "Fetch Transcript" and "Library"

## Quick Usage Guide

### Fetch Your First Transcript

1. Go to the "Fetch Transcript" tab
2. Paste any YouTube URL, for example:
   ```
   https://www.youtube.com/watch?v=dQw4w9WgXcQ
   ```
3. Click "Fetch" or press Enter
4. The transcript will be fetched and displayed with:
   - Video thumbnail
   - Title and author
   - Preview of the transcript
   - Download button
   - Force refetch option

### View Your Library

1. Click the "Library" tab
2. You'll see all cached transcripts with:
   - Thumbnails
   - Titles and authors
   - Creation dates
   - Quick actions (View, Delete)
3. Click the eye icon to view the full transcript

### View Full Transcript

1. From the library, click the eye icon on any transcript
2. You'll see:
   - Full video information
   - Link to watch on YouTube
   - Two tabs: Captions and Timestamps
   - Copy and download buttons
3. Use the "Back to Home" button to return

## Available Commands

```bash
# Development
npm run dev          # Start dev server (http://localhost:3000)

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## Default Configuration

The app is pre-configured to use:
- **API URL**: `https://youtube-transcript-storage.automatehub.workers.dev`
- **Port**: 3000 (development)
- **Theme**: Light mode with shadcn/ui default theme

## Customization

### Change API URL

Edit `lib/api.ts`:
```typescript
const API_BASE_URL = 'https://your-worker-url.workers.dev';
```

### Change Port

Run with a different port:
```bash
PORT=3001 npm run dev
```

## Features Checklist

- ✅ Fetch YouTube transcripts by URL or video ID
- ✅ Automatic caching (instant retrieval if cached)
- ✅ Browse all stored transcripts with pagination
- ✅ View full transcripts with captions and timestamps
- ✅ Download transcripts as text files
- ✅ Copy captions or timestamps to clipboard
- ✅ Delete transcripts from storage
- ✅ Force refetch to update cached transcripts
- ✅ Responsive design (mobile-friendly)
- ✅ Beautiful UI with shadcn/ui components
- ✅ Dark mode support (system preference)
- ✅ Toast notifications for all actions

## Next Steps

1. **Test the app** with various YouTube videos
2. **Customize the theme** in `app/globals.css`
3. **Add more features** based on your needs
4. **Deploy to Vercel** for production use

## Deployment to Vercel (Optional)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Click "Deploy"
6. Your app will be live in ~2 minutes!

## Troubleshooting

**App won't start?**
- Make sure Node.js 18+ is installed: `node -v`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Next.js cache: `rm -rf .next`

**API errors?**
- Check that the Worker URL is correct in `lib/api.ts`
- Verify the Worker is deployed and accessible
- Check browser console for detailed error messages

**CORS errors?**
- The Worker should have CORS headers enabled
- Check the Worker's CORS configuration

## Support

- **Worker API**: https://youtube-transcript-storage.automatehub.workers.dev
- **GitHub**: Create an issue for bugs or feature requests
- **Documentation**: See README.md for detailed info

---

**That's it!** You now have a fully functional YouTube transcript storage app running locally. 🎉
