const socket = io();

socket.emit('mensaje', "//JSON con todos los datos")

socket.on('evento-admin', datos =>{
    console.log(datos);
})