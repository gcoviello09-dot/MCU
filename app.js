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
