const B=[];Object.keys(DATA).forEach(c=>DATA[c].forEach(o=>B.push([o.name,o.year,o.end||0,c,o.lon,o.lat,o.victor,o.nations,o.casualties,o.equipment,o.reason,o.place,0,o.cas||0,o.when||'',o.note||''])));
// ---- Era backgrounds: weapons and technology of each period (drawn as inline SVG) ----
const K='#2a1c14';
const ERAS=[[500,'ancient'],[1000,'early'],[1300,'high'],[1499,'late'],[1799,'gun'],[1899,'rifle'],[1e9,'modern']];
function eraOf(y){for(const e of ERAS)if(y<=e[0])return e[1];return 'modern'}
function sv(inner,sky){return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMax slice">'+(sky?'<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+sky[0]+'"/><stop offset="1" stop-color="'+sky[1]+'"/></linearGradient></defs><rect width="1200" height="600" fill="url(#g)"/>':'')+inner+'</svg>'}
function L(x1,y1,x2,y2,w,c){return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+(c||K)+'" stroke-width="'+(w||3)+'" stroke-linecap="round"/>'}
function Ci(x,y,r,f,st){return '<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+f+'"'+(st?' stroke="'+K+'" stroke-width="'+st+'"':'')+'/>'}
function Rc(x,y,w,h,f,r){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" fill="'+f+'"'+(r?' rx="'+r+'"':'')+'/>'}
function Pa(d,f,st){return '<path d="'+d+'" fill="'+f+'"'+(st?' stroke="'+K+'" stroke-width="'+st+'"':'')+'/>'}
function Sm(x,y,r){return '<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="#8d8d8d" opacity=".5"/>'}
function Sun(x,y,r){return '<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="#f6e2b3" opacity=".8"/>'}
const GROUND=Rc(0,520,1200,80,K);
// 500 BCE - 500 CE: phalanx spears, hoplite shields, legion shields and standards (drawn over the legion picture)
function sAncient(){let s=GROUND;
 for(let i=0;i<40;i++){const x=15+i*30,h=(i*47)%50;
  s+=L(x,120+h,x+12,520,3)+Pa('M'+(x-4)+' '+(132+h)+'L'+x+' '+(104+h)+'L'+(x+4)+' '+(132+h)+'Z',K)+Ci(x+4,488,21,i%2?'#8a3a1f':'#a8872e',3)+Pa('M'+(x-9)+' 462a13 13 0 0 1 26 0z',K)}
 for(let k=0;k<4;k++){const x=150+k*300;s+=L(x,200,x,520,4)+Rc(x-18,235,36,26,'#a32a1f')+Ci(x,214,9,'#e0b64a',2)+Pa('M'+(x-26)+' 212q26-26 52 0q-26-6-52 0z','#e0b64a')}
 return sv(s)}
// 500 - 1000: shield wall, spears, swords, pennants
function sEarly(){let s=Sun(950,140,55)+GROUND;
 for(let i=0;i<22;i++){const x=30+i*55,h=(i*29)%60;s+=L(x+10,170+h,x+22,520,3)+Pa('M'+(x+4)+' '+(190+h)+'L'+(x+10)+' '+(160+h)+'L'+(x+16)+' '+(190+h)+'Z',K)}
 for(let i=0;i<22;i++){const x=30+i*55;s+=Ci(x+25,480,34,['#8a3a1f','#c9a227','#2f5d8a','#e8dcc0'][i%4],3)+Ci(x+25,480,9,'#6b6b6b',2)}
 for(let k=0;k<5;k++){const x=110+k*240;s+=L(x,430,x+30,290,6)+L(x,430,x+30,290,3,'#d9d4c7')+L(x-12,408,x+18,400,5)+L(x+200,440,x+200,250,3)+Pa('M'+(x+200)+' 252l60 14-60 26z',['#a32a1f','#2f5d8a'][k%2])}
 return sv(s,['#e9b878','#f7e7c4'])}
// 1000 - 1300: castle, mounted knights with lances and kite shields
function sHigh(){let s=Sun(200,130,50)+GROUND+Rc(820,250,120,250,K)+Rc(960,300,100,200,K)+Rc(1080,230,90,270,K)+Rc(880,200,60,60,K);
 for(let i=0;i<5;i++)s+=Rc(820+i*26,236,14,16,K);for(let i=0;i<4;i++)s+=Rc(1080+i*24,216,12,16,K);
 s+=L(1125,230,1125,150,3)+Pa('M1125 150l50 14-50 14z','#a32a1f');
 for(let k=0;k<4;k++){const x=120+k*190;
  s+='<ellipse cx="'+x+'" cy="450" rx="62" ry="28" fill="'+K+'"/>'+L(x-40,470,x-48,520,7)+L(x-14,470,x-12,520,7)+L(x+22,470,x+30,520,7)+L(x+48,470,x+60,515,7)+Pa('M'+(x+45)+' 440l22-45 22 12-14 40z',K)+Rc(x-9,375,18,58,K,4)+Ci(x,364,11,K)+L(x+8,400,x+160,372,5)+Pa('M'+(x+160)+' 372l-4-12 40 14-40 10z','#a32a1f')+Pa('M'+(x-16)+' 385l16-6v34l-8 12-8-12z','#c9a227',2)}
 return sv(s,['#eebd7e','#fbeacc'])}
// 1300 - 1500: longbow volleys, bombard cannon, pikes, castle walls
function sLate(){let s=Sun(1000,120,50)+GROUND;
 for(let i=0;i<46;i++){const x0=60+(i*23)%420,x1=x0+300+(i*37)%380,pk=70+(i*41)%120;s+='<path d="M'+x0+' 470Q'+((x0+x1)/2)+' '+pk+' '+x1+' 500" fill="none" stroke="'+K+'" stroke-width="1.6" opacity=".7"/>'}
 for(let i=0;i<12;i++){const x=50+i*40;s+=Rc(x,440,14,62,K,3)+Ci(x+7,430,9,K)+'<path d="M'+(x+16)+' 410q24 34 0 70" fill="none" stroke="'+K+'" stroke-width="3"/>'+L(x+16,410,x+16,480,1.5)}
 s+=Rc(560,455,170,22,K,8)+Rc(540,470,230,14,'#6b4a2b')+Ci(590,505,24,K)+Ci(700,505,24,K)+Ci(590,505,8,'#d8c8a0')+Ci(700,505,8,'#d8c8a0')+Sm(745,440,16)+Sm(770,415,22)+Sm(805,385,28);
 s+=Rc(880,330,320,190,K);for(let i=0;i<10;i++)s+=Rc(880+i*34,314,20,18,K);s+=Rc(1100,250,90,270,K);
 for(let i=0;i<9;i++){const x=790+i*10;s+=L(x,170,x+2,500,2)}
 return sv(s,['#dba46b','#f4e2bd'])}
// 1500 - 1800: muskets with bayonets, cannons, smoke, flags
function lineSoldiers(hat,rifleLen,bayonet){let s='';for(let i=0;i<26;i++){const x=20+i*46;s+=Rc(x,445,16,58,K,3)+Ci(x+8,434,9,K)+hat(x)+L(x+18,470,x+24,470-rifleLen,3)+(bayonet?Pa('M'+(x+21)+' '+(478-rifleLen)+'l3-24 3 24z',K):'')}return s}
function cannon(x){return '<g transform="rotate(-8 '+x+' 480)">'+Rc(x-10,468,140,26,K,12)+'</g>'+Ci(x+20,508,28,K)+Ci(x+20,508,10,'#d8c8a0')+L(x+20,480,x+20,536,2,'#d8c8a0')+L(x-8,508,x+48,508,2,'#d8c8a0')}
function sGun(){let s=GROUND;for(let i=0;i<5;i++)s+=Sm(300+i*40,430-i*30,26+i*8);
 s+=lineSoldiers(x=>Pa('M'+(x-6)+' 432l14-18 14 18z',K),120,true)+cannon(260)+cannon(820);
 for(let f=0;f<3;f++){const x=200+f*400;s+=L(x,420,x,200,4)+Pa('M'+x+' 205l90 16-90 30z',['#a32a1f','#2f5d8a','#e8dcc0'][f],2)}
 return sv(s,['#9db0c4','#e7dcc4'])}
// 1800 - 1900: rifles, shakos, cavalry sabres, field artillery
function sRifle(){let s=GROUND;for(let i=0;i<5;i++)s+=Sm(150+i*45,430-i*28,26+i*8);
 s+=lineSoldiers(x=>Rc(x-1,414,18,18,K),140,false)+cannon(520);
 for(let k=0;k<3;k++){const x=720+k*150;s+='<ellipse cx="'+x+'" cy="455" rx="52" ry="24" fill="'+K+'"/>'+L(x-34,472,x-42,520,6)+L(x+30,472,x+40,520,6)+Pa('M'+(x+38)+' 445l18-38 18 10-10 34z',K)+Rc(x-8,385,16,52,K,4)+Ci(x,374,10,K)+'<path d="M'+(x+8)+' 400q60-70 90-60" fill="none" stroke="#d9d4c7" stroke-width="4"/>'}
 return sv(s,['#b9a98b','#efe3c9'])}
// 1900 - 2000+: tanks, fighter jets, bombers, helmeted infantry
function tank(x,y,sc){return '<g transform="translate('+x+' '+y+') scale('+sc+')">'+Rc(-70,-22,140,24,K,6)+'<rect x="-82" y="-4" width="164" height="34" rx="17" fill="'+K+'"/>'+[-58,-29,0,29,58].map(a=>Ci(a,13,10,'#d8c8a0')).join('')+Rc(-34,-48,66,28,K,8)+Rc(20,-40,90,8,K,3)+'</g>'}
function jet(x,y,sc,fl){return '<g transform="translate('+x+' '+y+') scale('+(fl?-sc:sc)+' '+sc+')">'+Pa('M-60 0L40 -6L70 0L40 6Z',K)+Pa('M-6 0L-34 -38L-18 -38L22 0Z',K)+Pa('M-6 0L-34 38L-18 38L22 0Z',K)+Pa('M-56 0L-72 -18L-62 -18L-44 0Z',K)+'</g>'}
function bomber(x,y,sc){return '<g transform="translate('+x+' '+y+') scale('+sc+')"><ellipse cx="0" cy="0" rx="100" ry="9" fill="'+K+'"/>'+Rc(-14,-86,28,172,K,6)+Rc(-96,-28,18,56,K,4)+[-60,-34,34,60].map(a=>'<ellipse cx="8" cy="'+a+'" rx="16" ry="5" fill="'+K+'"/>').join('')+'</g>'}
function sModern(){let s=GROUND;
 for(let i=0;i<4;i++)s+='<ellipse cx="'+(120+i*300)+'" cy="480" rx="30" ry="14" fill="#6f6f6f" opacity=".45"/>'+Sm(130+i*300,420-i*10,30)+Sm(150+i*300,370-i*10,38);
 s+=tank(250,500,1.15)+tank(640,500,1.3)+tank(1010,500,1.05)+jet(300,150,1.1)+jet(720,105,.9)+jet(1000,210,1,true)+jet(520,240,.7)+bomber(860,60,.7);
 for(let i=0;i<16;i++){const x=40+i*72;s+=Rc(x,462,12,40,K,3)+'<path d="M'+(x-2)+' 458a8 8 0 0 1 16 0z" fill="'+K+'"/>'+L(x+12,478,x+30,456,3)}
 return sv(s,['#8fa5b8','#d9dfe2'])}
const SCENES={early:sEarly,high:sHigh,late:sLate,gun:sGun,rifle:sRifle,modern:sModern};
const _eraCache={};
function eraUri(svg){return 'url("data:image/svg+xml,'+encodeURIComponent(svg)+'")'}
function setEra(b){const e=eraOf(b[1]);
 if(!_eraCache[e])_eraCache[e]=e==='ancient'?eraUri(sAncient())+', var(--legion)':eraUri(SCENES[e]());
 const bg=document.getElementById('bg');bg.style.backgroundImage=_eraCache[e];bg.style.backgroundPosition='center bottom';bg.classList.add('on')}
const $=id=>document.getElementById(id),cs=$('cs'),ct=$('ct'),cp=$('cp'),yi=$('yi');
const fy=y=>y<0?-y+' BCE':y+' CE';
const yrs=b=>b[14]||(b[2]?fy(b[1])+' – '+fy(b[2]):fy(b[1]));
const css=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const HL=()=>matchMedia('(prefers-color-scheme: dark)').matches?'#7a3a2e':'#e3b3a6';
const norm=s=>s.toLowerCase().replace(/[^a-z]/g,'');
const ALIAS={czechia:['czechrep','czechrepublic'],unitedstates:['unitedstatesofamerica','usa'],unitedkingdom:['uk'],russia:['russianfederation'],turkey:['turkiye']};
const CONT={Greece:'Europe',Italy:'Europe',Germany:'Europe',France:'Europe',Spain:'Europe',Czechia:'Europe',Belgium:'Europe',Russia:'Europe','United Kingdom':'Europe',India:'Asia',Iraq:'Asia',Lebanon:'Asia',Palestine:'Asia',Syria:'Asia',Iran:'Asia',Egypt:'Africa',Tajikistan:'Asia',Uzbekistan:'Asia',Pakistan:'Asia',Cyprus:'Asia',Algeria:'Africa',Libya:'Africa',Israel:'Asia',Yemen:'Asia',Switzerland:'Europe',Austria:'Europe',Hungary:'Europe',Croatia:'Europe',Morocco:'Africa',Bulgaria:'Europe',Armenia:'Asia',Netherlands:'Europe',Romania:'Europe',Serbia:'Europe',Slovenia:'Europe',Denmark:'Europe',Norway:'Europe',Canada:'North America',Guadeloupe:'North America',Luxembourg:'Europe',Myanmar:'Asia',Malaysia:'Asia',Singapore:'Asia',Philippines:'Asia',Indonesia:'Asia',Mongolia:'Asia',China:'Asia',Japan:'Asia',Australia:'Oceania',Vietnam:'Asia',"Solomon Islands":'Oceania',"Papua New Guinea":'Oceania',Kiribati:'Oceania',"Marshall Islands":'Oceania',Palau:'Oceania',Belarus:'Europe',Lithuania:'Europe',Latvia:'Europe',Estonia:'Europe',Ukraine:'Europe',Poland:'Europe',Slovakia:'Europe',Moldova:'Europe',Jordan:'Asia',Japan:'Asia',Vietnam:'Asia',Tunisia:'Africa'};
const CV={Africa:[[20,2],2.3],Asia:[[90,35],1.8],Europe:[[15,52],3.4],'North America':[[-100,45],2.1],'South America':[[-60,-15],2.5],Oceania:[[140,-25],2.8]};
// Kashmir region (J&K and Ladakh as shown on Indian maps): approximate outline
const KM=[[73.3,34.0],[72.9,34.7],[72.7,35.5],[71.6,36.6],[72.8,37.0],[74.5,37.1],[75.9,36.8],[76.8,36.0],[77.8,35.5],[79.0,36.0],[80.3,35.4],[79.9,34.4],[80.1,33.3],[79.4,32.7],[78.7,32.5],[78.6,33.1],[77.9,32.9],[77.4,33.0],[76.7,33.1],[75.9,32.9],[75.3,32.5],[74.6,32.6],[74.0,32.5],[73.5,33.0]];
let chart=null,names=[],ok=false;
try{names=echarts.getMap('world').geoJson.features.map(f=>f.properties.name);ok=true}catch(e){$('map').innerHTML='<p style="padding:20px">Map data could not be loaded.</p>'}
const KN='Kashmir (India)';let MAPN='world',KOK=false;
if(ok){try{
 const src=echarts.getMap('world').geoJson,sc=src.UTF8Scale||1024;
 const dp=(c,o)=>{let px=o[0],py=o[1];const r=[];for(let i=0;i<c.length;i+=2){let x=c.charCodeAt(i)-64,y=c.charCodeAt(i+1)-64;x=(x>>1)^(-(x&1));y=(y>>1)^(-(y&1));x+=px;y+=py;px=x;py=y;r.push([x/sc,y/sc])}return r};
 const dc=(c,o)=>typeof c==='string'?dp(c,o):c;
 const feats=src.features.map(f=>{const g=f.geometry;let co=g.coordinates;if(g.encodeOffsets){co=g.type==='Polygon'?co.map((c,i)=>dc(c,g.encodeOffsets[i])):co.map((p,i)=>p.map((c,j)=>dc(c,g.encodeOffsets[i][j])))}return {type:'Feature',id:f.id,properties:f.properties,geometry:{type:g.type,coordinates:co}}});
 if(!feats.every(f=>{const g=f.geometry,ring=g.type==='Polygon'?g.coordinates[0]:g.coordinates[0][0];return ring&&ring.every(p=>isFinite(p[0])&&isFinite(p[1])&&Math.abs(p[0])<=180.5&&Math.abs(p[1])<=90.5)}))throw 0;
 feats.push({type:'Feature',id:'KMR',properties:{name:KN},geometry:{type:'Polygon',coordinates:[[[73.3,34.0],[72.9,34.7],[72.7,35.5],[71.6,36.6],[72.8,37.0],[74.5,37.1],[75.9,36.8],[76.8,36.0],[77.8,35.5],[79.0,36.0],[80.3,35.4],[79.9,34.4],[80.1,33.3],[79.4,32.7],[78.9,32.0],[77.8,31.8],[76.3,31.9],[75.6,32.2],[74.9,32.6],[74.4,32.8],[73.9,33.0],[73.4,33.3],[73.3,34.0]]]}});
 echarts.registerMap('world2',{type:'FeatureCollection',features:feats});MAPN='world2'
}catch(e){}}
const byN={};names.forEach(n=>byN[norm(n)]=n);
B.forEach(b=>{const k=norm(b[3]);let m=byN[k];(ALIAS[k]||[]).forEach(a=>{if(!m&&byN[a])m=byN[a]});if(m)b[3]=m});
B.forEach(b=>{const k=norm(b[3]);b[12]=k==='turkey'?((b[4]<29.0&&b[5]>=40.9)||(b[4]<26.9&&b[5]>=39.9)?'Europe':'Asia'):k.startsWith('unitedstates')?((b[4]<-170||b[4]>100)&&b[5]<50?'Oceania':'North America'):(CONT[b[3]]||CONT[Object.keys(ALIAS).find(a=>(ALIAS[a]||[]).includes(k))]||'Europe')});
const all=[...new Set(names.concat(B.map(b=>b[3])))].sort((a,b)=>a.localeCompare(b));
$('cl').innerHTML=all.map(n=>`<option value="${n}">`).join('');
const INDIA=all.find(n=>norm(n)==='india')||'India';
function pick(){const v=norm(cs.value);return v?(all.find(n=>norm(n)===v)||null):''}
let HITS=[],SZ=[];
const symFn=(v,p)=>SZ[p.dataIndex]||8;
function sizesFor(z){const px=(chart?chart.getWidth():800)/360*z;return HITS.map((b,i)=>{let d=1e9;HITS.forEach((o,j)=>{if(i!==j)d=Math.min(d,Math.hypot(b[4]-o[4],b[5]-o[5]))});return Math.max(4,Math.min(13,d*px*0.9))})}
function resizeDots(){if(!chart)return;const g=chart.getOption().geo[0];SZ=sizesFor(g.zoom||1);chart.setOption({series:(KOK?[{},{symbolSize:symFn}]:[{},{},{symbolSize:symFn}])})}
function ensure(){if(chart||!ok)return;chart=echarts.init($('map'));try{chart.setOption({geo:{map:MAPN}});KOK=MAPN==='world2'&&!!chart.getModel().getComponent('geo').coordinateSystem.getRegion(KN)}catch(e){KOK=false}if(!KOK&&MAPN!=='world'){MAPN='world';chart.setOption({geo:{map:'world'}})}chart.on('georoam',resizeDots);
 chart.on('click',p=>{
  if(p.componentType==='series'&&p.data&&p.data.bi!==undefined){setEra(B[p.data.bi]);let k=$('b'+p.data.bi);if(!k&&inWar){selWar=warOf(B[p.data.bi]);mapWar=selWar;render();k=$('b'+p.data.bi)}if(k){const box=$('cards');box.querySelectorAll('.on').forEach(x=>x.classList.remove('on'));box.prepend(k);k.classList.add('on');box.scrollIntoView({behavior:'smooth',block:'start'})}return}
  const n=p.seriesType==='custom'?INDIA:(p.componentType==='geo'?(p.name===KN?INDIA:p.name):null);
  if(n){cs.value=n;setContinent(n);render()}})}
function regionBox(r){
 try{
  const gs=(r.geometries||[]).map(g=>{let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;(g.exterior||[]).forEach(p=>{x0=Math.min(x0,p[0]);x1=Math.max(x1,p[0]);y0=Math.min(y0,p[1]);y1=Math.max(y1,p[1])});return{x0,x1,y0,y1,a:(x1-x0)*(y1-y0)}}).filter(g=>isFinite(g.a)&&g.a>0);
  if(gs.length){const m=gs.reduce((p,c)=>c.a>p.a?c:p),mx=(m.x0+m.x1)/2,my=(m.y0+m.y1)/2;
   const k=gs.filter(g=>g.a>=m.a*0.05&&Math.hypot((g.x0+g.x1)/2-mx,(g.y0+g.y1)/2-my)<35);
   const X0=Math.min(...k.map(g=>g.x0)),X1=Math.max(...k.map(g=>g.x1)),Y0=Math.min(...k.map(g=>g.y0)),Y1=Math.max(...k.map(g=>g.y1));
   return{x:X0,y:Y0,width:X1-X0,height:Y1-Y0}}
 }catch(e){}
 return r.getBoundingRect()}
function draw(c,scope,hits,fit){
 ensure();if(!chart)return;chart.resize();
 const pt=b=>({name:b[0],value:[b[4],b[5]],b,bi:B.indexOf(b)}),hl=HL(),land=css('--land');
 let center,zoom=1,fitDone=false;
 if(fit&&hits.length){const xs=hits.map(b=>b[4]),ys=hits.map(b=>b[5]),x0=Math.min(...xs)-6,x1=Math.max(...xs)+6,y0=Math.min(...ys)-4,y1=Math.max(...ys)+4;center=[(x0+x1)/2,(y0+y1)/2];zoom=Math.max(1,Math.min(14,0.85*Math.min(300/(x1-x0+4),150/(y1-y0+4))));fitDone=true}
 if(fitDone){}else if(c){let r=null;try{r=chart.getModel().getComponent('geo').coordinateSystem.getRegion(c)}catch(e){}
  if(r){let bb=regionBox(r);if((bb.width>45||bb.height>35)&&scope.length){const xs=scope.map(b=>b[4]),ys=scope.map(b=>b[5]),x0=Math.min(...xs)-6,x1=Math.max(...xs)+6,y0=Math.min(...ys)-4,y1=Math.max(...ys)+4;if((x1-x0)*(y1-y0)<bb.width*bb.height)bb={x:x0,y:y0,width:x1-x0,height:y1-y0}}center=[bb.x+bb.width/2,bb.y+bb.height/2];zoom=Math.max(1,Math.min(14,0.85*Math.min(300/(bb.width+4),150/(bb.height+4))))}
  else if(scope.length){center=[scope[0][4],scope[0][5]];zoom=4}}
 else if(ct.value){center=CV[ct.value][0];zoom=CV[ct.value][1]}
 else{try{const gc=chart.getModel().getComponent('geo').coordinateSystem,zc=chart.getOption().geo[0].zoom||1,p1=gc.dataToPoint([-180,0]),p2=gc.dataToPoint([180,0]),w0=Math.abs(p2[0]-p1[0])/zc;zoom=Math.max(1,Math.min(1.6,chart.getWidth()/w0*0.98))}catch(e){zoom=1.15}}
 const isIn=c===INDIA;HITS=hits;SZ=sizesFor(zoom);
 chart.setOption({backgroundColor:css('--sea'),
  tooltip:{trigger:'item',formatter:p=>p.data&&p.data.b?'<b>'+p.name+'</b><br>'+yrs(p.data.b)+'<br>'+p.data.b[11]:(p.name===KN?INDIA:p.name)},
  geo:{map:MAPN,roam:true,center:center,zoom:zoom,itemStyle:{areaColor:land,borderColor:css('--line'),borderWidth:.6},emphasis:{label:{show:false},itemStyle:{areaColor:land}},regions:(KOK?[{name:KN,itemStyle:{areaColor:isIn?hl:land,borderColor:isIn?hl:land},emphasis:{itemStyle:{areaColor:isIn?hl:land,borderColor:isIn?hl:land}}}]:[]).concat(c?[{name:c,itemStyle:{areaColor:hl}}]:[])},
  series:[
   ...(KOK?[]:[{type:'custom',coordinateSystem:'geo',z:1,data:[{name:INDIA,value:[77,34]}],renderItem:(p,api)=>({type:'polygon',shape:{points:KM.map(q=>api.coord(q))},style:{fill:isIn?hl:land,stroke:isIn?hl:land,lineWidth:1}})}]),
   {type:'scatter',coordinateSystem:'geo',symbolSize:7,itemStyle:{color:css('--mut'),opacity:.6},data:[]},
   {type:'scatter',coordinateSystem:'geo',symbolSize:symFn,cursor:'pointer',itemStyle:{color:css('--acc')},label:{show:false},data:hits.map(pt)}]},true)}
function render(){
 const c=pick(),y=getRange();$('ye').textContent='';
 if(y==='bad'||y==='none'){const a=+cp.value;$('ye').textContent='Invalid input';$('status').textContent=y==='none'?'Invalid input: select a century first.':'Invalid input: the year must be between '+lab(a)+' and '+lab(a+100)+'.';$('cards').innerHTML='';$('bg').classList.remove('on');draw(c||'',[],[]);return}
 if(c===null){$('status').textContent='No country matches “'+cs.value+'”. Pick one from the list.';return}
 const scope=B.filter(b=>(!c||b[3]===c)&&(c||!ct.value||b[12]===ct.value));
 const idle=!c&&!ct.value&&y===null;let list=idle?[]:scope.filter(b=>y===null||(b[1]<=y[1]&&(b[2]||b[1])>=y[0])).sort((a,b)=>a[1]-b[1]);let hits=(c&&y===null)?list.slice().sort((a,b)=>b[13]-a[13]).slice(0,TOP):list;
 const warMode=!idle&&y!==null&&y[0]!==y[1];inWar=warMode;
 const key=[c,ct.value,cp.value,yi.value].join('|');if(key!==wkey){selWar='';mapWar='';wkey=key;$('bg').classList.remove('on')}
 let groups=null;
 if(warMode){groups={};list.forEach(b=>{const w=warOf(b);(groups[w]=groups[w]||[]).push(b)});if(selWar&&groups[selWar]){list=groups[selWar];mapWar=selWar}else{selWar='';mapWar=''}hits=list}
 $('status').textContent=idle?'Select a country, continent or year to see battles.':(list.length?list.length+' battle'+(list.length>1?'s':''):'No battles in the dataset')+' · '+(c||ct.value||'all countries')+' · '+(y===null?'all time':y[0]===y[1]?lab(y[0]):lab(y[0])+' – '+lab(y[1]))+(c&&y===null?' · map marks the top '+TOP+' by casualties':'');
 if(warMode){const gk=Object.keys(groups).length;$('status').textContent=(selWar?selWar+' · '+list.length+' battle'+(list.length>1?'s':''):gk+' war'+(gk===1?'':'s')+' and campaigns')+' · '+(c||ct.value||'all countries')+' · '+lab(y[0])+' – '+lab(y[1])+(selWar?'':' · select one to see its battles')}
 $('cards').innerHTML=(warMode&&!selWar)?warCards(groups):(warMode?'<button class="btn" id="wback">← All wars in this period</button>':'')+list.map(b=>`<article class="bc" id="b${B.indexOf(b)}"><h3>${b[0]}</h3><dl>
 <dt>Year</dt><dd>${yrs(b)}</dd><dt>Place</dt><dd>${b[11]}, ${b[3]}</dd><dt>Nations involved</dt><dd>${b[7]}</dd>
 <dt>Victor</dt><dd>${b[6]}</dd><dt>Casualties</dt><dd>${b[8]}</dd><dt>Equipment used &amp; lost</dt><dd>${b[9]}</dd><dt>Reason</dt><dd>${b[10]}</dd>${b[15]?'<dt>Aftermath &amp; source</dt><dd>'+b[15]+'</dd>':''}</dl><a class="wk" href="${wk(b)}" target="_blank" rel="noopener noreferrer">Read about this battle on Wikipedia ↗</a></article>`).join('');
 let mh=hits,msc=idle?[]:scope;if(mapWar){mh=B.filter(b=>warOf(b)===mapWar);msc=mh;$('status').textContent+=' · map: all '+mh.length+' battle'+(mh.length>1?'s':'')+' of '+mapWar}
 draw(c,msc,mh,!!mapWar)}
const WO={'Marathon':'First Persian invasion of Greece (492–490 BCE)','Thermopylae':'Second Persian invasion of Greece (480–479 BCE)','Salamis':'Second Persian invasion of Greece (480–479 BCE)','Cannae':'Second Punic War (218–201 BCE)','Zama':'Second Punic War (218–201 BCE)','Teutoburg Forest':'Roman expansion under Augustus','Adrianople':'Gothic War (376–382 CE)','Hastings':'Norman Conquest of England (1066)','Agincourt':'Hundred Years’ War (1337–1453)','Gettysburg':'American Civil War (1861–1865)','Tsushima':'Russo-Japanese War (1904–1905)','Verdun':'World War I (1914–1918)','Dien Bien Phu':'First Indochina War (1946–1954)','Stalingrad':'Eastern Front of World War II (1941–1945)','Normandy (D-Day)':'Western Front of World War II (1939–1945)','Midway':'Pacific War (1941–1945)','Battle of Khalkhin Gol (earlier conflict)':'Soviet–Japanese border war (1939)'};
let selWar='',wkey='',inWar=false,mapWar='';
function warOf(b){if(b[16]!==undefined)return b[16];let w=WO[b[0]]||'';
 if(!w){const m=/^Context: (.*?)\.(?:\s|$)/.exec(b[15]||'');if(m)w=m[1].replace(/^the /,'')}
 if(!w){const y=b[1];if(/Carthag/.test(b[7])&&/Rom/.test(b[7])&&y>=-264&&y<=-241)w='First Punic War (264–241 BCE)';else if(/^Third Punic War|^Destruction of Carthage/.test(b[0]))w='Third Punic War (149–146 BCE)';else if(y>=-334&&y<=-326&&/Alexander|Macedonian/.test(b[7]))w='Alexander’s conquest of the Persian Empire (334–326 BCE)'}
 if(!w)w=b[0];w=w.charAt(0).toUpperCase()+w.slice(1);b[16]=w;return w}
function warCards(g){return Object.keys(g).sort((a,b)=>g[a][0][1]-g[b][0][1]).map(k=>{const L=g[k],y0=Math.min(...L.map(b=>b[1])),y1=Math.max(...L.map(b=>b[2]||b[1]));return '<button class="wcard" data-w="'+encodeURIComponent(k)+'"><h3>'+k+'</h3><small>'+L.length+' battle'+(L.length>1?'s':'')+' · '+(y0===y1?lab(y0):lab(y0)+' – '+lab(y1))+'</small></button>'}).join('')}
$('cards').addEventListener('click',e=>{const t=e.target.closest('[data-w]');if(t){selWar=decodeURIComponent(t.dataset.w);mapWar=selWar;render();$('cards').scrollIntoView({behavior:'smooth',block:'start'});return}if(e.target.closest('#wback')){selWar='';mapWar='';render()}});
$('cards').addEventListener('click',e=>{const a=e.target.closest('.bc');if(!a||e.target.closest('a'))return;setEra(B[+a.id.slice(1)]);const w=warOf(B[+a.id.slice(1)]);mapWar=mapWar===w?'':w;render();const el=$(a.id);if(el)el.classList.add('on')});
function setContinent(c){if(!c)return;const cnt={};B.forEach(b=>{if(b[3]===c)cnt[b[12]]=(cnt[b[12]]||0)+1});let best=Object.keys(cnt).sort((a,b)=>cnt[b]-cnt[a])[0];
 if(!best){try{ensure();const bb=chart.getModel().getComponent('geo').coordinateSystem.getRegion(c).getBoundingRect(),cx=bb.x+bb.width/2,cy=bb.y+bb.height/2;let d=1e9;for(const k in CV){const v=Math.hypot(cx-CV[k][0][0],cy-CV[k][0][1]);if(v<d){d=v;best=k}}}catch(e){}}
 if(best)ct.value=best}
function wk(b){return 'https://en.wikipedia.org/w/index.php?search='+encodeURIComponent(/battle|siege|war|operation|clash|campaign|conflict|fighting/i.test(b[0])?b[0]:b[0]+' battle')}
function zoomBy(f){ensure();if(!chart)return;const g=chart.getOption().geo[0];chart.setOption({geo:{zoom:Math.max(1,Math.min(25,(g.zoom||1)*f))}});resizeDots()}
cs.addEventListener('input',()=>{if(!cs.value||pick()){if(cs.value)setContinent(pick());render()}});cs.addEventListener('change',()=>{if(pick())setContinent(pick());render()});
ct.onchange=()=>{cs.value='';render()};
const lab=a=>a<0?-a+' BCE':a===0?'1 CE':String(a);
cp.innerHTML='<option value="">All time</option>'+Array.from({length:26},(_,i)=>-500+i*100).map(a=>`<option value="${a}">${lab(a)} – ${lab(a+100)}</option>`).join('');
function getRange(){if(cp.value==='')return yi.value.trim()===''?null:'none';const a=+cp.value,v=yi.value.trim();if(v!==''){const n=Number(v);if(!Number.isInteger(n)||n<a||n>a+100)return 'bad';return [n,n]}return [a,a+100]}
cp.onchange=()=>{yi.value='';render()};yi.oninput=render;
$('zi').onclick=()=>zoomBy(1.4);$('zo').onclick=()=>zoomBy(1/1.4);
$('rs').onclick=()=>{cs.value='';ct.value='';cp.value='';yi.value='';render()};
window.addEventListener('resize',()=>chart&&chart.resize());
matchMedia('(prefers-color-scheme: dark)').addEventListener('change',()=>{if(!$('battles').classList.contains('hide'))render()});
function go(v){document.querySelector('header').classList.toggle('hide',v!=='battles');if(v!=='battles')$('bg').classList.remove('on');$('home').classList.toggle('hide',v==='battles');$('battles').classList.toggle('hide',v!=='battles');location.hash=v;if(v==='battles')render()}
function route(){go(location.hash==='#battles'?'battles':'')}
$('stb').textContent=B.length.toLocaleString();$('stc').textContent=new Set(B.map(b=>b[3])).size;$('sty').textContent=fy(Math.min(...B.map(b=>b[1])))+' – '+fy(Math.max(...B.map(b=>b[1])));
window.addEventListener('hashchange',route);route();
