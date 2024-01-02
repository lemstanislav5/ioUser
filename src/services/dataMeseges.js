export let dateMessage = (time) => {
  const i = (n) => (n < 10)? '0'+n: n;
  const date = new Date(time),
        hours = date.getHours(),
        min = date.getMinutes(),
        day = date.getDate(),
        month = date.getMonth() + 1,  
        year = date.getFullYear();
  return [i(day)+'.'+i(month)+'.'+i(year), i(hours)+':'+i(min)];
}