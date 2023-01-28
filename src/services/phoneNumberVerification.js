export const phoneNumberVerification = (phone, e) => {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let resurt = '';
  if(numbers.indexOf(parseInt(e.key)) !== -1 && phone.length < 16) {
    if(phone.length === 0) resurt = '+7(' + e.key;
    if(phone.length === 3) resurt = phone + e.key;
    if(3 < phone.length && phone.length < 6) resurt = phone + e.key;
    if(phone.length === 5) resurt = phone + e.key + ')';
    if(6 < phone.length && phone.length < 10) resurt = phone + e.key;
    if(phone.length === 10) resurt = phone + '-' + e.key;
    if(phone.length === 12) resurt = phone + e.key;
    if(phone.length === 13) resurt = phone + '-' + e.key;
    if(phone.length === 15) resurt = phone + e.key;
  }
  return resurt;
}