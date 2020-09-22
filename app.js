const express = require("express");
const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));

app.get('/', (req, res) => {
	res.render('index')
}) /* этот набор кода выше инициализирует наше экспресс приложение */
server = app.listen("3000", () => console.log("Server is running..."));  

const io = require("socket.io")(server); /* объект io представляет доступ к библиотеке socket.io*/

io.on('connection', (socket) => {
	console.log('New user connected') /* Выводим такое сообщение в консоль каждый раз,когда подключается новый юзер*/

	socket.username = "Anonymous" /* Устанавливаем имя по умолчанию - аноним*/

    socket.on('change_username', (data) => {
        socket.username = data.username      /* Событие смены имени*/
    })

    socket.on('new_message', (data) => {
        io.sockets.emit('add_mess', {message : data.message, username : socket.username, className:data.className}); /* для этого события мы можем наблюдать,что мы 
        вызываем свойство sockets для io, он представляет собой всех подключенныех "пользователей". Проще говоря, эта строка отправит сообщение всем сокетам */
    })

    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username}) /* событие сокета,когда пользователь набирает сообщение */
    })
})
