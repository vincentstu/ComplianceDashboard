export function formatDate(isoString) {
    if (!isoString) return "Unknown date";

  const date = new Date(isoString);

  const day = String(date.getDate()).padStart(2, '0');      // 13
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 08
  const year = date.getFullYear();                          // 2025

  return `${day}.${month}.${year}`;
}