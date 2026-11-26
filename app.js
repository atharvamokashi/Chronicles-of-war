const B=[];Object.keys(DATA).forEach(c=>DATA[c].forEach(o=>B.push([o.name,o.year,o.end||0,c,o.lon,o.lat,o.victor,o.nations,o.casualties,o.equipment,o.reason,o.place,0,o.cas||0,o.when||'',o.note||''])));
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
  if(p.componentType==='series'&&p.data&&p.data.bi!==undefined){let k=$('b'+p.data.bi);if(!k&&inWar){selWar=warOf(B[p.data.bi]);mapWar=selWar;render();k=$('b'+p.data.bi)}if(k){const box=$('cards');box.querySelectorAll('.on').forEach(x=>x.classList.remove('on'));box.prepend(k);k.classList.add('on');box.scrollIntoView({behavior:'smooth',block:'start'})}return}
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
 const rome=y!==null&&((norm(c)==='france'&&y[0]<=476&&y[1]>=-50)||(norm(c)==='italy'&&y[0]<=476&&y[1]>=-200));$('bg').classList.toggle('on',rome);
 const scope=B.filter(b=>(!c||b[3]===c)&&(c||!ct.value||b[12]===ct.value));
 const idle=!c&&!ct.value&&y===null;let list=idle?[]:scope.filter(b=>y===null||(b[1]<=y[1]&&(b[2]||b[1])>=y[0])).sort((a,b)=>a[1]-b[1]);let hits=(c&&y===null)?list.slice().sort((a,b)=>b[13]-a[13]).slice(0,TOP):list;
 const warMode=!idle&&y!==null&&y[0]!==y[1];inWar=warMode;
 const key=[c,ct.value,cp.value,yi.value].join('|');if(key!==wkey){selWar='';mapWar='';wkey=key}
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
$('cards').addEventListener('click',e=>{const a=e.target.closest('.bc');if(!a||e.target.closest('a'))return;const w=warOf(B[+a.id.slice(1)]);mapWar=mapWar===w?'':w;render();const el=$(a.id);if(el)el.classList.add('on')});
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
