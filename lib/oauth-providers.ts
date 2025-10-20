// OAuth Provider Mock System
export interface OAuthProvider {
  id: string
  name: string
  icon: string
  color: string
}

export const oauthProviders: OAuthProvider[] = [
  {
    id: "google",
    name: "Google",
    icon: "🔍",
    color: "#4285F4",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: "f",
    color: "#1877F2",
  },
  {
    id: "meta",
    name: "Meta",
    icon: "◆",
    color: "#0A66C2",
  },
]

export async function handleOAuthLogin(provider: string, email?: string) {
  // Simulate OAuth flow
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: `oauth_${provider}_${Date.now()}`,
        email: email || `user_${provider}@zyntra.com`,
        name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
        provider,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${provider}`,
      })
    }, 1500)
  })
}
