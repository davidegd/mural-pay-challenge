export interface ActionType {
  type: string
  payload?: unknown
}

export const baseAction = (type: string, payload?: unknown): ActionType => ({
  type,
  payload,
})
