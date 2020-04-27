var connections = [];
var players=[];
var b;

function Player(id,x,y,v,w,h,p){
    this.id=id;
    this.x = x;
    this.y = y;
    this.v = v;
    this.w = w;
    this.h = h;
    this.p = p;
}

function Ball(id,x,y,xv,yv,r){
    this.id=id;
    this.x = x;
    this.y = y;
    this.xv = xv;
    this.yv =yv;
    this.r = r;
} 

var express = require('express');
var app = express();
var server = app.listen(3010);
app.use(express.static('public'));

console.log("Execution");

 var socket = require('socket.io');
 var io = socket(server);

 function getCounter(){
    io.sockets.emit('getCounter',connections.length)
 }

 function heartBeat(){
    io.sockets.emit('heartBeat',players)
 }

 setInterval(heartBeat,33);

 function heartBeatBall(){
    io.sockets.emit('heartBeatBall',b)
 }

 setInterval(heartBeatBall,33);

io.sockets.on('connection', function(socket){
    connections.push(socket);
    getCounter();
    
    socket.on('start', function(data){
        console.log("Joueur:" + connections.length + " numero de connexion " + connections.length );
        var p = new Player (socket.id,data.x,data.y,data.w,data.h,data.p);
        players.push(p);
    })

    socket.on('demarrageBall', function(data){
        b = new Ball (socket.id,data.x,data.y,data.xv,data.yv,data.r);
        
    })

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


    socket.on('ModifierBall', function(data){
    
        b.x =data.x;
        b.y= data.y;
        b.xv= data.xv;
        b.yv= data.yv;
        b.r=data.r;
        
    })
    

});
