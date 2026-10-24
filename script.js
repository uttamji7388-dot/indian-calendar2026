
const yearSelect = document.getElementById("yearSelect");
const yearCalendar = document.getElementById("yearCalendar");

const monthNames = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
];

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Fixed-date holidays and selected festival dates.
// Verify movable festival dates before official use.
const holidays = {
    2026: {
        "01-26": "Republic Day",
        "03-04": "Holi (indicative)",
        "08-15": "Independence Day",
        "10-02": "Gandhi Jayanti",
        "11-08": "Diwali (indicative)",
        "12-25": "christmas",
        "07-01" : "happy birthday(aaaa)",
       
    },
    2027: {
        "01-26": "Republic Day",
        "03-22": "Holi (indicative)",
        "08-15": "Independence Day",
        "10-02": "Gandhi Jayanti",
        "10-29": "Diwali (indicative)",
        "12-25": "Christmas"
    },
    2028: {
        "01-26": "Republic Day",
        "03-11": "Holi (indicative)",
        "08-15": "Independence Day",
        "10-02": "Gandhi Jayanti",
        "10-17": "Diwali (indicative)",
        "12-25": "Christmas"
    },
    2029: {
        "01-26": "Republic Day",
        "03-01": "Holi (indicative)",
        "08-15": "Independence Day",
        "10-02": "Gandhi Jayanti",
        "11-05": "Diwali (indicative)",
        "12-25": "Christmas"
    },
    2030: {
        "01-26": "Republic Day",
        "03-20": "Holi (indicative)",
        "08-15": "Independence Day",
        "10-02": "Gandhi Jayanti",
        "10-26": "Diwali (indicative)",
        "12-25": "Christmas"
    }
};

function createCalendar(year) {
    yearCalendar.innerHTML = "";

    for (let month = 0; month < 12; month++) {
        const monthCard = document.createElement("section");
        monthCard.className = "month-card";

        const heading = document.createElement("h2");
        heading.className = "month-title";
        heading.textContent = `${monthNames[month]} ${year}`;
        monthCard.appendChild(heading);

        const grid = document.createElement("div");
        grid.className = "calendar-grid";

        // Add weekday headings.
        weekdays.forEach(day => {
            const cell = document.createElement("div");
            cell.className = "weekday";
            cell.textContent = day;
            grid.appendChild(cell);
        });

        // Day of week for the first day of the month.
        const firstDay = new Date(year, month, 1).getDay();

        // Number of days in this month.
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Empty cells before day 1.
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement("div");
            emptyCell.className = "day empty";
            grid.appendChild(emptyCell);
        }

        // Today's date, using the computer's local date.
        const now = new Date();
        const isCurrentMonth =
            now.getFullYear() === year &&
            now.getMonth() === month;

        // Add all dates.
        for (let day = 1; day <= daysInMonth; day++) {
            const cell = document.createElement("div");
            cell.className = "day";
            cell.textContent = day;

            const date = new Date(year, month, day);
            const dateKey =
                String(month + 1).padStart(2, "0") + "-" +
                String(day).padStart(2, "0");

            // Highlight Sundays.
            if (date.getDay() === 0) {
                cell.classList.add("sunday");
            }

            // Highlight holidays and show their names on hover.
            const holidayName = holidays[year]?.[dateKey];

            if (holidayName) {
                cell.classList.add("holiday");
                cell.title = holidayName;
                cell.setAttribute("aria-label",
                    `${day} ${monthNames[month]}: ${holidayName}`);
            } else {
                cell.setAttribute("aria-label",
                    `${day} ${monthNames[month]} ${year}`);
            }

            // Highlight today's date.
            if (
                isCurrentMonth &&
                now.getDate() === day
            ) {
                cell.classList.add("today");
            }

            grid.appendChild(cell);
        }

        monthCard.appendChild(grid);
        yearCalendar.appendChild(monthCard);
    }
}

// Generate the initially selected year.
createCalendar(Number(yearSelect.value));

// Regenerate the calendar when the year changes.
yearSelect.addEventListener("change", function () {
    createCalendar(Number(this.value));
});
