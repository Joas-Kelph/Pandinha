// ---- Listas de fotos: edite aqui para trocar nomes/quantidade ----
const FOTOS_DELE=Array.from({length:6},(_,i)=>`pandinha-0${i+1}.jpg`);
const $=s=>document.querySelector(s);

// corações/milhos flutuando
const fl=$('#fl');['🌽','💛','🐼','🥚','✨','💛'].forEach((e,i)=>{for(let k=0;k<2;k++){const s=document.createElement('span');s.textContent=e;s.style.left=(Math.random()*95)+'%';s.style.fontSize=(1+Math.random()*1.2)+'rem';s.style.animationDuration=(14+Math.random()*14)+'s';s.style.animationDelay=(-Math.random()*20)+'s';fl.appendChild(s)}});

// entrada
$('#enter').onclick=()=>{const m=$('#main');m.classList.add('on');setTimeout(()=>m.scrollIntoView({behavior:'smooth'}),50)};
$('#up').onclick=()=>$('#topo').scrollIntoView({behavior:'smooth'});

// galeria de cuscuz (ilustrações)
const legendas=[['O concorrente que eu preciso respeitar.','Cuscuz com ovo frito'],['A felicidade servida no prato.','Cuscuz nordestino tradicional'],['O amor pode até ser complicado, mas cuscuz com ovo nunca decepciona.','Cuscuz com manteiga'],['Se felicidade tivesse cheiro, seria o de um cuscuz quentinho.','Quentinho, recém-saído da cuscuzeira'],['Em qualquer apresentação, ele vence. Eu só peço um pedacinho.','Cuscuz com ovo em outro prato']];

// espaços de fotos
function slots(id,lista,tit,ic){const el=$('#'+id);el.innerHTML=lista.map((f,i)=>`<button class="slot" data-i="${i}" aria-label="${tit} ${i+1}: escolher foto"><span><b>${ic}</b>Nossa próxima lembrança vai ficar aqui<br><small>${f}</small></span></button>`).join('');
el.querySelectorAll('.slot').forEach((b,i)=>{const im=new Image();im.alt=tit+' '+(i+1);im.onload=()=>b.appendChild(im);im.src=lista[i];b.onclick=()=>{pickTarget=[el,i];fi.multiple=false;fi.click()}})}
const fi=$('#file');let pickTarget=null;
slots('ele',FOTOS_DELE,'Foto dele','📷');
function put(el,i,file){const b=el.querySelectorAll('.slot')[i];if(!b||!file)return;b.querySelector('img')?.remove();const im=new Image();im.alt='Foto escolhida';im.src=URL.createObjectURL(file);b.appendChild(im)}
document.querySelectorAll('[data-pick]').forEach(b=>b.onclick=()=>{pickTarget=[$('#'+b.dataset.pick),-1];fi.multiple=true;fi.click()});
fi.onchange=()=>{if(!pickTarget)return;const[el,i]=pickTarget;const fs=[...fi.files];if(i>=0)put(el,i,fs[0]);else{const free=[...el.querySelectorAll('.slot')].map((b,k)=>b.querySelector('img')?null:k).filter(k=>k!==null);fs.forEach((f,n)=>put(el,free[n]??n,f))}fi.value=''};

// revelar ao rolar
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll('.rev').forEach(e=>io.observe(e));

// botão surpresa
let n=0;$('#surp').onclick=()=>{n++;$('#msg').classList.add('show');$('#cnt').textContent=n;$('#hearts').textContent='💛'.repeat(Math.min(n,60))};
