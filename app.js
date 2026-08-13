let defaultMissions = [

{
saga:"Infinity Saga",
type:"Film",
items:[
"Captain America: The First Avenger",
"Captain Marvel",
"Iron Man",
"Iron Man 2",
"The Incredible Hulk",
"Thor",
"Avengers",
"Iron Man 3",
"Thor: The Dark World",
"Captain America: The Winter Soldier",
"Guardians of the Galaxy",
"Guardians of the Galaxy Vol. 2",
"Avengers: Age of Ultron",
"Ant-Man",
"Captain America: Civil War",
"Black Widow",
"Spider-Man Homecoming",
"Black Panther",
"Doctor Strange",
"Thor Ragnarok",
"Ant-Man and The Wasp",
"Avengers Infinity War",
"Avengers Endgame",
"Spider-Man Far From Home"
]
},

{
saga:"Multiverse Saga",
type:"Serie",
items:[
"Loki",
"What If…?",
"WandaVision",
"The Falcon and the Winter Soldier",
"Hawkeye",
"Moon Knight",
"I Am Groot",
"She-Hulk",
"Ms Marvel",
"Secret Invasion",
"Echo",
"Agatha All Along",
"Jessica Jones",
"Luke Cage",
"Iron Fist",
"The Defenders",
"The Punisher",
"Daredevil: Born Again",
"Ironheart",
"Wonder Man"
]
},

{
saga:"Multiverse Saga",
type:"Film",
items:[
"Shang-Chi",
"Eternals",
"Spider-Man No Way Home",
"Doctor Strange Multiverse of Madness",
"Thor Love and Thunder",
"Black Panther Wakanda Forever",
"Ant-Man Quantumania",
"Guardians of the Galaxy Vol.3",
"The Marvels",
"Deadpool & Wolverine",
"Captain America: Brave New World",
"Thunderbolts*",
"Spider-Man: Brand New Day"
]
},

{
saga:"Special",
type:"Special",
items:[
"Werewolf by Night",
"Guardians Holiday Special"
]
},

{
saga:"X-Men Universe",
type:"Film",
items:[
"X-Men",
"X2",
"X-Men: The Last Stand",
"X-Men Origins: Wolverine",
"X-Men: First Class",
"The Wolverine",
"X-Men: Days of Future Past",
"Deadpool",
"X-Men: Apocalypse",
"Logan",
"Deadpool 2",
"Dark Phoenix",
"The New Mutants"
]
},

{
saga:"Coming Soon",
type:"Futuro",
items:[
"Vision Quest",
"Avengers: Doomsday"
]
}

];

const DATABASE_VERSION = 3;

let savedVersion =
localStorage.getItem(
"databaseVersion"
);

let missions;

if(savedVersion != DATABASE_VERSION){

missions = defaultMissions;

localStorage.setItem(
"missions",
JSON.stringify(missions)
);

localStorage.setItem(
"databaseVersion",
DATABASE_VERSION
);

}else{

missions =
JSON.parse(
localStorage.getItem(
"missions"
))
|| defaultMissions;

}

let completed =
JSON.parse(
localStorage.getItem(
"completed"
))
|| [];

let favorites =
JSON.parse(
localStorage.getItem(
"favorites"
))
|| [];

function save(){

localStorage.setItem(
"missions",
JSON.stringify(missions)
);

localStorage.setItem(
"completed",
JSON.stringify(completed)
);

localStorage.setItem(
"favorites",
JSON.stringify(favorites)
);

}
function render(){

let list =
document.getElementById(
"missionsList"
);

if(!list)
return;

list.innerHTML="";

let search =
document.getElementById(
"search"
)?.value.toLowerCase()
|| "";

missions.forEach((group,g)=>{

let title =
document.createElement("h2");

title.innerText =
group.saga +
" • " +
group.type;

list.appendChild(title);

group.items.forEach((item,i)=>{

if(
search &&
!item.toLowerCase()
.includes(search)
)
return;

let done =
completed.includes(item);

let favorite =
favorites.includes(item);

let div =
document.createElement("div");

div.className =
"mission";

div.innerHTML = `

<input
type="checkbox"
${done ? "checked" : ""}
onclick="toggle('${item}')">

<span
class="${done ? "done" : ""}"
onclick="openCard(${g},${i})">

${item}

</span>

<button
onclick="fav('${item}')">

${favorite ? "⭐" : "☆"}

</button>

<button
onclick="deleteMission(${g},${i})">

🗑️

</button>

`;

list.appendChild(div);

});

});

updateStats();

renderFavorites();

renderBadges();

}

function toggle(id){

if(
completed.includes(id)
){

completed =
completed.filter(
x => x !== id
);

}else{

completed.push(id);

}

save();

render();

}

function fav(id){

if(
favorites.includes(id)
){

favorites =
favorites.filter(
x => x !== id
);

}else{

favorites.push(id);

}

save();

render();

}

function deleteMission(g,i){

let name =
missions[g].items[i];

if(
confirm(
"Eliminare " +
name +
"?"
)
){

completed =
completed.filter(
x => x !== name
);

favorites =
favorites.filter(
x => x !== name
);

missions[g]
.items
.splice(i,1);

save();

render();

}

}

