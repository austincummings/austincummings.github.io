// Simple JavaScript for Austin Cummings' portfolio website

document.addEventListener("DOMContentLoaded", () => {
  // Update copyright year
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = currentYear;
  }
});