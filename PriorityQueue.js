class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  addInQueue(job) {
    this.heap.push(job);
    this.heapifyUp();
  }

  removeFromQueue() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const topJob = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return topJob;
  }

  heapifyUp() {
    let idx = this.heap.length - 1;
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      if (this.heap[idx].priority >= this.heap[parentIdx].priority) break;
      [this.heap[idx], this.heap[parentIdx]] = [
        this.heap[parentIdx],
        this.heap[idx],
      ];
      idx = parentIdx;
    }
  }

  heapifyDown() {
    let idx = 0;
    const length = this.heap.length;
    while (true) {
      let leftIdx = 2 * idx + 1;
      let rightIdx = 2 * idx + 2;
      let swapIdx = idx;

      if (
        leftIdx < length &&
        this.heap[leftIdx].priority < this.heap[swapIdx].priority
      ) {
        swapIdx = leftIdx;
      }
      if (
        rightIdx < length &&
        this.heap[rightIdx].priority < this.heap[swapIdx].priority
      ) {
        swapIdx = rightIdx;
      }
      if (swapIdx === idx) break;

      [this.heap[idx], this.heap[swapIdx]] = [
        this.heap[swapIdx],
        this.heap[idx],
      ];
      idx = swapIdx;
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  displayJobs = () => {
    console.log("Current Job Queue: ");
    this.heap.forEach((job) => {
      console.log(
        `Job Name: ${job.name}, Priority: ${job.priority}, Burst Time: ${job.burstTime}`
      );
    });
  };

  addJob(name, priority, burstTime) {
    const newJob = { id: Date.now(), name, priority, burstTime };
    this.addInQueue(newJob);
    this.displayJobs();
  }

  startScheduler() {
    if (this.isEmpty()) {
      console.log("No jobs to execute.");
      return;
    }
    const job = this.removeFromQueue();
    console.log(`Executing: ${job.name} (Priority: ${job.priority})`);

    let timer = setInterval(() => {
      job.burstTime--;
      console.log(`Remaining Time: ${job.burstTime}`);

      if (job.burstTime === 0) {
        clearInterval(timer);
        console.log(`Job ${job.name} completed.`);
        this.startScheduler();
      }
    }, 1000);
  }
}

window.PriorityQueue = PriorityQueue;
