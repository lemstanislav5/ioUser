let url = 'messenger.ddns.net',
    ws = 'ws', // wss
    port = '80', // 433
    colors = {
      conteiner: '#fff',
      top: '#2c2e33',
      messeges: '#000',
      from: '#303245',
      to: '#888887',
      text: '#FFB700',
      notification: '#333',
      toImage: '#888887',
      documents: '#888887',
      audio: '#888887',
      video: '#888887',
    },
    testData = false, // "false" уберет тестовые сообщения
    iconChat = true, // "false" поменяет иконку чата на шапку окна, высплывающую снизу
    initialFirstQuestions = [
      'Здравствуйте!',
      'Mне нужна помощь!',
      'Как пройти в библиотеку?',
      'Вы не скажете, сколько сейчас градусов ниже нуля?',
    ],
    limitSizeFile = 10; // в мегабайтах
export { url, ws, port, colors, testData, iconChat, initialFirstQuestions,limitSizeFile }