function renderFavorites(){

let box =
document.getElementById(
"favoritesList"
);

if(!box)
return;

box.innerHTML="";

favorites.forEach(name=>{

let p =
document.createElement("p");

p.innerText =
"⭐ " + name;

box.appendChild(p);

});

}
function updateStats(){

let total=0;
let done=0;

let filmTotal=0;
let filmDone=0;

let serieTotal=0;
let serieDone=0;

missions.forEach(group=>{

group.items.forEach(item=>{

total++;

let checked =
completed.includes(item);

if(checked)
done++;

if(group.type==="Film"){

filmTotal++;

if(checked)
filmDone++;

}

if(group.type==="Serie"){

serieTotal++;

if(checked)
serieDone++;

}

});

});

let percent =
Math.round(done/total*100)
||0;

document.getElementById(
"bar"
).style.width =
percent+"%";

document.getElementById(
"percent"
).innerText =
percent+"%";

document.getElementById(
"counter"
).innerText =
done+" / "+total;

let rank =
"RECRUIT";

if(percent>=25)
rank="AVENGER";

if(percent>=50)
rank="SUPER HERO";

if(percent>=75)
rank="GUARDIAN";

if(percent===100)
rank="MASTER OF MCU";

document.getElementById(
"rank"
).innerText =
rank;

document.getElementById(
"movies"
).innerText =
"🎬 Film completati: "
+
filmDone
+
" / "
+
filmTotal;

document.getElementById(
"series"
).innerText =
"📺 Serie completate: "
+
serieDone
+
" / "
+
serieTotal;

document.getElementById(
"completion"
).innerText =
"⚡ Universo completato: "
+
percent
+
"%";

}

function addMission(){

let name =
prompt(
"Nome della missione:"
);

if(!name)
return;

let saga =
prompt(
"Saga:\n\nInfinity Saga\nMultiverse Saga\nSpecial\nX-Men Universe\nComing Soon"
);

if(!saga)
return;

let type =
prompt(
"Tipo:\n\nFilm\nSerie\nSpecial\nFuturo"
);

if(!type)
return;

let groupIndex =
missions.findIndex(
g =>
g.saga===saga &&
g.type===type
);

if(groupIndex===-1){

missions.push({

saga:saga,
type:type,
items:[]

});

groupIndex =
missions.length-1;

}

let group =
missions[groupIndex];

let position =
prompt(

"Inserisci la posizione da 1 a "
+
(group.items.length+1)

);

position =
parseInt(position);

if(
isNaN(position)
||
position<1
){

position=1;

}

if(
position>
group.items.length+1
){

position=
group.items.length+1;

}

group.items.splice(

position-1,
0,
name

);

save();

render();

}
function randomMission(){

let all=[];

missions.forEach(group=>{

group.items.forEach(item=>{

all.push(item);

});

});

let pick =
all[
Math.floor(
Math.random()*all.length
)
];

let box =
document.getElementById(
"suggestion"
);

if(box){

box.innerText =
"🤖 JARVIS consiglia: "
+
pick;

}

}

function renderBadges(){

let box =
document.getElementById(
"badgesList"
);

if(!box)
return;

box.innerHTML="";

let badges=[

{
name:"🏆 First Mission",
unlock:1
},

{
name:"💎 Infinity Survivor",
unlock:10
},

{
name:"🌌 Multiverse Explorer",
unlock:25
},

{
name:"⚡ Stark Level",
unlock:50
},

{
name:"🧪 Mutant Hunter",
unlock:75
},

{
name:"👑 Master of the Multiverse",
unlock:100
}

];

badges.forEach(badge=>{

let div =
document.createElement("div");

if(
completed.length
>=
badge.unlock
){

div.className =
"badge unlocked";

div.innerText =
badge.name
+
" ✅";

}else{

div.className =
"badge locked";

div.innerText =
badge.name
+
" 🔒";

}

box.appendChild(div);

});

}

function openCard(g,i){

let group =
missions[g];

let title =
group.items[i];

let card =
document.getElementById(
"missionCard"
);

if(!card)
return;

document.getElementById(
"cardTitle"
).innerText =
title;

document.getElementById(
"cardSaga"
).innerText =
"🧬 Saga: "
+
group.saga;

let data =
missionData[title];

if(data){

document.getElementById(
"cardType"
).innerText =
"🎬 Tipo: "
+
data.tipo;

}else{

document.getElementById(
"cardType"
).innerText =
"🎬 Tipo: "
+
group.type;

}

document.getElementById(
"cardStatus"
).innerText =

completed.includes(title)

?

"✅ Missione completata"

:

"⏳ Missione da completare";

card.style.display =
"flex";

}

function closeCard(){

let card =
document.getElementById(
"missionCard"
);

if(card){

card.style.display =
"none";

}

}

document
.querySelectorAll(
"nav button"
)
.forEach(btn=>{

btn.onclick=function(){

document
.querySelectorAll(
".page"
)
.forEach(p=>
p.classList.remove(
"active"
)
);

document
.getElementById(
btn.dataset.page
)
.classList.add(
"active"
);

};

});

document
.getElementById(
"search"
)
?.addEventListener(
"input",
render
);

render();
