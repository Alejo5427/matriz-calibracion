const Server = require('./models/server.js')

const server = new Server()

server.listen()

//Inicializacion del backend refiriendo la clase server y utilizando el metodo de listen