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
JSON.parse(localStorage.getItem("customMissions"))
||
defaultMissions;
function render(){


let box=document.getElementById("missions");

box.innerHTML="";


let total=0;

let done=0;



missions.forEach((group,g)=>{


let title=document.createElement("h2");

title.innerText=group.saga;

box.appendChild(title);



group.items.forEach((mission,i)=>{


let id=g+"-"+i;


total++;


let checked=
localStorage.getItem(id)==="true";



if(checked){

done++;

}



let div=document.createElement("div");

div.className="mission";


div.innerHTML=`

<input type="checkbox"
${checked?"checked":""}
onclick="toggle('${id}')">


<span class="${checked?"done":""}">

${mission}

</span>

`;



box.appendChild(div);



});


});



let percent=Math.round((done/total)*100);



document.getElementById("counter").innerText=

`MISSION STATUS: ${done}/${total}`;



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
rank="MASTER OF THE MCU";



document.getElementById("rank").innerText=

"RANK: "+rank;


}




function toggle(id){

let value=

localStorage.getItem(id)==="true";


localStorage.setItem(id,!value);


render();

}




function addMission(){


let newMission=

prompt("New MCU Mission");


if(newMission){


missions[0].items.push(newMission);

localStorage.setItem(
"customMissions",
JSON.stringify(missions)
);

render();


}

}



render();
