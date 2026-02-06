// Convert ISO date string to "DD.MM.YYYY" format
export function formatDate(isoString) {
    if (!isoString) return "Unknown date";

  const date = new Date(isoString);

  const day = String(date.getDate()).padStart(2, '0');      // 13
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 08
  const year = date.getFullYear();                          // 2025

  return `${day}.${month}.${year}`;
}

// Check if the date corresponds to today
export function isToday(date) {
    // Accepts date string in format 'DD.MM.YYYY'
    const [day, month, year] = date.split(".");
    const today = new Date();
    return (
      today.getDate() === Number(day) &&
      today.getMonth() + 1 === Number(month) &&
      today.getFullYear() === Number(year)
    );
}

export function isThisWeek(date) {
  // Accepts date string in format 'DD.MM.YYYY'
  const [day, month, year] = date.split(".");
  const inputDate = new Date(Number(year), Number(month) - 1, Number(day));
  const today = new Date();

  // Get Monday of current week
  const firstDayOfWeek = new Date(today);
  firstDayOfWeek.setDate(today.getDate() - today.getDay() + 1); // Monday

  // Get Sunday of current week
  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6); // Sunday

  // Check if inputDate is between Monday and Sunday (inclusive)
  return inputDate >= firstDayOfWeek && inputDate <= lastDayOfWeek;
}

export function isThisYear(date) {
  // Accepts date string in format 'DD.MM.YYYY'
  const [day, month, year] = date.split(".");
  const today = new Date();
  return today.getFullYear() === Number(year);
}

// Convert risk level number to string representation
export function riskNumToString(riskNum) {
    switch (riskNum) {
        case 1:
            return "Low Risk";
        case 2:
            return "Medium Risk";
        case 3:
            return "High Risk";
        default:
            return "Unknown risk level";
    }
}

// Helper function to map risk score to risk level
export function mapRiskScoreToLevel(score) {
  if (score === 0) return 0;
  if (score === 25) return 1;
  if (score === 50) return 2;
  if (score === 100) return 3;
  return 0; // Default fallback
}
