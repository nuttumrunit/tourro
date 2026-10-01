const boot=document.querySelector('#boot');
window.addEventListener('load',()=>setTimeout(()=>boot.classList.add('hide'),650));

const notice=document.querySelector('#notice');
let noticeTimer;
function notify(message){notice.textContent=message;notice.classList.add('show');clearTimeout(noticeTimer);noticeTimer=setTimeout(()=>notice.classList.remove('show'),4200)}

const TOKEN_MINT='';
const caValue=document.querySelector('#ca-value');
const copyCA=document.querySelector('#copy-ca');
if(/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(TOKEN_MINT)){caValue.textContent=TOKEN_MINT;copyCA.disabled=false;copyCA.textContent='COPY MINT';copyCA.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(TOKEN_MINT);copyCA.textContent='COPIED';notify('Official mint address copied.');setTimeout(()=>copyCA.textContent='COPY MINT',1800)}catch{notify('Copy failed. Select the address manually.')}})}

const wallet=document.querySelector('#wallet');
const walletText=wallet.querySelector('span');
let connectedAddress='';
function getProvider(){return window.phantom&&window.phantom.solana||window.solana||null}
function shortAddress(address){return address.slice(0,6)+'...'+address.slice(-4)}
function syncWallet(publicKey){connectedAddress=publicKey&&publicKey.toString()||'';walletText.textContent=connectedAddress?shortAddress(connectedAddress):'CONNECT WALLET';wallet.classList.toggle('connected',Boolean(connectedAddress));wallet.title=connectedAddress||'Connect a Solana wallet'}
function bindProvider(provider){if(!provider||provider.__tourroBound||!provider.on)return;provider.__tourroBound=true;provider.on('connect',syncWallet);provider.on('disconnect',()=>syncWallet(null));provider.on('accountChanged',syncWallet)}
async function connect(){const provider=getProvider();if(!provider){notify('No Solana wallet detected. Install Phantom or another compatible browser wallet.');return}bindProvider(provider);walletText.textContent='CONNECTING...';try{const response=await provider.connect();syncWallet(response.publicKey||provider.publicKey);notify('Solana wallet connected.')}catch(error){syncWallet(null);notify(error.message||'Wallet connection was cancelled.')}}
wallet.addEventListener('click',connect);
setTimeout(async()=>{const provider=getProvider();if(provider){bindProvider(provider);try{const response=await provider.connect({onlyIfTrusted:true});syncWallet(response.publicKey||provider.publicKey)}catch{}}},100);
const agents=[...document.querySelectorAll('.agent')];
const toast=document.querySelector('#toast');
function easternTime(){return new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(new Date())+' ET'}
document.querySelectorAll('.log time,.toast b').forEach(time=>time.textContent=time.textContent+' ET');
document.querySelector('.console-bar span:last-child').textContent+=' / TIME: ET';
const notes={Manager:'MANAGER_01 is routing the next dependency',Brand:'BRAND_07 delivered identity system',Web:'WEB_12 submitted interactive preview',Copy:'COPY_03 is refining launch language',Human:'REVIEWER accepted visual consistency task',Audit:'AUDIT_09 verified 4 of 7 deliverables'};
agents.forEach(card=>card.addEventListener('click',()=>{agents.forEach(a=>a.classList.remove('active'));card.classList.add('active');toast.innerHTML='<b>'+easternTime()+'</b> '+notes[card.dataset.a]}));
const events=[['WEB_12 submitted preview',68],['REVIEWER accepted assignment',71],['AUDIT_09 verified artifact',76],['COPY_03 released unused budget',73],['MANAGER_01 opened final review',79]];
let eventIndex=0;
setInterval(()=>{const item=events[eventIndex++%events.length];toast.style.opacity=0;setTimeout(()=>{toast.innerHTML='<b>'+easternTime()+'</b> '+item[0];toast.style.opacity=1},220);document.querySelector('#percent').textContent=item[1]+'%';document.querySelector('#meter').style.width=item[1]+'%'},4200);

document.querySelector('#inspect').addEventListener('click',()=>document.querySelector('#protocol').scrollIntoView({behavior:'smooth'}));
const form=document.querySelector('#form');
const dialog=document.querySelector('#dialog');
form.addEventListener('submit',event=>{event.preventDefault();document.querySelector('#dialog-text').textContent=document.querySelector('#outcome').value.trim();document.querySelector('#dialog-budget').textContent=document.querySelector('#budget').value+' USDC maximum';document.querySelector('#dialog-deadline').textContent=document.querySelector('#deadline').value;dialog.showModal()});
document.querySelector('#close').addEventListener('click',()=>dialog.close());
document.querySelector('#dialog-wallet').addEventListener('click',connect);
dialog.addEventListener('click',event=>{const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&dialog.open)dialog.close()});
