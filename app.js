let defaultMissions = [

{
saga:"Infinity Saga",
items:[
"Iron Man (2008)",
"The Incredible Hulk (2008)",
"Iron Man 2 (2010)",
"Thor (2011)",
"Avengers (2012)",
"Captain America: The First Avenger (2011)",
"Iron Man 3 (2013)",
"Thor: The Dark World (2013)",
"Captain America: The Winter Soldier (2014)",
"Guardians of the Galaxy (2014)",
"Avengers: Age of Ultron (2015)",
"Ant-Man (2015)",
"Captain America: Civil War (2016)",
"Black Panther (2018)",
"Doctor Strange (2016)",
"Thor: Ragnarok (2017)",
"Guardians of the Galaxy Vol.2 (2017)",
"Spider-Man: Homecoming (2017)",
"Ant-Man and The Wasp (2018)",
"Avengers: Infinity War (2018)",
"Avengers: Endgame (2019)",
"Spider-Man: Far From Home (2019)",
"Spider-Man: No Way Home (2021)",
"Thor: Love and Thunder (2022)",
"Black Panther: Wakanda Forever (2022)"
]
},

{
saga:"Multiverse Saga",
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
items:[
"Wonder Man",
"Vision Quest"
]
}

];


let missions =
JSON.parse(localStorage.getItem("missions"))
||
defaultMissions;



let favorites =
JSON.parse(localStorage.getItem("favorites"))
||
[];



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

list.innerHTML="";


let search =
document.getElementById("search")?.value.toLowerCase()
||
"";


let total=0;
let done=0;



missions.forEach((group,g)=>{


let title=document.createElement("h2");

title.className="saga-title";

title.innerText=group.saga;

list.appendChild(title);



group.items.forEach((item,i)=>{


let id=g+"-"+i;


total++;


let checked=
localStorage.getItem(id)==="true";

if(checked)
done++;


if(search &&
!item.toLowerCase().includes(search))
return;



let fav=
favorites.includes(id);



let div=document.createElement("div");

div.className="mission";


div.innerHTML=

`

<input type="checkbox"
${checked?"checked":""}
onclick="toggle('${id}')">


<span class="${checked?"done":""}">
${item}
</span>


<button onclick="favorite('${id}')">
${fav?"⭐":"☆"}
</button>

`;



list.appendChild(div);


});


});



let percent=Math.round((done/total)*100);



document.getElementById("counter").innerText=
done+" / "+total;



document.getElementById("percent").innerText=
percent+"%";


document.getElementById("bar").style.width=
percent+"%";



let rank="RECRUIT";

if(percent>=25)
rank="AVENGER CANDIDATE";

if(percent>=50)
rank="AVENGER";

if(percent>=75)
rank="GUARDIAN OF THE MULTIVERSE";

if(percent==100)
rank="MASTER OF MCU";


document.getElementById("rank").innerText=
rank;


renderBadges();


}



function toggle(id){

let value=
localStorage.getItem(id)==="true";


localStorage.setItem(id,!value);

render();

}



function favorite(id){

if(favorites.includes(id)){

favorites=favorites.filter(x=>x!==id);

}else{

favorites.push(id);

}

save();

render();

}



function addMission(){

let name=
prompt("Nuova missione MCU");


if(name){


missions[0].items.push(name);

save();

render();

}

}



function renderBadges(){


let box=document.getElementById("badgesList");

if(!box)return;


let completed=0;


missions.forEach((g,x)=>{

g.items.forEach((m,i)=>{

if(localStorage.getItem(x+"-"+i)==="true")
completed++;

});

});


box.innerHTML="";


let badges=[

["🏆 First Avenger", completed>=1],

["🛡 Avengers Initiative", completed>=10],

["💎 Infinity Survivor", completed>=25],

["🌌 Multiverse Explorer", completed>=40]

];



badges.forEach(b=>{


let div=document.createElement("div");

div.className=
"badge "+(b[1]?"unlocked":"");


div.innerText=
b[0];


box.appendChild(div);


});


}



function resetProgress(){

if(confirm("Reset completo?")){

localStorage.clear();

location.reload();

}

}




document.querySelectorAll(".tab")
.forEach(btn=>{


btn.onclick=function(){


document.querySelectorAll(".tab")
.forEach(x=>x.classList.remove("active"));


document.querySelectorAll(".page")
.forEach(x=>x.classList.remove("active"));


btn.classList.add("active");


document
.getElementById(btn.dataset.page)
.classList.add("active");


}


});



document
.getElementById("search")
?.addEventListener(
"input",
render
);



render();
