export function generateUniqueId(): string {
  return `form_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}
