# YouTube Transcript Frontend

A modern Next.js 16 frontend for the YouTube Transcript Storage Worker API. Built with TypeScript, Tailwind CSS, and shadcn/ui.

## Features

- 🎬 **Fetch YouTube Transcripts** - Enter any YouTube URL or video ID to fetch transcripts
- 💾 **Smart Caching** - Automatically caches transcripts in D1 for instant retrieval
- 📚 **Library Management** - Browse, search, and manage all stored transcripts
- 📄 **Full Transcript Viewer** - View complete transcripts with captions and timestamps
- 📥 **Export Functionality** - Download transcripts as text files
- 📋 **Copy to Clipboard** - One-click copying of captions or timestamps
- 🎨 **Beautiful UI** - Modern, responsive design with shadcn/ui components
- ⚡ **Lightning Fast** - Built on Next.js 16 with optimal performance

## Screenshots

### Home Page - Fetch Tab
The main interface for fetching YouTube transcripts with instant preview.

### Library Tab
Browse and manage all stored transcripts with pagination and quick actions.

### Detail View
Full transcript viewer with captions and timestamps in separate tabs.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui (Radix UI)
- **Icons**: Lucide React
- **API**: YouTube Transcript Storage Worker (Cloudflare)

## Prerequisites

- Node.js 18+ and npm
- Access to the YouTube Transcript Storage Worker API

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd youtube-transcript-frontend
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Update the API base URL in `lib/api.ts` if using a different Worker URL:
```typescript
const API_BASE_URL = 'https://your-worker-url.workers.dev';
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Fetching a Transcript

1. Navigate to the "Fetch Transcript" tab
2. Enter a YouTube URL or video ID:
   - Full URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
   - Short URL: `https://youtu.be/dQw4w9WgXcQ`
   - Video ID: `dQw4w9WgXcQ`
3. Click "Fetch" or press Enter
4. The transcript will be fetched and cached automatically
5. If already cached, it will be retrieved instantly

### Viewing Transcripts

1. Navigate to the "Library" tab to see all stored transcripts
2. Click the eye icon to view a full transcript
3. Use pagination controls to browse through multiple pages

### Managing Transcripts

- **Force Refetch**: Click "Force Refetch" to update a cached transcript
- **Download**: Click the download button to save as a text file
- **Delete**: Click the trash icon to remove a transcript from storage
- **Copy**: Use the copy button to copy captions or timestamps to clipboard

### Transcript Detail Page

- View full captions in an easy-to-read format
- Switch to timestamps view for time-coded transcript
- Open the original video on YouTube
- Download or copy the transcript
- Navigate back to the library

## Project Structure

```
youtube-transcript-frontend/
├── app/
│   ├── layout.tsx              # Root layout with Toaster
│   ├── page.tsx                # Home page with tabs
│   ├── globals.css             # Global styles and theme variables
│   └── transcript/
│       └── [videoId]/
│           └── page.tsx        # Transcript detail page
├── components/
│   ├── ui/                     # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── tabs.tsx
│   │   ├── toast.tsx
│   │   ├── toaster.tsx
│   │   └── use-toast.ts
│   ├── transcript-fetcher.tsx  # Fetch transcript component
│   └── transcript-list.tsx     # List transcripts component
├── lib/
│   ├── api.ts                  # API client for Worker
│   └── utils.ts                # Utility functions
├── package.json
├── next.config.js
├── tsconfig.json
├── tailwind.config.js
└── postcss.config.js
```

## API Integration

The app integrates with the YouTube Transcript Storage Worker API:

### Endpoints Used

- `POST /fetch` - Fetch and store transcript
- `GET /transcript/:videoId` - Get stored transcript
- `GET /transcripts` - List all transcripts (paginated)
- `DELETE /transcript/:videoId` - Delete transcript

### API Client

The API client is located in `lib/api.ts` and provides:
- Type-safe API calls with TypeScript interfaces
- Error handling with descriptive messages
- Automatic URL encoding and parameter formatting
- Video ID extraction from various YouTube URL formats

## Customization

### Changing the API URL

Update the `API_BASE_URL` constant in `lib/api.ts`:

```typescript
const API_BASE_URL = 'https://your-custom-worker-url.workers.dev';
```

### Modifying Theme Colors

Edit the CSS variables in `app/globals.css` under the `:root` and `.dark` selectors.

### Adding New Components

Use the shadcn/ui CLI to add more components:

```bash
npx shadcn-ui@latest add [component-name]
```

## Building for Production

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

3. Or deploy to Vercel (recommended):
   - Push to GitHub
   - Import project in Vercel
   - Deploy automatically

## Environment Variables

No environment variables are required by default. The API URL is hardcoded in the client.

If you want to make it configurable, create a `.env.local` file:

```bash
NEXT_PUBLIC_API_URL=https://your-worker-url.workers.dev
```

Then update `lib/api.ts` to use it:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://youtube-transcript-storage.automatehub.workers.dev';
```

## Troubleshooting

### CORS Errors

If you encounter CORS errors, ensure your Worker has CORS headers enabled. The Worker should include:

```typescript
'Access-Control-Allow-Origin': '*'
'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS'
'Access-Control-Allow-Headers': 'Content-Type'
```

### Fetch Errors

- Verify the Worker URL is correct
- Check that the Worker is deployed and running
- Ensure the video URL/ID is valid
- Check browser console for detailed error messages

### Build Errors

- Ensure all dependencies are installed: `npm install`
- Clear Next.js cache: `rm -rf .next`
- Check Node.js version: `node -v` (should be 18+)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Author

**Reza J**
- Website: [AutomateHub.dev](https://automatehub.dev)
- Worker API: [YouTube Transcript Storage](https://youtube-transcript-storage.automatehub.workers.dev)
- YouTube API: [fetch.youtubesummaries.cc](https://fetch.youtubesummaries.cc)

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Powered by [Cloudflare Workers](https://workers.cloudflare.com/)
