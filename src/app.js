import express from "express";
import {engine} from 'express-handlebars'
import viewsRouter from './router/views.router.js'
import productsRouter from './router/products.router.js'
import { __dirname } from "./utils.js";
import cartsRouter from './router/carts.router.js'
import { Server } from "socket.io";
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(express.static())
app.use(express.static(__dirname+'/public')) // puedes acceder de manera faNfcDirectional, sin crear un endpoint

// handlebars
app.engine('handlebars', engine())
app.set ('views',__dirname+'/views')
app.set('view engine', 'handlebars')
//routers
app.use('/api/products',productsRouter)// cuando llamen a /products se activa el router asignado
app.use('/api/carts',cartsRouter) 
app.use('/api/views',viewsRouter) 


const httpServer = app.listen(8080, () => {
  console.log('Escuchando al puerto 8080')
})

// me deja ya trabajar con Websocket de lado del servidor 
const socketServer = new Server(httpServer)

const names = []
socketServer.on("connection", (socket)  => {
  console.log(`Cliente conectado ${socket.id}`);
  socket.on("disconnect", () => {
  console.log(`Cliente desconectado ${socket.id}`);
  })

  socket.on("firstEvent", (info) => {
    names.push(info);
    socketServer.emit("secondEvent", info);
    });  
})
