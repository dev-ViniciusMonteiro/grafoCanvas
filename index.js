var vertices = [];
var arestas = [];
var caminhoEncontrar = ['sp','pedreira']
var distancia = [] 
var controle = []
var caminho=[500,500];//posicao seqguido do peso -----  Peso = impar

//https://stackoverflow.com/questions/45608867/calculating-coordinate-of-intersection-between-lines-and-circle-and-degree-of-li
function setaCirculo(ctx, startX, startY, endX, endY, raio) {
  alpha = Math.atan((startY - endY) / (startX - endX)),
  dir = 0, // start 0 end 1
  side = 10;

  if (startX < endX) {
          endcx = endX + (raio + side/2) * Math.cos(alpha + Math.PI);
          endcy = endY + (raio + side/2) * Math.sin(alpha + Math.PI);
          startcx = startX - (raio + side/2) * Math.cos(alpha - Math.PI);
          startcy = startY - (raio + side/2) * Math.sin(alpha - Math.PI);
          dir = 0;
  } else if (startX >= endX) {
          endcx = endX - (raio + side/2) * Math.cos(alpha + Math.PI);
          endcy = endY - (raio + side/2) * Math.sin(alpha + Math.PI);
          startcx = startX + (raio + side/2) * Math.cos(alpha - Math.PI);
          startcy = startY + (raio + side/2) * Math.sin(alpha - Math.PI);
          dir = 1;
  }

  ctx.beginPath();
  ctx.moveTo(startcx, startcy);
  ctx.lineTo(endcx, endcy);
  ctx.lineWidth=1;
  ctx.stroke();

  //drawEqTriangle(ctx, side, startcx, startcy, 0);
  //drawEqTriangle(ctx, side, endcx, endcy, dir);  // tirei a seta pois tem das duas direcoes
}

function drawEqTriangle(ctx, side, cx, cy, dir) {
var h = side * (Math.sqrt(3) / 2);

ctx.save();
ctx.strokeStyle = "#000";
ctx.fillStyle = "#000";
ctx.translate(cx, cy);
ctx.rotate(alpha + Math.PI / 2);

ctx.beginPath();
ctx.lineWidth=1;

if (dir === 0) {
ctx.moveTo(0, -h / 2);
ctx.lineTo(-side / 2, h / 2);
ctx.lineTo(side / 2, h / 2);
ctx.lineTo(0, -h / 2);
} else if (dir === 1) {
ctx.moveTo(0, h / 2);
ctx.lineTo(-side / 2, -h / 2);
ctx.lineTo(side / 2, -h / 2);
ctx.lineTo(0, h / 2);
}

ctx.stroke();
ctx.fill();

ctx.closePath();
ctx.restore();
}  



function pesoCaminho(PosicaoInicial,PosicaoFinal){
    
    for(y=0;y<arestas.length;y++){
        if(arestas[y].a.nome==vertices[PosicaoInicial].nome||arestas[y].b.nome==vertices[PosicaoInicial].nome){//encontra todos os caminhos de ida e de volta 
            if(arestas[y].a.nome==PosicaoFinal||arestas[y].b.nome==PosicaoFinal){
                if(arestas[y].peso<caminho[1]){
                    caminho[0]=y
                    caminho[1]=arestas[y].peso
                }
                //console.log(caminho)
            }else{
                // for ( a = 0; a < vertices.length; a++) {
                //     if(arestas[y].b.nome==vertices[a].nome){
                //         pesoCaminho(a,PosicaoFinal)
                //     }
                // }
               // controle.push(y,arestas[y].peso)
                
            }
           
            //console.log(arestas[y])
            //console.log(controle)
        }
}
console.log('Tempo: '+caminho[1]+'  Caminho numero: ' + caminho[0] )
console.log(arestas[caminho[0]])

var div = document.getElementById('divID');
var text =" Distancia: "+caminho[1]+" Caminho de:" +  arestas[caminho[0]].a.nome + ' para: ' + arestas[caminho[0]].b.nome ;
    div.innerHTML += text;
}


