# LvlUpGit

A simple GitHub profile analyzer with a pixel-art RPG style.

Enter a GitHub username and LvlUpGit fetches their public profile and repositories, then turns the data into a few easy-to-read stats.

## What it does

* Shows GitHub profile information
* Calculates an overall profile score
* Shows coding, projects, reputation, community and activity stats
* Gives the profile a level and rank
* Displays basic achievements
* Lists the user's repositories
* Shows stars, forks and programming languages
* Links directly to the original GitHub profile and repositories

## How the score works

The score is calculated from publicly available GitHub information.

| Category   | Weight |
| ---------- | -----: |
| Coding     |    25% |
| Projects   |    20% |
| Reputation |    20% |
| Activity   |    20% |
| Community  |    15% |

The calculation considers things such as:

* Number of repositories
* Programming language variety
* Stars
* Forks
* Followers
* Following
* Recent repository updates

The score is meant to be a fun way of looking at a GitHub profile. It isn't an official measure of programming ability.

## Tech used

* React
* TypeScript
* Vite
* Tailwind CSS
* GitHub REST API
* CSS

## Running it locally

Clone the repository:

```bash
git clone https://github.com/MHazeemShafi/github-profile-analyzer.git
```

Go into the project:

```bash
cd github-profile-analyzer
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open the local address shown in the terminal.

## Project structure

```text
github-profile-analyzer/
│
├── src/
│   ├── services/
│   │   ├── githubApi.ts
│   │   └── score.ts
│   │
│   ├── types/
│   │   └── github.ts
│   │
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── public/
├── package.json
├── vite.config.ts
└── README.md
```

## GitHub API

LvlUpGit uses GitHub's public REST API to retrieve profile and repository information.

No GitHub login or personal access token is required for the basic version.

Because it uses the public API, GitHub's API rate limits still apply.

## Why I made this

I wanted to make something a little more interesting than a normal GitHub statistics page.

I'm also using this project to practice:

* React
* TypeScript
* Working with APIs
* Data processing
* CSS styling
* Git and GitHub

## Possible future improvements

Some things I'd like to add later:

* GitHub contribution graph
* Commit statistics
* More detailed language statistics
* Pull request and issue information
* Better XP progression
* More achievements
* Mobile improvements
* GitHub Pages deployment

## Author

**Mohammed Hazeem Shafi**

GitHub: [@MHazeemShafi](https://github.com/MHazeemShafi)

---

Built while learning React, TypeScript and working with APIs.

