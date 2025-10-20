export interface UserProfile {
  id: string
  name: string
  title: string
  skills: string[]
  experience: number
  goals: string[]
  workStyle: string[]
  availability: string
  bio: string
}

export interface MatchScore {
  overall: number
  skillMatch: number
  goalAlignment: number
  workStyleMatch: number
  experienceBalance: number
  reasons: string[]
}

export function calculateMatchScore(user1: UserProfile, user2: UserProfile): MatchScore {
  // Skill Match (0-100)
  const commonSkills = user1.skills.filter((s) => user2.skills.includes(s))
  const skillMatch = Math.min(100, (commonSkills.length / Math.max(user1.skills.length, user2.skills.length)) * 100)

  // Goal Alignment (0-100)
  const commonGoals = user1.goals.filter((g) => user2.goals.includes(g))
  const goalAlignment = Math.min(100, (commonGoals.length / Math.max(user1.goals.length, user2.goals.length)) * 100)

  // Work Style Match (0-100)
  const commonStyles = user1.workStyle.filter((s) => user2.workStyle.includes(s))
  const workStyleMatch = Math.min(
    100,
    (commonStyles.length / Math.max(user1.workStyle.length, user2.workStyle.length)) * 100,
  )

  // Experience Balance (0-100)
  const expDiff = Math.abs(user1.experience - user2.experience)
  const experienceBalance = Math.max(0, 100 - expDiff * 10)

  // Calculate overall score
  const overall =
    Math.round((skillMatch * 0.35 + goalAlignment * 0.3 + workStyleMatch * 0.2 + experienceBalance * 0.15) / 100) * 100

  // Generate reasons
  const reasons: string[] = []
  if (skillMatch > 70) reasons.push(`Strong skill overlap (${commonSkills.length} shared skills)`)
  if (goalAlignment > 70) reasons.push(`Aligned goals and vision`)
  if (workStyleMatch > 70) reasons.push(`Compatible work styles`)
  if (experienceBalance > 70) reasons.push(`Complementary experience levels`)
  if (skillMatch < 50) reasons.push(`Diverse skill sets - great for learning`)

  return {
    overall: Math.min(100, overall),
    skillMatch: Math.round(skillMatch),
    goalAlignment: Math.round(goalAlignment),
    workStyleMatch: Math.round(workStyleMatch),
    experienceBalance: Math.round(experienceBalance),
    reasons,
  }
}
