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
type:"Serie/Film",
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
type:"Future",
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


let list=document.getElementById("missionsList");

if(list){

list.innerHTML="";


let search =
document.getElementById("search")?.value.toLowerCase()
||"";


missions.forEach((group,g)=>{


let title=document.createElement("h2");

title.innerText=group.saga;

list.appendChild(title);



group.items.forEach((item,i)=>{


if(search &&
!item.toLowerCase().includes(search))
return;



let id=g+"-"+i;


let done=
localStorage.getItem(id)==="true";


let fav=
favorites.includes(id);



let div=document.createElement("div");

div.className="mission";


div.innerHTML=

`

<input type="checkbox"
${done?"checked":""}
onclick="toggle('${id}')">


<span class="${done?"done":""}">
${item}
</span>


<button onclick="fav('${id}')">

${fav?"⭐":"☆"}

</button>

`;

list.appendChild(div);



});

});


}




updateStats();

renderFavorites();

renderBadges();


}





function toggle(id){

localStorage.setItem(
id,
!(localStorage.getItem(id)==="true")
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

let box=document.getElementById("favoritesList");

if(!box)return;


box.innerHTML="";


favorites.forEach(id=>{


let parts=id.split("-");

let name=
missions[parts[0]].items[parts[1]];


let p=document.createElement("p");

p.innerText="⭐ "+name;


box.appendChild(p);


});


}





function updateStats(){

let total=0;
let done=0;


missions.forEach((g)=>{

g.items.forEach((m)=>{

total++;

let index=missions
.flatMap(x=>x.items)
.indexOf(m);


});

});



let keys=
Object.keys(localStorage);


keys.forEach(k=>{

if(k.includes("-") &&
localStorage.getItem(k)==="true")
done++;

});



let percent=
Math.round(done/total*100)
||0;



let bar=document.getElementById("bar");

if(bar)
bar.style.width=percent+"%";


let p=document.getElementById("percent");

if(p)
p.innerText=percent+"%";



let counter=document.getElementById("counter");

if(counter)
counter.innerText=
done+" / "+total;



let rank="RECRUIT";


if(percent>=25)
rank="AVENGER";


if(percent>=50)
rank="SUPER HERO";


if(percent>=75)
rank="GUARDIAN";


if(percent==100)
rank="MASTER OF MCU";


let r=document.getElementById("rank");

if(r)
r.innerText=rank;



let c=document.getElementById("completion");

if(c)
c.innerText=
"Completamento: "+percent+"%";


}




function addMission(){

let name=
prompt("Nuova missione");


if(name){

missions[0].items.push(name);

save();

render();

}

}




function randomMission(){

let all=[];


missions.forEach(g=>{

g.items.forEach(i=>all.push(i));

});


let pick=
all[Math.floor(Math.random()*all.length)];


document.getElementById("suggestion")
.innerText=
"JARVIS consiglia: "+pick;

}




function renderBadges(){

let box=document.getElementById("badgesList");

if(!box)return;


box.innerHTML=

`
<div class="badge">
🏆 First Mission
</div>

<div class="badge">
💎 Infinity Survivor
</div>

<div class="badge">
🌌 Multiverse Explorer
</div>
`;

}




document.querySelectorAll("nav button")
.forEach(btn=>{


btn.onclick=function(){


document.querySelectorAll(".page")
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
