// Set to store existing IDs
const existingIds = new Set<string>()

// Function to generate a random ID
export function generateRandomId(): string {
  return Math.random().toString(36).substr(2, 9)
}

// Function to verify if an ID is unique
export function isIdUnique(id: string): boolean {
  return !existingIds.has(id)
}

// Function to add an ID to the set of existing IDs
export function addId(id: string): void {
  existingIds.add(id)
}

// Function to generate a unique ID
export function generateUniqueId(): string {
  let id = generateRandomId()
  while (!isIdUnique(id)) {
    id = generateRandomId()
  }
  addId(id)
  return id
}

