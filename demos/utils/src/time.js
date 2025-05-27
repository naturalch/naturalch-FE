/**
 * 精确计时器
 * requestAnimationFrame + 时间补偿
 */
class PrecisionTimer {
  constructor(callback, interval) {
    this.callback = callback;
    this.interval = interval; // 单位: 毫秒
    this.expected = 0;
    this.timeoutId = null;
    this.running = false;
  }

  start() {
    this.expected = performance.now() + this.interval;
    this.running = true;
    this.schedule();
  }

  schedule() {
    const delay = Math.max(0, this.expected - performance.now());
    this.timeoutId = setTimeout(() => {
      const drift = performance.now() - this.expected;
      this.callback();
      this.expected += this.interval;
      if (this.running) this.schedule();
      // 动态调整下次执行时间
      const nextDelay = Math.max(0, this.interval - drift);
      if (nextDelay > 0) {
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(this.schedule.bind(this), nextDelay);
      }
    }, delay);
  }

  stop() {
    this.running = false;
    clearTimeout(this.timeoutId);
  }
}

// 使用示例
const timer = new PrecisionTimer(() => {
  console.log('精确触发:', performance.now());
}, 100); // 100ms 间隔
timer.start();

// ---------------------------------------------------------

/**
 * Web Worker + 高精度时间戳
 */
// main.js
const worker = new Worker('timer-worker.js');
worker.postMessage({ 
  command: 'start', 
  interval: 100, 
});
worker.onmessage = (e) => {
  if (e.data.type === 'tick') {
    console.log('Worker 计时:', e.data.time);
  }
};

// timer-worker.js
let interval = 0;
let nextTick = 0;

self.onmessage = function(e) {
  if (e.data.command === 'start') {
    interval = e.data.interval;
    nextTick = performance.now();
    schedule();
  }
};

function schedule() {
  const now = performance.now();
  const drift = now - nextTick;
  
  // 误差超过 10ms 则重置计时
  if (drift > 10) nextTick = now;
  
  nextTick += interval;
  self.postMessage({ type: 'tick', time: now });
  
  const delay = Math.max(0, nextTick - performance.now());
  setTimeout(schedule, delay);
}

// ---------------------------------------------------------
