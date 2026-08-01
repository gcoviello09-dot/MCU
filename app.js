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
saga:"Coming Soon",
type:"Futuro",
items:[
"Vision Quest",
"Avengers: Doomsday"
]
}

];



const DATABASE_VERSION = 2;


let savedVersion =
localStorage.getItem("databaseVersion");


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
JSON.parse(localStorage.getItem("missions"))
|| defaultMissions;


}

let completed =
JSON.parse(localStorage.getItem("completed"))
|| [];



let favorites =
JSON.parse(localStorage.getItem("favorites"))
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


if(search &&
!item.toLowerCase().includes(search))
return;



let done =
completed.includes(item);



let fav =
favorites.includes(item);



let div =
document.createElement("div");



div.className="mission";



div.innerHTML=`

<input type="checkbox"
${done?"checked":""}
onclick="toggle('${item}')">


<span class="${done?"done":""}"
onclick="openCard(${g},${i})">

${item}

</span>


<button onclick="fav('${item}')">

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

if(completed.includes(id)){

completed =
completed.filter(x=>x!==id);

}else{

completed.push(id);

}

save();

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



favorites.forEach(name=>{


let p =
document.createElement("p");



p.innerText =
"⭐ "+name;



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
prompt("Nuova missione");


if(name){


missions[0].items.push(name);


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
all[Math.floor(Math.random()*all.length)];



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
}


];



badges.forEach(badge=>{


let div =
document.createElement("div");



if(completed.length >= badge.unlock){


div.className="badge unlocked";


div.innerText =
badge.name+" ✅";


}else{


div.className="badge locked";


div.innerText =
badge.name+" 🔒";


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
document.getElementById("missionCard");



if(!card)return;



document.getElementById("cardTitle").innerText =
title;



document.getElementById("cardSaga").innerText =
"🧬 Saga: "+group.saga;



let data =
missionData[title];



if(data){


document.getElementById("cardType").innerText =
"🎬 Tipo: "+data.tipo;


}else{


document.getElementById("cardType").innerText =
"🎬 Tipo: "+group.type;


}




let status =
completed.includes(title)

?

"✅ Missione completata"

:

"⏳ Missione da completare";



document.getElementById("cardStatus").innerText =
status;



card.style.display="flex";


}





function closeCard(){


let card =
document.getElementById("missionCard");


if(card)

card.style.display="none";


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
