import { useState } from "react"
import { getUser, getRepos } from "./services/githubApi"
import { calculateScore, type GitHubScore } from "./services/score"
import type { GitHubRepo, GitHubUser } from "./types/github"

function App() {
  const [username, setUsername] = useState("")
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [score, setScore] = useState<GitHubScore | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function analyzeProfile() {
    if (!username.trim()) return

    try {
      setLoading(true)
      setError("")

      const profile = await getUser(username.trim())
      const repositories = await getRepos(username.trim())

      setUser(profile)
      setRepos(repositories)
      setScore(calculateScore(profile, repositories))
    } catch {
      setError("User not found.")
      setUser(null)
      setRepos([])
      setScore(null)
    } finally {
      setLoading(false)
    }
  }

  function getRepoDescription(repo: GitHubRepo) {
    if (repo.description) {
      return repo.description
    }

    const stars = repo.stargazers_count

    if (stars >= 100000) return "Legendary Project"
    if (stars >= 50000) return "Open Source Giant"
    if (stars >= 10000) return "Widely Recognized"
    if (stars >= 5000) return "Major Project"
    if (stars >= 1000) return "Popular Project"
    if (stars >= 500) return "Well Known"
    if (stars >= 250) return "Community Favorite"
    if (stars >= 100) return "Established Project"
    if (stars >= 50) return "Noticed by Others"
    if (stars >= 20) return "Rising Project"
    if (stars >= 10) return "Growing Developer"
    if (stars >= 5) return "Getting Somewhere"
    if (stars >= 1) return "First Steps"

    return "Just Getting Started"
  }

  return (
    <main className="game-world">

      <div className="cloud cloud-one" />
      <div className="cloud cloud-two" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-8">

        {/* Header */}
        <header className="mb-8 text-center">

          <div className="wood-panel inline-block px-7 py-5">

            <h1 className="pixel-title text-xl sm:text-3xl">
              LvlUpGit
            </h1>

            <p className="mt-3 text-2xl opacity-80">
              Profile stats & projects
            </p>

          </div>

        </header>

        {/* Search */}
        <section className="pixel-panel mx-auto mb-8 max-w-3xl p-5">

          <div className="mb-3 text-center text-xl">
            Search a GitHub profile
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">

            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  analyzeProfile()
                }
              }}
              placeholder="username"
              className="pixel-input"
            />

            <button
              onClick={analyzeProfile}
              disabled={loading}
              className="pixel-button sm:min-w-40"
            >
              {loading ? "LOADING..." : "SEARCH"}
            </button>

          </div>

          {error && (
            <div className="mt-4 border-4 border-red-900 bg-red-200 p-3 text-center text-xl">
              {error}
            </div>
          )}

        </section>

        {/* Empty State */}
        {!user && !loading && (
          <section className="pixel-panel mx-auto max-w-3xl p-8 text-center">

            <div className="mb-5 text-5xl">
              💻
            </div>

            <h2 className="pixel-title mb-4 text-lg">
              GITHUB PROFILE
            </h2>

            <p className="text-2xl opacity-75">
              Search for a username to view their stats and repositories.
            </p>

          </section>
        )}

        {/* Profile */}
        {user && score && (
          <div className="space-y-7">

            {/* Profile + Score */}
            <section className="grid gap-7 lg:grid-cols-[1fr_320px]">

              <div className="pixel-panel p-6">

                <div className="flex flex-col items-center gap-6 sm:flex-row">

                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="pixel-avatar h-32 w-32"
                  />

                  <div className="flex-1 text-center sm:text-left">

                    <div className="mb-2 text-sm uppercase tracking-widest opacity-60">
                      PROFILE
                    </div>

                    <h2 className="pixel-title text-lg">
                      {user.name || user.login}
                    </h2>

                    <p className="mt-2 text-2xl">
                      @{user.login}
                    </p>

                    {user.bio && (
                      <p className="mt-3 text-xl opacity-70">
                        {user.bio}
                      </p>
                    )}

                    {user.location && (
                      <p className="mt-3">
                        📍 {user.location}
                      </p>
                    )}

                    <a
                      href={user.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-block underline"
                    >
                      View on GitHub →
                    </a>

                  </div>

                  <div className="text-center">

                    <div className="text-lg">
                      LEVEL
                    </div>

                    <div className="pixel-title text-4xl">
                      {score.level}
                    </div>

                    <div className="mt-3 border-4 border-[#473524] bg-[#d19a38] px-3 py-2 text-white">
                      {score.rank}
                    </div>

                  </div>

                </div>

              </div>

              {/* Score */}
              <div className="wood-panel flex flex-col items-center justify-center p-7 text-center">

                <div className="text-5xl">
                  ⭐
                </div>

                <div className="mt-3 text-lg">
                  SCORE
                </div>

                <div className="pixel-title my-3 text-4xl">
                  {score.overall}
                </div>

                <div className="text-xl">
                  / 100
                </div>

                <div className="mt-5 w-full">

                  <div className="mb-2 flex justify-between">
                    <span>XP</span>
                    <span>{score.xp}</span>
                  </div>

                  <div className="stat-track">

                    <div
                      className="stat-fill gold"
                      style={{
                        width: `${score.overall}%`,
                      }}
                    />

                  </div>

                </div>

              </div>

            </section>

            {/* Stats */}
            <section className="pixel-panel p-6">

              <h2 className="pixel-title mb-7 text-center text-lg">
                STATS
              </h2>

              <div className="grid gap-5 md:grid-cols-2">

                <Stat
                  icon="💻"
                  name="CODING"
                  value={score.coding}
                />

                <Stat
                  icon="⭐"
                  name="REPUTATION"
                  value={score.reputation}
                  color="gold"
                />

                <Stat
                  icon="🏗"
                  name="PROJECTS"
                  value={score.projects}
                />

                <Stat
                  icon="👥"
                  name="COMMUNITY"
                  value={score.community}
                  color="blue"
                />

                <Stat
                  icon="⚡"
                  name="ACTIVITY"
                  value={score.activity}
                  color="gold"
                />

              </div>

            </section>

            {/* Quick Stats */}
            <section className="grid gap-5 sm:grid-cols-3">

              <InfoCard
                icon="📦"
                label="REPOSITORIES"
                value={user.public_repos}
              />

              <InfoCard
                icon="♥"
                label="FOLLOWERS"
                value={user.followers}
              />

              <InfoCard
                icon="↗"
                label="FOLLOWING"
                value={user.following}
              />

            </section>

            {/* Achievements */}
            <section className="pixel-panel p-6">

              <h2 className="pixel-title mb-7 text-center text-lg">
                ACHIEVEMENTS
              </h2>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                <Achievement
                  icon="⭐"
                  title="STAR COLLECTOR"
                  unlocked={score.reputation >= 30}
                />

                <Achievement
                  icon="🏗️"
                  title="BUILDER"
                  unlocked={user.public_repos >= 5}
                />

                <Achievement
                  icon="👑"
                  title="POPULAR"
                  unlocked={user.followers >= 50}
                />

                <Achievement
                  icon="⚡"
                  title="RISING DEV"
                  unlocked={score.activity >= 30}
                />

              </div>

            </section>

            {/* Repositories */}
            <section className="pixel-panel p-6">

              <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                <h2 className="pixel-title text-lg">
                  REPOSITORIES
                </h2>

                <span className="text-xl opacity-70">
                  {repos.length} repos
                </span>

              </div>

              <div className="space-y-4">

                {repos
                  .slice()
                  .sort(
                    (a, b) =>
                      b.stargazers_count -
                      a.stargazers_count
                  )
                  .slice(0, 10)
                  .map((repo, index) => (

                    <a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="quest flex items-center gap-4 p-4"
                    >

                      <div className="text-3xl">
                        {index === 0
                          ? "🥇"
                          : index === 1
                            ? "🥈"
                            : index === 2
                              ? "🥉"
                              : `#${index + 1}`}
                      </div>

                      <div className="min-w-0 flex-1">

                        <div className="text-2xl font-bold">
                          {repo.name}
                        </div>

                        <div className="truncate text-lg opacity-70">
                          {getRepoDescription(repo)}
                        </div>

                        {repo.language && (
                          <div className="mt-1 text-base opacity-60">
                            {repo.language}
                          </div>
                        )}

                      </div>

                      <div className="text-right text-lg">

                        <div>
                          ⭐ {repo.stargazers_count}
                        </div>

                        <div>
                          🍴 {repo.forks_count}
                        </div>

                      </div>

                    </a>

                  ))}

              </div>

            </section>

            {/* Footer */}
            <footer className="pb-10 text-center text-lg opacity-60">
              LvlUpGit
            </footer>

          </div>
        )}

      </div>

    </main>
  )
}

