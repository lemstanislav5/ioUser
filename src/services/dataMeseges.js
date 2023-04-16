export let dateMessage = () => {
  const i = (time) => {
    if (time < 10) return '0' + time;
    return time;
  }
  let date = new Date(),
      hours = date.getHours(),
      min = date.getMinutes(),
      month = date.getMonth() + 1,
      year = date.getFullYear();
  
  return date.getDate() + '.' + i(month) + '.' + i(year) + ',' + i(hours) + ':' + i(min);
}