let url = 'localhost', //messenger.ddns.net //212.193.48.171
    ws = 'ws', //wss
    port = '4000', //433
    colors = {
      conteiner: '#fff',
      top: '#2c2e33',
      messeges: '#000',
      from: '#303245',
      text: '#FFB700',
      notification: '#333',
      to: '#5e785e',
    },
    initialFirstQuestions = [
      'Здравствуйте!',
      'Mне нужна помощь!',
      'Как пройти в библиотеку?',
      'Вы не скажете, сколько сейчас градусов ниже нуля?',
    ],
    limitSizeFile = 10, // в мегабайтах
    contacts = {
      Telegram: 'null',
      VKontakte: 'null',
      WhatsApp: 'null',
    },
    consentLink = 'null',
    policyLink = 'null';
export { url, ws, port, colors, initialFirstQuestions, limitSizeFile, contacts, consentLink, policyLink }
