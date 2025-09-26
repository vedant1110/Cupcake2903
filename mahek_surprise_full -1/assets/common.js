
// common.js - hearts, confetti, enableAfter utility
function makeHeart(parent){
  const h=document.createElement('div');h.className='heart';const left=Math.random()*100;const size=14+Math.random()*28;h.style.left=left+'%';h.style.width=size+'px';h.style.height=size+'px';h.style.bottom='-10vh';h.style.animation='rise '+(6+Math.random()*6)+'s linear forwards';parent.appendChild(h);setTimeout(()=>h.remove(),14000);
}
function startHearts(){
  const wrap=document.createElement('div');wrap.className='hearts';document.body.appendChild(wrap);setInterval(()=>makeHeart(wrap),700);
}
function enableAfter(id,sec,text){const btn=document.getElementById(id);if(!btn) return;btn.disabled=true;let t=sec;btn.textContent=text.replace('{t}',t);const iv=setInterval(()=>{t--;btn.textContent=text.replace('{t}',t);if(t<=0){clearInterval(iv);btn.disabled=false;btn.textContent=text.replace(/\s*\{t\}.*$/,'').trim();}},1000);}

// simple confetti (for celebration)
function launchConfetti(){
  const duration = 2.5 * 1000;
  const end = Date.now() + duration;
  const colors = [[255,99,132],[255,205,86],[75,192,192],[54,162,235],[153,102,255]];
  const canvas = document.getElementById('confettiCanvas'); if(!canvas) return; const ctx = canvas.getContext('2d'); canvas.width = innerWidth; canvas.height = innerHeight;
  const confs = [];
  for(let i=0;i<120;i++){confs.push({x:Math.random()*canvas.width,y:Math.random()*-canvas.height,dx:(Math.random()-0.5)*6,dy:Math.random()*4+2,color:colors[Math.floor(Math.random()*colors.length)],r:Math.random()*6+4})}
  (function frame(){ctx.clearRect(0,0,canvas.width,canvas.height);confs.forEach(c=>{ctx.beginPath();ctx.fillStyle='rgba('+c.color.join(',')+',0.95)';ctx.ellipse(c.x,c.y,c.r,c.r*0.7,0,0,Math.PI*2);ctx.fill();c.x+=c.dx;c.y+=c.dy;c.dy+=0.03;if(c.y>canvas.height+20){c.y=-20;c.x=Math.random()*canvas.width}}); if(Date.now()<end) requestAnimationFrame(frame); else setTimeout(()=>ctx.clearRect(0,0,canvas.width,canvas.height),400)})();
}
