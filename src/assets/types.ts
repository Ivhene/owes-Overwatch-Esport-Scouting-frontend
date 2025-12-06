// Types matching the server JSON (snake_case keys)

export type Regions = 'NA' | 'EMEA' | 'Japan' | 'Korea' | 'Pacific' | string

export interface Role {
  role_id: number
  role_name: string
  role_image: string
}

export interface Team {
  team_id: number
  team_name: string
  team_image?: string | null
  competing_region: string
}

export interface Hero {
  hero_id: number
  hero_name: string
  hero_image?: string | null
  hero_role?: number
}

export interface Rating {
  rating_id: number
  ratings?: string | null
  rating_user?: string | null
  hero: Hero
}

export interface Player {
  player_id: number
  gamertag: string
  real_name?: string | null
  // server serializes DateOnly as YYYY-MM-DD
  birthday?: string | null
  native_region: string
  player_image?: string | null

  // nested DTOs
  role: Role
  current_team?: Team | null
  ratings: Rating[]
}
