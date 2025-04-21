const pq = new PriorityQueue();
let jobCount = 0;
const maxJobs = 3;

function submitJob() {
  const name = document.getElementById("jobName").value;
  const priority = parseInt(document.getElementById("jobPriority").value);
  const burstTime = parseInt(document.getElementById("jobBurstTime").value);

  if (!name || isNaN(priority) || isNaN(burstTime)) {
    alert("Please fill all fields correctly.");
    return;
  }

  if (jobCount >= maxJobs) {
    alert("You’ve already added 3 jobs.");
    return;
  }

  pq.addJob(name, priority, burstTime);

  const jobList = document.getElementById("jobList");
  const li = document.createElement("li");
  li.textContent = `Job Name: ${name}, Priority: ${priority}, Burst Time: ${burstTime}`;
  jobList.appendChild(li);

  jobCount++;

  document.getElementById("jobName").value = "";
  document.getElementById("jobPriority").value = "";
  document.getElementById("jobBurstTime").value = "";

  if (jobCount === maxJobs) {
    const startBtn = document.getElementById("startBtn");
    startBtn.disabled = false;
    startBtn.style.cursor = "pointer";
    startBtn.style.background = "#007bff";
  }
}

function startJobs() {
  const outputBox = document.getElementById("output");
  const originalLog = console.log;

  console.log = function (msg) {
    outputBox.textContent += msg + "\n";
    outputBox.scrollTop = outputBox.scrollHeight;
    originalLog.apply(console, arguments);
  };

  pq.startScheduler();
}
