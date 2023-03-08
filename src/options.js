let url = 'messenger.ddns.net',
    ws = 'ws', // wss
    port = '80', // 433
    colors = {
      conteiner: '#fff',
      top: '#2c2e33',
      messeges: '#000',
      from: '#303245',
      text: '#FFB700',
      notification: '#333',
      to: '#5e785e',
      toImage: '#5e785e',
      toDocuments: '#5e785e',
      toAudio: '#5e785e',
      toVideo: '#5e785e',
    },
    testData = false, // "false" уберет тестовые сообщения
    iconChat = true, // "false" поменяет иконку чата на шапку окна, высплывающую снизу
    initialFirstQuestions = [
      'Здравствуйте!',
      'Mне нужна помощь!',
      'Как пройти в библиотеку?',
      'Вы не скажете, сколько сейчас градусов ниже нуля?',
    ],
    filesType = ['jpeg', 'jpg','png', 'pdf', 'doc', 'docx', 'txt', 'mp3', 'mp4'],
    limitSizeFile = 10; // в мегабайтах
export { url, ws, port, colors, testData, iconChat, initialFirstQuestions, filesType, limitSizeFile }
