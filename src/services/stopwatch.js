export const stopwatch = {
  interval: null, 
  start: (count, setCount) => {
    let watch = () => {
      let minute, second;
      second = count.second + 1;
      minute = Math.floor(second/60)
      if (count.minute === 3) return clearInterval(stopwatch.interval)
      setCount({minute, second})
    }
    stopwatch.interval = setInterval(watch, 1000);
  }, 
  stop: (interval) => {
    clearInterval(stopwatch.interval);
  }, 
}