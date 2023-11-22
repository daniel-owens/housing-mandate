function updateCountdown() {
    const endDate = new Date("2031-12-31T23:59:59").getTime();
    const now = new Date().getTime();
    const timeLeft = endDate - now;

    if (timeLeft < 0) {
        document.getElementById("countdown-timer").innerHTML = "Countdown expired!";
    } else {
        const years = Math.floor(timeLeft / (1000 * 60 * 60 * 24 * 365));
        const months = Math.floor((timeLeft % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
        const days = Math.floor((timeLeft % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById("years").innerText = years.toString().padStart(2, '0');
        document.getElementById("months").innerText = months === 1 ? '01' : months.toString().padStart(2, '0');
        document.getElementById("days").innerText = days.toString().padStart(2, '0');
        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');

        const monthsText = months === 1 ? 'month,' : 'months';
        document.getElementById("months-label").innerText = monthsText;
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();