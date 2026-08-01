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
"Doctor Strange in the Multiverse of Madness",
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


let done =
localStorage.getItem(id)==="true";


let favourite =
favorites.includes(id);



let div=document.createElement("div");


div.className="mission";


div.innerHTML=`

<input type="checkbox"
${done?"checked":""}
onclick="toggle('${id}')">


<span class="${done?"done":""}">
${item}
</span>


<button onclick="fav('${id}')">
${favourite?"⭐":"☆"}
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


}else{


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


let parts=id.split("-");


let name =
missions[parts[0]]
.items[parts[1]];


let p =
document.createElement("p");


p.innerText =
"⭐ "+name;


box.appendChild(p);


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
localStorage.getItem(
g+"-"+i
)==="true";



if(done){

completed++;

}



if(group.type==="Film"){


filmTotal++;


if(done)
filmDone++;


}else{


serieTotal++;


if(done)
serieDone++;


}



});


});



let percent =
Math.round(
(completed/total)*100
)
||0;



let bar =
document.getElementById("bar");


if(bar)
bar.style.width =
percent+"%";



let percentBox =
document.getElementById("percent");


if(percentBox)
percentBox.innerText =
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
rank;



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




function addMission(){


let name =
prompt("Nuova missione MCU");


if(name){


missions[0]
.items
.push(name);


save();

render();


}


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
document.getElementById("suggestion");


if(box)

box.innerText =
"JARVIS consiglia: "+pick;


}





function renderBadges(){


let box =
document.getElementById("badgesList");


if(!box)return;



box.innerHTML = `

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





document
.querySelectorAll("nav button")
.forEach(button=>{


button.onclick=function(){


document
.querySelectorAll(".page")
.forEach(page=>{

page.classList.remove("active");

});



document
.getElementById(button.dataset.page)
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
