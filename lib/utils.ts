import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

export function formatDate(dateString: string): string {
  if (!dateString) return ''

  let day: number
  let monthIndex: number
  let year: number

  const parts = dateString.split('-')
  if (parts.length === 3 && parts[0].length <= 2) {
    day = parseInt(parts[0], 10)
    monthIndex = parseInt(parts[1], 10) - 1
    year = parseInt(parts[2], 10)
  } else {
    const d = new Date(dateString)
    if (Number.isNaN(d.getTime())) return dateString
    day = d.getDate()
    monthIndex = d.getMonth()
    year = d.getFullYear()
  }

  const month = MONTHS[monthIndex] ?? ''
  return `${day} ${month}, ${year}`
}
