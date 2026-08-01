let defaultMissions = [

{
saga:"Infinity Saga",
type:"Film",
items:[
"Iron Man",
"The Incredible Hulk",
"Iron Man 2",
"Thor",
"Avengers",
"Captain America: The First Avenger",
"Iron Man 3",
"Thor: The Dark World",
"Captain America: The Winter Soldier",
"Guardians of the Galaxy",
"Avengers: Age of Ultron",
"Ant-Man",
"Captain America: Civil War",
"Black Panther",
"Doctor Strange",
"Thor Ragnarok",
"Guardians of the Galaxy Vol.2",
"Spider-Man Homecoming",
"Ant-Man and The Wasp",
"Avengers Infinity War",
"Avengers Endgame",
"Spider-Man Far From Home",
"Spider-Man No Way Home",
"Thor Love and Thunder",
"Black Panther Wakanda Forever"
]
},

{
saga:"Multiverse Saga",
type:"Serie",
items:[
"Loki",
"What If...?",
"WandaVision",
"Shang-Chi",
"The Falcon and the Winter Soldier",
"Eternals",
"Doctor Strange Multiverse of Madness",
"Hawkeye",
"Moon Knight",
"I Am Groot",
"She-Hulk",
"Ms Marvel",
"Werewolf by Night",
"Guardians Holiday Special",
"Ant-Man Quantumania",
"Secret Invasion",
"Guardians of the Galaxy Vol.3",
"The Marvels",
"Echo",
"Deadpool & Wolverine",
"Agatha All Along",
"Daredevil Born Again",
"Ironheart",
"Captain America Brave New World",
"Thunderbolts",
"Jessica Jones",
"Luke Cage",
"Iron Fist",
"The Defenders",
"The Punisher"
]
},

{
saga:"Coming Soon",
type:"Futuro",
items:[
"Wonder Man",
"Vision Quest"
]
}

];


let missions =
JSON.parse(localStorage.getItem("missions"))
|| defaultMissions;


let favorites =
JSON.parse(localStorage.getItem("favorites"))
|| [];



function save(){

localStorage.setItem(
"missions",
JSON.stringify(missions)
);

localStorage.setItem(
"favorites",
JSON.stringify(favorites)
);

}



function render(){

let list =
document.getElementById("missionsList");


if(list){

list.innerHTML="";


let search =
document.getElementById("search")?.value.toLowerCase()
||"";


missions.forEach((group,g)=>{


let title =
document.createElement("h2");


title.innerText =
group.saga;


list.appendChild(title);



group.items.forEach((item,i)=>{


if(
search &&
!item.toLowerCase().includes(search)
)
return;



let id =
g+"-"+i;



let done =
localStorage.getItem(id)==="true";



let star =
favorites.includes(id);



let div =
document.createElement("div");

div.className="mission";



div.innerHTML=`

<input type="checkbox"
${done?"checked":""}>


<span class="${done?"done":""}">
${item}
</span>


<button>
${star?"⭐":"☆"}
</button>

`;



div.querySelector("input")
.onclick=function(e){

e.stopPropagation();

toggle(id);

};



div.querySelector("button")
.onclick=function(e){

e.stopPropagation();

fav(id);

};



div.onclick=function(){

openMission(g,i);

};



list.appendChild(div);


});


});


}


updateStats();

renderFavorites();

renderBadges();

}
function toggle(id){

let value =
localStorage.getItem(id)==="true";


localStorage.setItem(
id,
!value
);


render();

}




function fav(id){

if(favorites.includes(id)){

favorites =
favorites.filter(x=>x!==id);

}

else{

favorites.push(id);

}


save();

render();

}





function renderFavorites(){

let box =
document.getElementById("favoritesList");


if(!box)return;


box.innerHTML="";


favorites.forEach(id=>{


let p =
id.split("-");


let name =
missions[p[0]].items[p[1]];


let div =
document.createElement("p");


div.innerText =
"⭐ "+name;


box.appendChild(div);


});


}




function updateStats(){


let total=0;
let completed=0;

let filmTotal=0;
let serieTotal=0;

let filmDone=0;
let serieDone=0;



missions.forEach((group,g)=>{


group.items.forEach((item,i)=>{


total++;


let done =
localStorage.getItem(g+"-"+i)
==="true";



if(done)
completed++;



if(group.type==="Film"){

filmTotal++;

if(done)
filmDone++;

}

else{

serieTotal++;

if(done)
serieDone++;

}


});


});



let percent =
Math.round((completed/total)*100)
||0;



let bar =
document.getElementById("bar");


if(bar)
bar.style.width =
percent+"%";



let p =
document.getElementById("percent");


if(p)
p.innerText =
percent+"%";



let counter =
document.getElementById("counter");


if(counter)
counter.innerText =
completed+" / "+total;



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



let rankBox =
document.getElementById("rank");


if(rankBox)
rankBox.innerText =
"RANK: "+rank;



let movies =
document.getElementById("movies");


if(movies)
movies.innerText =
"🎬 Film completati: "
+filmDone+
" / "
+filmTotal;



let series =
document.getElementById("series");


if(series)
series.innerText =
"📺 Serie completate: "
+serieDone+
" / "
+serieTotal;



let completion =
document.getElementById("completion");


if(completion)
completion.innerText =
"⚡ Universo completato: "
+percent+"%";


}




function renderBadges(){


let box =
document.getElementById("badgesList");


if(!box)return;


let completed=0;


Object.keys(localStorage)
.forEach(key=>{

if(
key.includes("-") &&
localStorage.getItem(key)==="true"
)
completed++;


});



box.innerHTML="";



let badges=[

[
"🏆 First Mission",
completed>=1
],

[
"💎 Infinity Survivor",
completed>=10
],

[
"🌌 Multiverse Explorer",
completed>=25
],

[
"👑 Master of MCU",
completed>=55
]

];



badges.forEach(b=>{


let div =
document.createElement("div");


div.className =
"badge "+(b[1]?"unlocked":"");


div.innerText =
b[0]+
(b[1]?" ✅":" 🔒");



box.appendChild(div);


});


}




function openMission(g,i){


let modal =
document.getElementById("missionModal");


if(!modal)
return;



document.getElementById("modalTitle")
.innerText =
missions[g].items[i];



document.getElementById("modalInfo")
.innerText =

"Saga: "
+missions[g].saga+
"\nTipo: "
+missions[g].type+
"\nStato: "
+
(
localStorage.getItem(g+"-"+i)==="true"
?
"✅ Completato"
:
"⏳ Da completare"
);



modal.style.display="flex";


}




function closeMission(){

let modal =
document.getElementById("missionModal");


if(modal)
modal.style.display="none";


}





function addMission(){

let name =
prompt("Nuova missione MCU");


if(name){

missions[0].items.push(name);

save();

render();

}

}





function randomMission(){

let all=[];


missions.forEach(g=>{

g.items.forEach(x=>{

all.push(x);

});

});


let pick =
all[Math.floor(Math.random()*all.length)];


let box =
document.getElementById("suggestion");


if(box)
box.innerText =
"JARVIS consiglia: "+pick;


}





document
.querySelectorAll("nav button")
.forEach(btn=>{


btn.onclick=function(){


document
.querySelectorAll(".page")
.forEach(p=>p.classList.remove("active"));


document
.getElementById(btn.dataset.page)
.classList.add("active");


};


});



document
.getElementById("search")
?.addEventListener(
"input",
render
);



render();