function MenorCaminho(PosArr){
let PosicaoInicial = PosArr
let PosicaoFinal = caminhoEncontrar[1];

pesoCaminho(PosicaoInicial,PosicaoFinal)

}


function draw() {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");	  
      ctx.beginPath();

      for (var i = 0; i < vertices.length; i++) {
          var v = vertices[i];
         if(caminhoEncontrar[0]==vertices[i].nome){//se esta na posicao do caminho que quero
             //console.log(caminhoEncontrar[0]+'  chamar a funcao  '  +  vertices[i].nome)
             MenorCaminho(i)
         }


         //console.log(vertices[i].nome + ' ' + v.nome )
          if (v.nomePos == null || v.nomePos == 'top') {
              ctx.fillText(v.nome, v.x - 5, v.y - 12);
          } else if (v.nomePos == 'right') {
              ctx.fillText(v.nome, v.x + 12, v.y);
          } else if (v.nomePos == 'left') {
              ctx.fillText(v.nome, v.x - 17, v.y);
          } else {
              ctx.fillText(v.nome, v.x -5, v.y + 15);
          }
          ctx.moveTo(v.x + 5, v.y);
          ctx.arc(v.x, v.y, 5, 0, Math.PI * 2, true);
      }
      ctx.fill();
      for (var i = 0; i < arestas.length; i++) {
         //ctx.moveTo(arestas[i].a.x, arestas[i].a.y);
         //ctx.lineTo(arestas[i].b.x, arestas[i].b.y);
         //canvas_arrow(ctx, arestas[i].a.x, arestas[i].a.y, arestas[i].b.x, arestas[i].b.y);
         setaCirculo(ctx, arestas[i].a.x, arestas[i].a.y, arestas[i].b.x, arestas[i].b.y, 10);
         
          if (arestas[i].peso) {
              drawLabel(ctx, arestas[i].peso, arestas[i].a, arestas[i].b );
          }
      }
      ctx.stroke();
}

function requestData() {
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
              var dadosJSON = JSON.parse(this.responseText);
              montarVetor(dadosJSON)
              //console.log('caiu aqui 1')
      }
};
//console.log('caiu aqui 2')
xmlhttp.open("GET", "grafoPeso.json", true);
xmlhttp.send();



}

function montarVetor(dadosJSON) {
for (var i = 0; i < dadosJSON.vertices.length; i++) {
      vertices.push(dadosJSON.vertices[i]);
}
for (var i = 0; i < dadosJSON.arestas.length; i++) {
  var aresta = dadosJSON.arestas[i];    
  aresta.a = procurarVertice(dadosJSON.arestas[i].a);
  aresta.b = procurarVertice(dadosJSON.arestas[i].b);
  arestas.push(aresta);
}
draw()
}

function procurarVertice(nome) {
for (var i = 0; i < vertices.length; i++) {
      if (vertices[i].nome == nome) {
              return vertices[i];
      }
}
}


function canvas_arrow(context, fromx, fromy, tox, toy){
var headlen = 10;   // length of head in pixels
var angle = Math.atan2(toy-fromy,tox-fromx);
context.moveTo(fromx, fromy);
context.lineTo(tox, toy);
context.lineTo(tox-headlen*Math.cos(angle-Math.PI/6),toy-headlen*Math.sin(angle-Math.PI/6));
context.moveTo(tox, toy);
context.lineTo(tox-headlen*Math.cos(angle+Math.PI/6),toy-headlen*Math.sin(angle+Math.PI/6));
}



function drawLabel( ctx, text, p1, p2, alignment, padding ){
if (!alignment) alignment = 'center';
if (!padding) padding = 10;
var dx = p2.x - p1.x;
var dy = p2.y - p1.y;   
var p, pad;
if (alignment=='center'){
p = p1;
pad = 1/2;
} else {
var left = alignment=='left';
p = left ? p1 : p2;
pad = padding / Math.sqrt(dx*dx+dy*dy) * (left ? 1 : -1);
}

ctx.save();
ctx.textAlign = alignment;
ctx.translate(p.x+dx*pad,p.y+dy*pad);
ctx.rotate(Math.atan2(dy,dx));
ctx.fillText(text,0,-4);
ctx.restore();
}