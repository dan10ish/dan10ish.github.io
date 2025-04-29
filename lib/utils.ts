export function formatDate(dateString: string): string {
  try {
    const [year, month, day] = dateString.split('-').map(Number);
    // Basic validation
    if (isNaN(year) || isNaN(month) || isNaN(day) || month < 1 || month > 12 || day < 1 || day > 31) {
      return dateString; // Return original if format is unexpected
    }
    const formattedDay = day.toString().padStart(2, '0');
    const formattedMonth = month.toString().padStart(2, '0');
    return `${formattedDay}-${formattedMonth}-${year}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString; // Return original string in case of error
  }
} 