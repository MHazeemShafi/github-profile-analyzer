# LvlUpGit — GitHub Profile Analyzer

LvlUpGit turns a GitHub username into a compact, game-inspired profile summary. It fetches public profile and repository information and presents a score, level, rank, and repository details in a pixel-art interface.

## Demo & Preview

- **Repository:** https://github.com/MHazeemShafi/github-profile-analyzer
- **Live demo:** No public live demo is currently documented.

## Features

- Search public GitHub profiles by username
- Display profile information and avatar
- Retrieve public repositories
- Calculate a profile score, level, and rank
- Show repository information in a pixel-art / RPG-inspired interface
- Provide loading and basic error states

## Built With

- React
- TypeScript
- Vite
- Tailwind CSS v4 and the Tailwind Vite plugin
- GitHub REST API

## Requirements

- Node.js (LTS recommended)
- npm
- Internet access to retrieve public GitHub profile and repository data

## Installation

```bash
git clone https://github.com/MHazeemShafi/github-profile-analyzer.git
cd github-profile-analyzer
npm install
```

## Quick Start

Start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal, usually `http://localhost:5173/`.

Build the project:

```bash
npm run build
```

## Configuration

The app currently queries public GitHub data and does not require a user-provided API key. GitHub API rate limits may affect repeated searches. No environment variables are documented as required.

## Contributing

Issues and improvements are welcome.

1. Open an issue describing a bug or proposed feature.
2. Fork the repository and create a branch.
3. Install dependencies with `npm install`.
4. Run `npm run dev` to test the app locally.
5. Run `npm run build` before submitting a pull request.

If automated tests are added later, document and run them here; no test command is currently documented.

## Credits

- [React](https://react.dev/) for the UI
- [Vite](https://vite.dev/) for development and builds
- [Tailwind CSS](https://tailwindcss.com/) for utility styling
- [GitHub REST API](https://docs.github.com/en/rest) for public profile and repository data
- Built by [MHazeemShafi](https://github.com/MHazeemShafi)

## License

No license file is currently included. Unless a license is added, assume the source is copyrighted and ask the owner for permission before reusing or redistributing it.
