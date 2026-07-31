const defaultMissions = [

{
title:"The Infinity Saga",
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
"Guardians of the Galaxy Vol. 2 (2017)",
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
title:"The Multiverse Saga",
items:[
"Loki",
"What If...?",
"WandaVision",
"Shang-Chi and the Legend of the Ten Rings",
"The Falcon and the Winter Soldier",
"Eternals",
"Doctor Strange in the Multiverse of Madness",
"Hawkeye",
"Moon Knight",
"I Am Groot",
"She-Hulk",
"Ms. Marvel",
"Werewolf by Night",
"Guardians of the Galaxy Holiday Special",
"Ant-Man and The Wasp: Quantumania",
"Secret Invasion",
"Guardians of the Galaxy Vol. 3",
"The Marvels",
"Echo",
"Deadpool & Wolverine",
"Agatha All Along",
"Daredevil: Born Again",
"Ironheart",
"Captain America: Brave New World",
"Thunderbolts",
"Jessica Jones",
"Luke Cage",
"Iron Fist",
"The Defenders",
"The Punisher"
]
},

{
title:"Coming Soon",
items:[
"Wonder Man",
"Vision Quest"
]
}

];


let missions =
JSON.parse(localStorage.getItem("MCUmissions"))
|| defaultMissions;



function render(){

const container=document.getElementById("missions");

container.innerHTML="";

let total=0;
let done=0;


missions.forEach((section,s)=>{


let title=document.createElement("h2");
title.innerText=section.title;
container.appendChild(title);



section.items.forEach((item,i)=>{

total++;

let id=s+"-"+i;

let checked=
localStorage.getItem(id)==="true";


if(checked) done++;


let div=document.createElement("div");

div.className="mission";


div.innerHTML=`

<input type="checkbox"
${checked?"checked":""}
onclick="toggle('${id}')">

<span class="${checked?"done":""}">
${item}
</span>

`;


container.appendChild(div);


});


});


let percent=Math.round((done/total)*100);

document.getElementById("counter").innerText=
`MISSION STATUS: ${done}/${total}`;

document.getElementById("percent").innerText=
percent+"%";

document.getElementById("bar").style.width=
percent+"%";


}



function toggle(id){

let value=
localStorage.getItem(id)==="true";

localStorage.setItem(id,!value);

render();

}



function addMission(){

let name=
prompt("New MCU Mission:");

if(name){

missions[0].items.push(name);

localStorage.setItem(
"MCUmissions",
JSON.stringify(missions)
);

render();

}

}


render();
