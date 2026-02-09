// Chart Data
const chartData = {
  labels: ["Hadir", "Sakit", "Izin", "Terlambat", "Pulang Lebih Awal", "Alpa"],
  datasets: [
    {
      data: [15, 2, 1, 4, 2, 0],
      backgroundColor: [
        "#4CAF50", // Hadir
        "#FFC107", // Sakit
        "#2196F3", // Izin
        "#FF9800", // Terlambat
        "#8BC34A", // Pulang Lebih Awal
        "#F44336", // Alpa
      ],
      borderWidth: 0,
    },
  ],
};

// Chart Config
const config = {
  type: "doughnut",
  data: chartData,
  options: {
    responsive: true,
    maintainAspectRatio: true,
    cutout: "70%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#111",
        bodyColor: "#666",
        borderColor: "#e0e0e0",
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          label: function (context) {
            return " " + context.label + ": " + context.parsed + " hari";
          },
        },
      },
    },
  },
};

// Initialize Chart
document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("attendanceChart");
  if (ctx) {
    new Chart(ctx, config);
  }
});

// Month Navigation
let currentMonth = 2; // Maret = index 2
let currentYear = 2025;

const monthNames = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

function prevMonth() {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  updateMonthText();
}

function nextMonth() {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  updateMonthText();
}

function updateMonthText() {
  document.getElementById("monthText").textContent =
    monthNames[currentMonth] + " " + currentYear;
}
