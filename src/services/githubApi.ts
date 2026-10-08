import type { GitHubRepo, GitHubUser } from "../types/github"

const API_URL = "https://api.github.com"

export async function getUser(
  username: string
): Promise<GitHubUser> {
  const response = await fetch(
    `${API_URL}/users/${username}`
  )

  if (!response.ok) {
    throw new Error("GitHub user not found")
  }

  return response.json()
}

export async function getRepos(
  username: string
): Promise<GitHubRepo[]> {
  const response = await fetch(
    `${API_URL}/users/${username}/repos?per_page=100&sort=updated`
  )

  if (!response.ok) {
    throw new Error("Unable to fetch repositories")
  }

  return response.json()
}