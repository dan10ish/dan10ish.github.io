export function formatDate(dateString: string): string {
  try {
    const [day, month, year] = dateString.split('-').map(Number);
    if (
      isNaN(year) ||
      isNaN(month) ||
      isNaN(day) ||
      month < 1 ||
      month > 12 ||
      day < 1 ||
      day > 31
    ) {
      return dateString;
    }
    const date = new Date(year, month - 1, day);
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return `${day} ${monthNames[month - 1]}, ${year}`;
  } catch (error) {
    return dateString;
  }
} 