function Stat({
  icon,
  name,
  value,
  color = "",
}: {
  icon: string
  name: string
  value: number
  color?: string
}) {
  return (
    <div>

      <div className="mb-2 flex justify-between text-xl">

        <span>
          {icon} {name}
        </span>

        <span className="font-bold">
          {value}
        </span>

      </div>

      <div className="stat-track">

        <div
          className={`stat-fill ${color}`}
          style={{
            width: `${value}%`,
          }}
        />

      </div>

    </div>
  )
}

function Achievement({
  icon,
  title,
  unlocked,
}: {
  icon: string
  title: string
  unlocked: boolean
}) {
  return (
    <div
      className={`badge p-5 text-center ${
        !unlocked ? "grayscale opacity-40" : ""
      }`}
    >

      <div className="mb-3 text-5xl">
        {icon}
      </div>

      <div className="pixel-title text-[10px]">
        {title}
      </div>

      <div className="mt-3 text-lg">
        {unlocked ? "✓ UNLOCKED" : "LOCKED"}
      </div>

    </div>
  )
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: string
  label: string
  value: number
}) {
  return (
    <div className="wood-panel p-5 text-center">

      <div className="text-4xl">
        {icon}
      </div>

      <div className="pixel-title mt-3 text-sm">
        {value}
      </div>

      <div className="mt-2 text-lg">
        {label}
      </div>

    </div>
  )
}

export default App