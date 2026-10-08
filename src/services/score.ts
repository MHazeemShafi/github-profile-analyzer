import type { GitHubRepo, GitHubUser } from "../types/github"

export interface GitHubScore {
  overall: number
  coding: number
  reputation: number
  projects: number
  community: number
  activity: number
  level: number
  rank: string
  xp: number
}

export function calculateScore(
  user: GitHubUser,
  repos: GitHubRepo[]
): GitHubScore {

  /*
   * -----------------------------
   * BASIC DATA
   * -----------------------------
   */

  const totalStars = repos.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0
  )

  const totalForks = repos.reduce(
    (sum, repo) => sum + repo.forks_count,
    0
  )

  const languages = new Set(
    repos
      .map(repo => repo.language)
      .filter(Boolean)
  ).size

  /*
   * -----------------------------
   * CODING
   * -----------------------------
   *
   * Based on:
   * - Number of repositories
   * - Number of different languages
   */

  const repoScore = Math.min(
    60,
    repos.length * 4
  )

  const languageScore = Math.min(
    40,
    languages * 8
  )

  const coding = Math.min(
    100,
    repoScore + languageScore
  )

  /*
   * -----------------------------
   * REPUTATION
   * -----------------------------
   *
   * Based on:
   * - Followers
   * - Stars received
   */

  const followerScore = Math.min(
    60,
    user.followers * 2
  )

  const starScore = Math.min(
    40,
    totalStars * 2
  )

  const reputation = Math.min(
    100,
    followerScore + starScore
  )

  /*
   * -----------------------------
   * PROJECTS
   * -----------------------------
   *
   * Based on:
   * - Number of repositories
   * - Forks
   * - Stars
   */

  const projectCountScore = Math.min(
    40,
    repos.length * 4
  )

  const forkScore = Math.min(
    30,
    totalForks * 3
  )

  const projectStarScore = Math.min(
    30,
    totalStars
  )

  const projects = Math.min(
    100,
    projectCountScore +
      forkScore +
      projectStarScore
  )

  /*
   * -----------------------------
   * COMMUNITY
   * -----------------------------
   *
   * Based on:
   * - Followers
   * - Following
   *
   * Following is weighted lower because
   * followers are a stronger indicator
   * of community reach.
   */

  const communityFollowers = Math.min(
    75,
    user.followers * 3
  )

  const communityFollowing = Math.min(
    25,
    user.following
  )

  const community = Math.min(
    100,
    communityFollowers +
      communityFollowing
  )

  /*
   * -----------------------------
   * ACTIVITY
   * -----------------------------
   *
   * Recent repository updates matter
   * more than simply having many repos.
   */

  const now = Date.now()

  let recentActivity = 0

  for (const repo of repos) {

    const updated = new Date(
      repo.updated_at
    ).getTime()

    const daysSinceUpdate =
      (now - updated) /
      (1000 * 60 * 60 * 24)

    if (daysSinceUpdate <= 30) {
      recentActivity += 12
    } else if (daysSinceUpdate <= 90) {
      recentActivity += 8
    } else if (daysSinceUpdate <= 180) {
      recentActivity += 5
    } else if (daysSinceUpdate <= 365) {
      recentActivity += 2
    }
  }

  const activity = Math.min(
    100,
    recentActivity
  )

  /*
   * -----------------------------
   * OVERALL SCORE
   * -----------------------------
   *
   * Coding      25%
   * Projects    20%
   * Reputation  20%
   * Activity    20%
   * Community   15%
   */

  const overall = Math.round(
    coding * 0.25 +
    projects * 0.20 +
    reputation * 0.20 +
    activity * 0.20 +
    community * 0.15
  )

  /*
   * -----------------------------
   * LEVEL
   * -----------------------------
   */

  const level = Math.max(
    1,
    Math.floor(overall / 10) + 1
  )

  /*
   * -----------------------------
   * RANK
   * -----------------------------
   */

  let rank = "Rookie"

  if (overall >= 95) {
    rank = "Legend"
  } else if (overall >= 85) {
    rank = "Diamond"
  } else if (overall >= 75) {
    rank = "Platinum"
  } else if (overall >= 60) {
    rank = "Gold"
  } else if (overall >= 45) {
    rank = "Silver"
  } else if (overall >= 25) {
    rank = "Bronze"
  }

  /*
   * -----------------------------
   * XP
   * -----------------------------
   */

  const xp = overall * 100

  return {
    overall,
    coding,
    reputation,
    projects,
    community,
    activity,
    level,
    rank,
    xp,
  }
}