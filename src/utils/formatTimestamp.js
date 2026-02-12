// Helper to format Firestore Timestamp / Date / ISO value into DD/MM/YYYY
export function formatTimestamp(value) {
  if (!value) return '';

  let date;

  // Firestore Timestamp has a toDate method
  if (typeof value.toDate === 'function') {
    date = value.toDate();
  } else if (value instanceof Date) {
    date = value;
  } else {
    // Fallback for millis or ISO strings
    date = new Date(value);
  }

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

