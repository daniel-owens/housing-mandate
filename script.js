// The Housing Element period ends January 31, 2031, in San Francisco.
const DEADLINE = { year: 2031, month: 2, day: 1 }; // midnight after January 31
const deadlineInstant = Date.parse("2031-02-01T00:00:00-08:00");
const sfClock = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Los_Angeles",
  year: "numeric", month: "numeric", day: "numeric",
  hour: "numeric", minute: "numeric", second: "numeric", hourCycle: "h23"
});

function sanFranciscoTime(instant) {
  return Object.fromEntries(
    sfClock.formatToParts(instant)
      .filter(part => part.type !== "literal")
      .map(part => [part.type, Number(part.value)])
  );
}

function updateCountdown() {
  const timer = document.getElementById("countdown-timer");
  const now = new Date();

  if (now.getTime() >= deadlineInstant) {
    timer.textContent = "The Housing Element period has ended.";
    return;
  }

  const current = sanFranciscoTime(now);
  // Subtract calendar years and months, then borrow days and clock units.
  let years = DEADLINE.year - current.year;
  let months = DEADLINE.month - current.month;
  let days = DEADLINE.day - current.day;
  let hours = -current.hour;
  let minutes = -current.minute;
  let seconds = -current.second;

  if (seconds < 0) { seconds += 60; minutes--; }
  if (minutes < 0) { minutes += 60; hours--; }
  if (hours < 0) { hours += 24; days--; }
  if (days < 0) {
    months--;
    const priorMonth = new Date(Date.UTC(DEADLINE.year, DEADLINE.month - 1, 0));
    days += priorMonth.getUTCDate();
  }
  if (months < 0) { months += 12; years--; }

  for (const [id, value] of Object.entries({ years, months, days, hours, minutes, seconds })) {
    document.getElementById(id).textContent = String(value).padStart(2, "0");
  }
  document.getElementById("months-label").textContent = months === 1 ? "month," : "months,";
}

updateCountdown();
setInterval(updateCountdown, 1000);