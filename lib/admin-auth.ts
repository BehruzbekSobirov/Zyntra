// Admin Authentication
const ADMIN_CREDENTIALS = {
  username: "cobratatef",
  password: "behruzbek@38A",
}

export function validateAdminCredentials(username: string, password: string): boolean {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password
}

export function getAdminToken(): string {
  return btoa(`${ADMIN_CREDENTIALS.username}:${Date.now()}`)
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem("admin_token") !== null
}

export function setAdminToken(token: string): void {
  localStorage.setItem("admin_token", token)
}

export function clearAdminToken(): void {
  localStorage.removeItem("admin_token")
}
