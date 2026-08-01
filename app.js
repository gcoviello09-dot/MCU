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
type:"Serie/Film",
items:[
"Loki",
"What If…?",
"WandaVision",
"Shang-Chi",
"The Falcon and the Winter Soldier",
"Eternals",
"Spider-Man No Way Home",
"Doctor Strange Multiverse of Madness",
"Hawkeye",
"Moon Knight",
"I Am Groot",
"She-Hulk",
"Ms Marvel",
"Thor Love and Thunder",
"Werewolf by Night",
"Black Panther Wakanda Forever",
"Guardians Holiday Special",
"Ant-Man Quantumania",
"Secret Invasion",
"Guardians of the Galaxy Vol.3",
"The Marvels",
"Echo",
"Deadpool & Wolverine",
"Agatha All Along",
"Jessica Jones",
"Luke Cage",
"Iron Fist",
"The Defenders",
"The Punisher",
"Captain America: Brave New World",
"Thunderbolts*",
"Daredevil: Born Again",
"Ironheart",
"Spider-Man: Brand New Day",
"Wonder Man"
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


if(search &&
!item.toLowerCase().includes(search))
return;



let id =
g+"-"+i;



let done =
localStorage.getItem(id)==="true";



let fav =
favorites.includes(id);



let div =
document.createElement("div");



div.className="mission";



div.innerHTML=`

<input type="checkbox"
${done?"checked":""}
onclick="toggle('${id}')">


<span class="${done?"done":""}"
onclick="openCard(${g},${i})">

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


let parts =
id.split("-");


let name =
missions[parts[0]].items[parts[1]];


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

let serieTotal=0;


let filmDone=0;

let serieDone=0;



missions.forEach((group,g)=>{


group.items.forEach((item,i)=>{


total++;



let checked =
localStorage.getItem(g+"-"+i)==="true";



if(checked){

done++;

}



if(group.type==="Film"){


filmTotal++;


if(checked)
filmDone++;


}else{


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



let completed=0;



Object.keys(localStorage).forEach(key=>{


if(
key.includes("-") &&
localStorage.getItem(key)==="true"
)

completed++;


});



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
}


];



badges.forEach(badge=>{


let div =
document.createElement("div");



if(completed>=badge.unlock){


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



document.getElementById("cardType").innerText =
"🎬 Tipo: "+group.type;



let status =
localStorage.getItem(g+"-"+i)==="true"
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
