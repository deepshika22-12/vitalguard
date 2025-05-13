let history = [];
let vitalsLog = [];

function analyzeVitals() {
  const hr = parseInt(document.getElementById('hr').value);
  const bp = document.getElementById('bp').value;
  const spo2 = parseInt(document.getElementById('spo2').value);
  const temp = parseFloat(document.getElementById('temp').value);

  let risk = "Good";
  let color = "#4CAF50"; // Green for Good

  if (hr < 60 || hr > 100 || spo2 < 95 || temp > 37.5 || temp < 35) {
    risk = "Caution";
    color = "#FF9800"; // Orange for Caution
  }

  if (spo2 < 90 || temp > 39 || hr > 130) {
    risk = "High Risk";
    color = "#F44336"; // Red for High Risk
  }

  document.getElementById("riskMessage").textContent = risk;
  document.getElementById("resultBox").style.backgroundColor = color;

  // Add current vitals to log
  vitalsLog.push({ hr, bp, spo2, temp });
  if (vitalsLog.length > 10) vitalsLog.shift(); // Keep only the last 10 entries

  updateTable();
  drawChart();
}

function updateTable() {
  const tableBody = document.getElementById('vitalsTable').getElementsByTagName('tbody')[0];
  tableBody.innerHTML = ''; // Clear previous rows

  vitalsLog.forEach(vital => {
    const row = tableBody.insertRow();
    row.insertCell(0).textContent = vital.hr;
    row.insertCell(1).textContent = vital.bp;
    row.insertCell(2).textContent = vital.spo2;
    row.insertCell(3).textContent = vital.temp;
  });
}

function drawChart() {
  const ctx = document.getElementById('historyChart').getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: vitalsLog.map((_, index) => `Entry ${index + 1}`),
      datasets: [{
        label: 'Oxygen Saturation (%)',
        data: vitalsLog.map(vital => vital.spo2),
        backgroundColor: '#FF4E50', // Red for bars
        borderColor: '#FF4E50',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          min: 80,
          max: 100
        },
        x: {
          ticks: {
            display: true
          }
        }
      }
    }
  });
}
