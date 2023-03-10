let url = 'messenger.ddns.net',
    ws = 'ws', // wss
    port = '80', // 433
    colors = {
      conteiner: '#fff',
      top: '#2c2e33',
      messeges: '#000',
      from: '#303245',
      fromImage: '#5e785e',
      fromDocuments: '#5e785e',
      fromAudio: '#5e785e',
      fromVideo: '#5e785e',
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
    filesType = ['jpeg', 'jpg','png', 'pdf', 'doc', 'docx', 'txt', 'mp3', 'mp4'],
    limitSizeFile = 10, // в мегабайтах
    contacts = {
      Telegram: 'null',
      VKontakte: 'null',
      WhatsApp: 'null',
    };
export { url, ws, port, colors, testData, initialFirstQuestions, filesType, limitSizeFile, contacts }
