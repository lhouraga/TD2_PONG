var connections = [];
var players=[];
//var b;

function Player(id,x,y,v,w,h,p){
    this.id=id;
    this.x = x;
    this.y = y;
    this.v = v;
    this.w = w;
    this.h = h;
    this.p = p;
}
/*
function Ball(id,x,y,v,r){
    this.id=id;
    this.x = x;
    this.y = y;
    this.v = v;
    this.r = r;
}
  */  

var express = require('express');
var app = express();
var server = app.listen(3010);
app.use(express.static('public'));

console.log("Execution");
 //let http = require('http').Server(app);
 //let path = require('path');
 var socket = require('socket.io');
 var io = socket(server);

 function getCounter(){
    io.sockets.emit('getCounter',connections.length)
 }

 function heartBeat(){
    io.sockets.emit('heartBeat',players)
 }

 setInterval(heartBeat,33);
/*
 function MouvementBall(){
    io.sockets.emit('MouvementBall',b)
 }

 setInterval(MouvementBall,33);*/

io.sockets.on('connection', function(socket){
    connections.push(socket);
    getCounter();
    
    socket.on('start', function(data){
        console.log("Joueur:" + connections.length + " numero de connexion " + connections.length );
        var p = new Player (socket.id,data.x,data.y,data.w,data.h,data.p);
        players.push(p);
    })
/*
    socket.on('demarrageBall', function(data){
        //console.log("Joueur:" + data.id + " numero de connexion " + connections.length );
        b = new Ball (socket.id,data.x,data.y,data.v,data.r);
        
    })*/

    socket.on('update', function(data){
        var pl;
        for(var i=0;i<players.length ;i++ ){
            if(socket.id === players[i].id)
            pl=players[i];
        }
        pl.x =data.x;
        pl.y= data.y;
        pl.v= data.v;
        pl.w=data.w;
        pl.h= data.h;
        pl.p= data.p;
    })


  /*  socket.on('ModifierBall', function(data){
    
        b.x =data.x;
        b.y= data.y;
        b.v= data.v;
        b.r=data.r;
        
    })*/
    

});
