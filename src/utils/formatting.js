export function formatDate(timestamp) {
  // Check if the input is valid
  if (!timestamp || !(timestamp instanceof Date)) {
    return "Invalid date";
  }

  // Format the date
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const formattedDate = timestamp.toLocaleDateString("en-US", options);

  return formattedDate;
}

export function formatDateOnly(timestamp) {
  // Check if the input is valid
  if (!timestamp || !(timestamp instanceof Date)) {
    return "Invalid date";
  }

  // Format the date
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const formattedDate = timestamp.toLocaleDateString("en-US", options);

  return formattedDate;
}

export function formatTimeOnly(timestamp) {
  // Check if the input is valid
  if (!timestamp || !(timestamp instanceof Date)) {
    return "Invalid date";
  }

  // Format the date
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const formattedTime = timestamp.toLocaleDateString("en-US", options);

  return formattedTime;
}
