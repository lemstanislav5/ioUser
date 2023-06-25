let url = 'consultant.sytes.net',
    ws = 'ws', // wss
    port = '80', // 433
    colors = {
      conteiner: '#fff',
      top: '#2c2e33',
      messeges: '#000',
      from: '#303245',
      fromImage: '#303245',
      fromDocuments: '#303245',
      fromAudio: '#303245',
      fromVideo: '#303245',
      text: '#FFB700',
      notification: '#333',
      to: '#5e785e',
      toImage: '#5e785e',
      toDocuments: '#5e785e',
      toAudio: '#5e785e',
      toVideo: '#5e785e',
    },
    testData = false, // "false" уберет тестовые сообщения
    initialFirstQuestions = [
      'Здравствуйте!',
      'Mне нужна помощь!',
      'Как пройти в библиотеку?',
      'Вы не скажете, сколько сейчас градусов ниже нуля?',
    ],
    filesType = ['jpeg', 'jpg', 'png', 'pdf', 'doc', 'docx', 'txt', 'mp3', 'mp4'],
    limitSizeFile = 10, // в мегабайтах
    contacts = {
      Telegram: 'null',
      VKontakte: 'null',
      WhatsApp: 'null',
    },
    consentLink = 'null',
    policyLink = 'null';
export { url, ws, port, colors, testData, initialFirstQuestions, filesType, limitSizeFile, contacts, consentLink, policyLink }
