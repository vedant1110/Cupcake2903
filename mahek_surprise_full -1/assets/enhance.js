
// enhance.js - page transitions, music control, lightbox, popup helpers
(function(){
  // overlay for page transitions
  const overlay = document.createElement('div'); overlay.className='page-overlay'; document.body.appendChild(overlay);
  document.addEventListener('click', function(e){
    const a = e.target.closest('a');
    if(!a) return;
    const href = a.getAttribute('href');
    if(!href) return;
    if(href.startsWith('http') || href.startsWith('mailto') || href.startsWith('#')) return;
    e.preventDefault();
    overlay.classList.add('show');
    setTimeout(()=>{ window.location = href; }, 420);
  });

  // audio control
  const audio = document.createElement('audio'); audio.id='bgMusic'; audio.loop=true; audio.src='assets/music.mp3'; audio.preload='none';
  document.body.appendChild(audio);
  const btn = document.createElement('button'); btn.className='music-control'; btn.id='musicBtn'; btn.textContent='Play music';
  document.body.appendChild(btn);
  btn.addEventListener('click', ()=>{
    if(audio.paused){ audio.play().catch(()=>{}); btn.textContent='Pause music'; }
    else { audio.pause(); btn.textContent='Play music'; }
  });

  // lightbox for gallery images
  const lb = document.createElement('div'); lb.className='lightbox'; lb.id='lightbox'; lb.innerHTML='<img id=\"lightbox-img\" src=\"\">'; document.body.appendChild(lb);
  lb.addEventListener('click', ()=>{ lb.classList.remove('show'); document.getElementById('lightbox-img').src=''; });
  document.addEventListener('click', function(e){
    const img = e.target.closest('.gallery img');
    if(!img) return;
    e.preventDefault();
    document.getElementById('lightbox-img').src = img.src;
    lb.classList.add('show');
  });

  // popup helper
  window.showPopup = function(htmlContent){
    let p = document.getElementById('global-popup');
    if(!p){
      p = document.createElement('div'); p.id='global-popup'; p.className='popup'; document.body.appendChild(p);
    }
    p.innerHTML = htmlContent + '<div style="text-align:right;margin-top:12px"><button class="big-btn" onclick="closePopup()">Close</button></div>';
    setTimeout(()=>p.classList.add('show'),20);
  }
  window.closePopup = function(){ const p = document.getElementById('global-popup'); if(p){p.classList.remove('show'); setTimeout(()=>p.remove(),400);} };

  // start hearts by default
  if(typeof startHearts === 'function'){ try{ startHearts(); }catch(e){} }
})();
