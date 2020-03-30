module.exports = (date, part) => {
  const d = new Date(date);
  if (part == "year") return d.getUTCFullYear();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const suffix = {
    1: "st",
    2: "nd",
    3: "rd",
    21: "st",
    22: "nd",
    23: "rd",
    31: "st"
  };

  return `${months[d.getMonth()]} ${d.getDate() +
    (suffix[d.getDate()] || "th")} ${d.getUTCFullYear()}`;
};
