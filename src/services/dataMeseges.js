export let dateMessage = () => {
  let date = new Date(),
      hours = date.getHours(),
      min = date.getMinutes(),
      sec = date.getSeconds(),
      month = date.getMonth(),
      year = date.getFullYear();
  
  return date.getDate() + '-' + month + '-' + year + ',' + hours + ':' + min + ':' + sec;
}