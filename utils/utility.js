const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  
  export function formatDate(dateString) {
    const [dayStr, monthStr, yearStr] = dateString.split("/");
    const day = parseInt(dayStr);
    const month = monthNames[parseInt(monthStr) - 1];
    const year = parseInt(yearStr);
    return `${day}-${month}-${year}`;
  }
  