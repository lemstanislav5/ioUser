export let getDateTime = (num) => {
  const i = (n) => (n < 10)? '0'+n: n, e = new Date(num);
  return [i(e.getDate())+'.'+i(e.getMonth() + 1)+'.'+i(e.getFullYear()), i(e.getHours())+':'+i(e.getMinutes())];;
}