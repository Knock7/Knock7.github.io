/*Hello to anyone reading this! Yes I am new at this - please point out ways to do 
  anything better. If you want to add something, feel free. I will look at pushes to github
  and if I like them, I'll add them. Vanilla for now; I'll get to learing jquery at some point */



var Stuff = { //the production of materials of all kinds

	//add that the buildingwork ammount only gets added if there is at least one worker? or x per worker, x=5 seems good. that is each farmer can collect the passive bonus for 5 farms - can have some buildings with low passive and high worker output and some with high passive and low added worker output (like factories and hydro dams - each added worker only provides a small additional bonus compared to the 'passive' effect of the building)
	food:{ name:"Food", 	stored:100, 	maxstored:100, 	storebonus:1, unlocked:true,  color:"rgb(0,0,0)"},
	wood:{ name:"Wodd",		stored:100, 	maxstored:100, 	storebonus:1, unlocked:false, },
	rock:{ name:"Rock",		stored:20, 		maxstored:100, 	storebonus:1, unlocked:false, },
	lumber:{name:"Lumber",	stored:0, 		maxstored:0, 	storebonus:1, unlocked:false, },
	stone:{	name:"Stone",	stored:0, 		maxstored:0, 	storebonus:1, unlocked:false, },
	clay:{  name:"Clay",	stored:0,		maxstored:50,	storebonus:1, unlocked:false, },
	brick:{ name:"Brick",	stored:0,		maxstored:50,	storebonus:1, unlocked:false, },
	cu_ore:{name:"Copper Ore",stored:0,		maxstored:50,	storebonus:1, unlocked:false, },//decide where to store this maybe make small storage and need to smelt quickly?
	copper:{name:"Copper",	stored:0,		maxstored:50,	storebonus:1, unlocked:false, },
	tin: {	name:"Tin",		stored:0,		maxstored:0,	storebonus:1, unlocked:false, },
	lead:{  name:"Lead"},
	fe_ore:{name:"Iron Ore"},//Iron ore and coal make steel
	steel:{ name:"Steel"},
	mercury:{name:"Mercury"},
	silver:{name:"Silver"},
	bronze:{name:"Bronze",	stored:0,		maxstored:0,	storebonus:1, unlocked:false, },
	gold:{	name:"Gold",	stored:0,		maxstored:99999,storebonus:1, unlocked:false, },//no max on gold - don't display max and set arbitrarily high
	coal:{	name:"Coal",	stored:0,		maxstored:0,	storebonus:1, unlocked:false, },//use coal to improve smelting
	steel:{	name:"Steel"},
	zinc:{  name:"Zinc"},//unlock some metals as you make more mines - trade for others that you don't have in your area
	brass:{ name:"Brass"},

	research:{name:"Research",stored:0,		maxstored:0,	storebonus:1, unlocked:false, },//think about how this relates to the research object and maybe move it there? or make global variable?

	spear:{name:"Spears",	stored:0,		maxstored:5,	storebonus:1, unlocked:false },

	addResourceLine: function(res){
		Stuff[res]["unlocked"]=true;
		p = document.createElement("p");
		p.id = res+"Stuff";
		p.innerHTML = " "+ Stuff[res]["name"] + ": <span id='"+res+"'> "+ Stuff[res]["stored"] +" </span> / <span id='"+res+"Max' class='right'>"+Stuff[res]["maxstored"]+"</span></p>";
		
		document.getElementById("stuff").appendChild(p);

		document.getElementById(res).innnerHTML = Stuff[res]["stored"];
		

		if(res==="gold"||res==="research"){
			document.getElementById(res+"Max").innerHTML = "NoMax";
			console.log("research stored: "+Stuff[res]["stored"]);
		} else {
			document.getElementById(res+"Max").innnerHTML = Stuff[res]["maxstored"];
		}

	},	

	addSpecialLine: function(res){
		p = document.createElement("p");
		p.id = res+"Stuff";
		p.innerHTML = " "+ res.charAt(0).toUpperCase() + res.slice(1) + ": <span id='"+res+"'> "+ Stuff[res]["stored"] +" </span> / <span id='"+res+"Max' class='right'>"+Stuff[res]["maxstored"]+"</span></p>";
		
		document.getElementById("stuffSpecial").appendChild(p);

		document.getElementById(res).innnerHTML = Stuff[res]["stored"];
		

		if(res==="gold"||res==="research"){
			document.getElementById(res+"Max").innerHTML = "NoMax";
			console.log("research stored: "+Stuff[res]["stored"]);
		} else {
			document.getElementById(res+"Max").innnerHTML = Stuff[res]["maxstored"];
		}

	},
	/* Ideas for stuff to add
	cattle(special increment)
	gold:{workers:0, buildingwork:0, maxworkers:3, stored:0, maxstored:100, workbonus:1, storebonus:1, unlocked:0},
	marbles:{workers:0, buildingwork:0, maxworkers:0, stored:0, maxstored:100, workbonus:1, storebonus:1, unlocked:0},
	*/

};


var Jobs = {
	freeworker: {box: "camp", 		workers:1, maxworkers:1,					 unlocked:true   },//this gets skipped in incrRes()
	researcher: {box: "laboratory",	workers:0, maxworkers:0, 		workbonus:1, unlocked:false, make:{research:1}},//this gets skipped too
	hunter:		{box: "fields", 	workers:0, maxworkers:100, 		workbonus:1, unlocked:true,  make:{food:1}},
	woodcutter:	{box: "forest", 	workers:0, maxworkers:3, 		workbonus:1, unlocked:false, make:{wood:1}},
	rockcutter:	{box: "hillside", 	workers:0, maxworkers:1, 		workbonus:1, unlocked:false, make:{rock:1}},
	farmer:		{box: "fields", 	workers:0, maxworkers:0, 		workbonus:1, unlocked:false, make:{food:2}},
	millworker:	{box: "riverbank", 	workers:0, maxworkers:0, 		workbonus:1, unlocked:false, make:{lumber:1,wood:-.5}},
	mason:		{box: "workshops", 	workers:0, maxworkers:0, 		workbonus:1, unlocked:false, make:{stone:1,rock:-1.5}},
	miner:		{box: "hillside", 	workers:0, maxworkers:0, 		workbonus:1, unlocked:false, make:{cu_ore:.3}},//will add more metals (and lower copper output) with research
	kilnworker:	{box: "workshops",	workers:0, maxworkers:0,		workbonus:1, unlocked:false, make:{copper:.1,cu_ore:-.5}},//can treat kins specially later (dropdown menu to select which ore (or clay -> brick) and each kiln can do different thing)
	clayworker: {box: "riverbank",  workers:0, maxworkers:5,		workbonus:1, unlocked:false, make:{clay:2}},
	brickmaker: {box: "workshops",	workers:0, maxworkers:4,		workbonus:1, unlocked:false, make:{brick:1,clay:-1,wood:-2}},

	//change the mine building to some kind of expanding quarry
	//should there be different mines - how to organize? or one mine that makes many ores for starters - unlock more metals as you add mineshafts (rename current mineshaft)
	//one smelting factory that can handle a certain amount of several ores - new ores added by research and/or mines

	//after enough advancement, rename the jobBox and change image: camp -> settlement; workshops -> industrial zone
	
	incrRes:function (){ //increments resources from workers at their jobs (make another function to add passive building work - move 'buildingwork' to Buildings function and make it an object like 'make')
		for(var x in Jobs){
			if (Jobs[x]["unlocked"]){
				var make = true;
				var make2 = false;
				for(var u in Jobs[x]["make"]){		
					incr = factor*Jobs[x]["make"][u]*(Jobs[x]["workers"]*Jobs[x]["workbonus"]);//add in buildingwork resource generation in another loop before this one - maybe put the passive generation in a new object in Buildings{} so that a given buildings can make more than one resource - somehow need to link back to workers
					if(Stuff[u]["stored"]+incr<0){
						make = false; //don't make if it would be less than 0
					}
					if(make){//don't make somthing if storage is full
						if(Stuff[u]["stored"]<Stuff[u]["maxstored"] && incr>0){
							make2 = true;		
						}
					}
				}
				if(make&&make2) {
					for(var incrKey in Jobs[x]["make"]){
						incr = factor*Jobs[x]["make"][incrKey]*(Jobs[x]["workers"]*Jobs[x]["workbonus"]);
						max  =  Stuff[incrKey]["maxstored"]*Stuff[incrKey]["storebonus"];
						if(Stuff[incrKey]["stored"]+incr>max){
							Stuff[incrKey]["stored"] = max;
						} else {
							Stuff[incrKey]["stored"]+=incr;
						}
						document.getElementById(incrKey).innerHTML = Stuff[incrKey]["stored"].toFixed(1);
					}
				}
			}
		}
	},

	addJobBox: function (boxName){

		newDiv = document.createElement("div");
		newDiv.id = boxName;
		newDiv.className = "JobBox";
		newDiv.style = "display: inline-block; background-image: linear-gradient(rgba(250,250,250,0.1),rgba(255,250,250,0.1)), url(images/"+ boxName +".jpg);"

		p1 = document.createElement("p");
		p1.style = "font-size:4pt;"
		p1.innerHTML = " ";

		p2 = document.createElement("p");
		p2.innerHTML = "<span class='bkgrn'><b>&nbsp;"+ boxName.toUpperCase() +"&nbsp;</b></span>";

		p3 = document.createElement("p");
		p3.style = "font-size:25pt;";
		p3.textContent = " ";

		p4 = p1
		p4.id = "endspace";

		newDiv.appendChild(p1);
		newDiv.appendChild(p2);
		newDiv.appendChild(p3);
		newDiv.appendChild(p4);

		document.getElementById("pan1").insertBefore(newDiv,document.getElementById("blank"));

	},

	addJobElement: function (jobName){//came move the check whether box exists up to here

		Jobs[jobName]["unlocked"] = true;
		makeStr = "";
		consumeStr ="";
		

		for (var i in Jobs[jobName]["make"]){
			if(Jobs[jobName]["make"][i]>0){
				makeStr += Jobs[jobName]["make"][i]*factor*5 + " " + i + " / sec<br>"; //the 5 comes from ticks per second
			} else {
				consumeStr += Jobs[jobName]["make"][i]*factor*-5 + " " + i + " / sec<br>"; //the 5 comes from ticks per second
			}

			//buildings unlock resources for now, eventually research will, but not jobs - can also unlock resources with research or by building a building check in condistions part of run() loop -  remove buildings unlocking resources and make all Stuff.addResourceLine calls form conditions section otherwise I will need to add to Buildings[building][make] array with research, etc. nevermind, that is ok. let the buildings unlock initial things and unlock more by adjusting make array, is good that way
		}

		if(consumeStr!==""){
			consumeStr = "<br>and consumes:<br>" + consumeStr;	
		}

		makeStr = makeStr.slice(0,-4);


		indiv = document.createElement("div");
		indiv.id = jobName.toLowerCase() + "Job";
		indiv.innerHTML = "<div class='userAdd'><b>&nbsp;"+ jobName.charAt(0).toUpperCase() + jobName.slice(1) +"s: <span id='"+ jobName +"s'>0</span> / <span id='"+ jobName +"sMax'>"+ Jobs[jobName]["maxworkers"] +"</span>&nbsp;</b><div class='tooltiptext'><p>Each "+ jobName +" makes: <br><span id='"+ jobName +"sMake' >"+ makeStr + consumeStr +"</span></p></div></div><div class='userRemove'><b> X </b></div><p style='font-size:4pt;'> </p>";
		indiv.querySelector(".userAdd").addEventListener("click",moveworkerEvent);
		indiv.querySelector(".userRemove").addEventListener("click",removeworkerEvent);

		document.getElementById(Jobs[jobName]["box"]).appendChild(indiv);
	},


}


var Buildings = {  //if addWorker property key is "freeworker", it will add free workers     can remove the buildOnce property because just make buy button invis for "true" buildings?
					//can move the unlockRes and unlockJob functionality to the unlock_conditional section of the run() function
	shack:	{name: "Shack", 		count:1, buildWorkers:1, buildTime:25, unlocked:true, 	buildingwork:{},									addworker:{freeworker:1}, 	cost:{wood:25}, 							unlockRes:[],			unlockJob:[],			costratio:1.2,		buildOnce:false,	tempCount:0, 	addsText:["space for 1 new settler"],		},
	farm:	{name: "Farm",			count:0, buildWorkers:3, buildTime:40, unlocked:false, 	buildingwork:{},									addworker:{farmer:2},		cost:{wood:100, rock:75},					unlockRes:[],			unlockJob:["farmer"],	costratio:2.5, 		buildOnce:false,	tempCount:0,	addsText:["space for 2 farmers"],						statement:"To free up workers from hunting duties you decided to try farming"},
	shed:	{name: "Woodshed",		count:0, buildWorkers:2, buildTime:25, unlocked:false, 	buildingwork:{},		addstorage:{wood:50}, 		addworker:{woodcutter:1}, 	cost:{wood:30},								unlockRes:[],			unlockJob:[],			costratio:1.5,		buildOnce:false,	tempCount:0,	addsText:["space for 1 woodcutter", "50 wood storage"],	statement:"It looks like you could use a place to chop and store more wood"},
	expandQ:{name: "Expand Quarry",	count:0, buildWorkers:3, buildTime:25, unlocked:false,	buildingwork:{},		addstorage:{rock:50},		addworker:{rockcutter:1}, 	cost:{wood:30, rock:50},					unlockRes:[],			unlockJob:[],			costratio:1.5,		buildOnce:false,	tempCount:0,	addsText:["space for 1 rockcutter", "50 rock storage"],	statement:"Clearing access to the quarry allows for more rock collection and storage"},
	barn:	{name: "Barn",			count:0, buildWorkers:3, buildTime:40, unlocked:false,	buildingwork:{},		addstorage:{wood:100,rock:100,food:100}, 				cost:{wood:300,rock:100},					unlockRes:[],			unlockJob:[],			costratio:1.5,		buildOnce:false,	tempCount:0,	addsText:["100 food storage", "100 wood storage", "100 rock storage"],	statement:"You will need even more storage to stockpile resources for larger buildings"},
	mill:	{name: "Sawmill",		count:0, buildWorkers:3, buildTime:50,unlocked:false,	buildingwork:{},		addstorage:{lumber:300}, 	addworker:{millworker:3},	cost:{wood:300, rock:50},					unlockRes:["lumber"],	unlockJob:["millworker"],costratio:2.5,		buildOnce:false,	tempCount:0,	addsText:["space for 3 mill workers", "300 lumber storage"],	statement:"Process the wood into boards at the sawmill"},
	workshop:{name:"Workshop",		count:0,buildWorkers:3, buildTime:60,unlocked:false,	buildingwork:{},		addstorage:{stone:200},		addworker:{mason:3},		cost:{lumber:200,rock:200},					unlockRes:["stone"],	unlockJob:["mason"],	costratio:2.5,		buildOnce:false,	tempCount:0,	addsText:["space for 3 masons", "200 stone storage"],	statement:"Workshops will allow masons to cut raw rock into stone"},
	hut:	{name: "Hut",			count:0, buildWorkers:3, buildTime:40, unlocked:false, 	buildingwork:{},									addworker:{freeworker:1},	cost:{lumber:200,stone:100},				unlockRes:[],			unlockJob:[],			costratio:1.2,		buildOnce:false,	tempCount:0,	addsText:["space for 1 new settler"],					statement:"With the boards from the mill and cut stones you can build new housing structures"},
	lab: 	{name: "Laboratory",	count:0, buildWorkers:4, buildTime:100,unlocked:false, 	buildingwork:{},									addworker:{researcher:1},	cost:{wood:100,lumber:300,stone:200},		unlockRes:["research"],	unlockJob:["researcher"],costratio:1.3,		buildOnce:false,	tempCount:0,	addsText:["space for 1 researcher"],					statement:"The Council Hall has been constructed. The first meeting will be held immediately."},
	mine:	{name: "Mineshaft",		count:0, buildWorkers:5, buildTime:60, unlocked:false,	buildingwork:{},		addstorage:{},				addworker:{},				cost:{lumber:200},							unlockRes:[],			unlockJob:[],			costratio:1.2,		buildOnce:false,	tempCount:0,	addsText:["space for 2 miners"],						statement:"Adding a mineshaft will allow collection of ores."},
	warehouse:{name:"Warehouse",	count:0, buildWorkers:5, buildTime:50, unlocked:false,	buildingwork:{},		addstorage:{wood:50,rock:50,lumber:50,stone:50,cu_ore:50,brick:50}, addworker:{},cost:{rock:100,lumber:500,stone:300},unlockRes:[],		unlockJob:[],			costratio:1.1,		buildOnce:false,	tempCount:0,	addsText:["50 wood storage","50 rock storage","50 lumber storage","50 stone storage","50 ore storage","50 clay storage"], statement:"More versitile than barns, your warehouses are designed to store many kinds of materials."},
	kiln:	{name: "Kiln",			count:0, buildWorkers:3, buildTime:30, unlocked:false,	buildingwork:{},		addstorage:{},				addworker:{kilnworker:1},	cost:{brick:200,stone:50},					unlockRes:["copper"],	unlockJob:["kilnworker"],costratio:1.1,		buildOnce:false,	tempCount:0,	addsText:["space for one kilnworker"], statement:"Kilns will let us smelt ore and perhaps do other things later."},
	//give kilns a drop-down menu for picking what to do - turn wood to charcoal, turn clay to brick, turn ore to metal - different recipe based on what is selected. keep track of number of kilns and kilnworkers but treat consumption/generation separately?
	councilhall:{name: "Town Hall", count:0, buildWorkers:10, buildTime:200,  unlocked:false, tempCount:0, 												cost:{wood:200, rock:200, lumber:400, stone:300}, 	unlockRes:[], 	unlockJob:[],			costratio:1,	buildOnce:true,	statement:"The Council Hall has been constructed. The first meeting will be held immediately."},

	incrRes: function(){//add passive resource production
		for(var x in Buildings){
			var make1 = true;
			var make2 = false;
			for(var y in Buildings[x]["buildingwork"]){
				incr = factor*Buildings[x]["buildingwork"][y]*Buildings[x]["count"];
				if(Stuff[y]["stored"]+incr<0){
					make1 = false;
				}
				if(make1){
					if(Stuff[y]["stored"]<Stuff[y]["maxstored"] && incr>0){
						make2 = true;
					}
				}
			}
			if(make1 && make2){
				for(var incrKey in Buildings[x]["buildingwork"]){
					incr = factor*Buildings[x]["buildingwork"][y]*Buildings[x]["count"];
					max  =  Stuff[incrKey]["maxstored"]*Stuff[incrKey]["storebonus"];
					if(Stuff[incrKey]["stored"]+incr>max){
						Stuff[incrKey]["stored"] = max;
					} else {
						Stuff[incrKey]["stored"]+=incr;
					}
					document.getElementById(incrKey).innerHTML = Stuff[incrKey]["stored"].toFixed(1);
				}
			}
		}
	},

	addBuildingButton: function(buildingName){ 
		newBuild = document.createElement("div");
		newBuild.id = buildingName + "Build";
		newBuild.className = "buildingButton";
		addsText = ""
		for (i=0;i<Buildings[buildingName]["addsText"].length;i++){
			addsText+=Buildings[buildingName]["addsText"][i];
			addsText+="<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
		}
		addsText = addsText.slice(0,-70);

		newBuild.innerHTML = "<div class='tooltiptext'><p>Requires ("+ Buildings[buildingName]["buildWorkers"] +") workers to build<br>Cost:&nbsp;<span id='"+ buildingName +"Costs'> </span><br><br>Adds: <span id='"+ buildingName +"Adds'>"+ addsText +"</span></p></div><div id='"+ buildingName +"progress' class='buildBar'><p class='buildText'>"+ Buildings[buildingName]["name"] +" [<span id='"+ buildingName +"'>0</span>]</p></div>";

		newBuild.addEventListener("click",addBuildingEvent);

		document.getElementById("pan2").insertBefore(newBuild, document.getElementById("buildBlank"));
	},

/* Ideas for stuff to add
	ranch:	{unlock:cattle}
	cabbin: {addworker:{free:3}}
	market: {unlock:"gold"} sell food and stuff for gold in separate tab or as a rate  //tech add dock to increase commerce "You have built most of the stuctures that you and your council know how to build, but you remember many other wonderful things from you past lives in the Great City. You allow some settlers to study and draft plans for new types of buildings."
	fishery: //unlocked by dock tech
	
	market ideas - have traders come infrequently to buy certain resources, can get more to come as population grows or other things, eventually a steady trickle of certain resource for gold (no max on gold)
*/

};

//GLOBAL VARIABLES - go through and see which of these can be local variables - no need to have them all global probably
	var wrks = 0;		//total number of workers - only updated on TotalWorkers() call	
	var counter1 = 0;	//timer for removing "statement" messages
	var incr = 0; 		//to add resources each step
	var max = 0;  		//to find max storable
	var txtNotEnough = " "; //to say which resources are missing to build a new building
	var allworkers = 1;		//to count up the workers and subtract food consumption
	var tempFood = 0;	//to count workers transfered to hunting in food shortage
	var actualcost = 0;	//to calculate the cost of a purchase from the base cost, "cost," and the cost ratio
	var nextcost = 0;	//to give how much the next building will cost (to display on the webpage)
	var tempKey = 0;	//to give farm and other food production to the "food" Stuff property
	var unlockStuff = "";	//to set new materials to unlocked when a certain building is made
	var ActiveRes = " ";	//to set active research
	var make = true;	//to tell whether to make a research or resource increment (no if would be < 0 )
	var strg = "";
	var num = 1;			//to tell how many workers to add or remove
	var buildBuild = [];	//if empty, not building, otherwise building whatever is in the array - can have multiple values of same building
	var buildConstruct = [];//used to store completion of building with same index in buildBuild (0 to 100)
	var buildWorkers = 0;	//number of free workers to currently used for construction
	var time = 1;		//time to construct a building
	var interval = 10;		//ammount of construction to do each run() cycle
	var construction = 0; 	//completion from 0 to 100 of the current building
	//check this object
	var container = {};		//to store the elements on which we will set the eventListeners (because we can't make new variable names using variable strings) - do I even need this though?
	var bodyy 				//reference to the HTML node/element <body>
	var knowledge = 0;		//the prestige variable
	var JobBoxes = ["camp", "fields", "forest"];//keeps track of all the job boxes that have been created (or made visible)
	var factor = 0.5 		//to alter the speed of resrouces collection (and food consumption). Higher numer collects more resources per tick.
	var statementLog = "";	//to store the log of the game **can make a function to update and call doc.logOut that take the new string as a parameter
	var exploreCount = 1;		//number of free workers to go on an exploring trip
	var Token = [];
	for (i=0;i<100;i++){
		Token[i]=true;
	}
	var exploring = false;	//is there an active exploring party?
	var exploreBar = 0;		//progress of the exploring party
	var exploreStuff={food:30};//round stuff when deciding to use it
	var cheating = false;

//

//elements to litsen to
window.onload = function () {//add event listeners after DOM has laoded or you will get null instead of element

	bodyy = document.getElementsByTagName('body')[0];
	bodyy.addEventListener("transitionend", updateTransition);//ends the white flash when food runs out

	var closeStory = document.querySelector(".closebtn");
	closeStory.addEventListener("click", function(){closeStory.parentElement.style.display="none";populate();});

	var cheat = document.getElementById("title");
	cheat.addEventListener("click",testFunc);

	var setButtons = document.querySelectorAll(".butt");
	for (var i=0;i<setButtons.length;i++){
		setButtons[i].addEventListener("click",panelEvent);
	}


	//add listeners for moving workers' jobs
	jobIds = document.querySelectorAll(".userAdd0");

	for(i=0;i<jobIds.length;i++){
		jobIds[i].addEventListener("click",moveworkerEvent);
		jobIds[i].parentElement.getElementsByClassName("userRemove0")[0].addEventListener("click",removeworkerEvent);
	}


	//adds event listener for the building buttons
	var setBuildings = document.querySelectorAll(".buildingButton");
	for (i=0;i<setBuildings.length;i++){
		setBuildings[i].addEventListener("click",addBuildingEvent);
	}

	//add event listeners for the research buttons
	var setResearchs = document.querySelectorAll(".researchButton");
	for (i=0;i<setResearchs.length;i++){
		//the ids must be "research name" in the HTML file
		setResearchs[i].addEventListener("click",SwapResearchEvent);
	}

	//add event listener for council build button
	document.getElementById("buildCounc").addEventListener("click", councilListen);

	var councilMessages = document.querySelectorAll(".councilMessage");
	for (i=0;i<councilMessages.lengh;i++){
		councilMessages[i].addEventListener("click",CouncilMessageEvent);
	}

}

function populate(){
	var introStr = "You have built a shack and gathered some supplies. Now your attention turns to bigger plans."
	statementLog = introStr + "<br><br>" + statementLog;
	document.getElementById("logOut").innerHTML = statementLog;
	document.getElementById("statement").innerHTML = introStr; counter1 = 0;	
	load();
}
function panelEvent(e){
	Panel("pan" + e.currentTarget.id.charAt(e.currentTarget.id.length-1)); //pan0, pan1 strings
}
function moveworkerEvent(e){
	var num = 1;
	if (e.shiftKey) {
		num = 5;
	}
	if (e.ctrlKey) {
		num = 10;
	}
	if(e.altKey) {
		num = -1;
	}

	moveworker(e.currentTarget.parentElement.id.slice(0,-3),num);

}
function removeworkerEvent(e){
	var num = 1;
	if (e.shiftKey) {
		num = 5;
	}
	if (e.ctrlKey) {
		num = 10;
	}
	if(e.altKey) {
		num = -1;
	}
	removeworker(e.currentTarget.parentElement.id.slice(0,-3),num);
}
function addBuildingEvent(e){
	addBuilding(e.currentTarget.id.slice(0,-5));
}
function SwapResearchEvent(e){
	SwapActiveRes(e.currentTarget.id);
}
function CouncilMessageEvent(e){
	var num = 1 + e.currentTarget.id.charAt(e.currentTarget.id.length-1);
	e.currentTarget.style.display = "none"
	document.getElementById("council"+ num).style.display = "block";
}

//for switching active panels
var mark1 = "pan1";
var mark2 = "pan2";
function Panel(select){
	tempNum = select.slice(-1);
	if(document.getElementById("butt"+tempNum).className === "buttAttn"){
		document.getElementById("butt"+tempNum).className = "butt";
	}
    if(select === mark1){
        //do nothing
    } else if(select === mark2){
        mark2 = mark1;
        mark1 = select;
        //don't need to change any display settings
    } else {
        document.getElementById(mark2).style.display = "none";
        mark2 = mark1;
        mark1 = select;
        document.getElementById(select).style.display = "block";
    }
}

//////////////////////////////////////////////////////////////////////////add and remove workers///////////////////////////////////////////////////////////////////////////////////
function moveworker(workkey,num){

	if (num === -1){
		num = Math.min(Jobs[workkey]["maxworkers"]-Jobs[workkey]["workers"],Jobs.freeworker.workers);
	}

	if (Jobs[workkey]["workers"]+num <= Jobs[workkey]["maxworkers"] && Jobs.freeworker.workers >= num){
		Jobs[workkey]["workers"]+=num;
		Jobs["freeworker"]["workers"]-=num;

		document.getElementById(workkey+"s").innerHTML = Jobs[workkey]["workers"];
		document.getElementById("freeworkers").innerHTML = Jobs["freeworker"]["workers"];
	}
}

function removeworker(lessworkkey,num){
	if (num === -1){
		num = Jobs[lessworkkey]["workers"];
	}
	if (Jobs[lessworkkey]["workers"]-num>=0){
		Jobs[lessworkkey]["workers"]-=num;
		Jobs["freeworker"]["workers"]+=num;

		document.getElementById(lessworkkey+"s").innerHTML = Jobs[lessworkkey]["workers"];
		document.getElementById("freeworkers").innerHTML = Jobs["freeworker"]["workers"];
	}
}


//////////////////////////////////////////////////////////////////////////add buildings////////////////////////////////////////////////////////////////////////////////
function addBuilding(buildkey){

	var canbuild = true; 
	txtNotEnough = " ";


	//enough free worekers to build?    
	if(Buildings[buildkey]["buildWorkers"]>Jobs["freeworker"]["workers"]){
		canbuild = false;
		txtNotEnough+= "free workers at camp,&nbsp"
	}

	//can we build it?
	for(var key in Buildings[buildkey]["cost"]){
		//should make actualcost a method in Buildings - Buildings.actualcost("buildkey")? the tempcount stores how many are being built so that cost is updated correctly
		actualcost = Math.round(Buildings[buildkey]["cost"][key]*Math.pow(Buildings[buildkey]["costratio"],(Buildings[buildkey]["count"]+Buildings[buildkey]["tempCount"])));

		if(actualcost>Stuff[key]["stored"]){
			canbuild = false;
			txtNotEnough+=(key+",&nbsp");
		}	
	}
	txtNotEnough = txtNotEnough.slice(0,-6);//remove the comma and space after the last entry


	//yes we can!
	if(canbuild){
		if(buildkey==="councilhall"){
			//remove event listener, hopefully named it correctly
			document.getElementById("buildCounc").removeEventListener("click",councilListen);
			
		}
		Buildings[buildkey]["tempCount"]++;
		//set everything up for construction function
		buildBuild.push(buildkey) ; //this will cause buildUp() to start running true in the game loop - on buildBuild array 
		buildConstruct.push(0);
		buildWorkers +=  Buildings[buildkey]["buildWorkers"];
		Jobs.freeworker.workers -= Buildings[buildkey]["buildWorkers"];
		document.getElementById("freeworkers").innerHTML = Jobs.freeworker.workers;

 		costTxt = " ";
		//pay for the building

		for(var keyy in Buildings[buildkey]["cost"]){

			actualcost = Math.round(Buildings[buildkey]["cost"][keyy]*Math.pow(Buildings[buildkey]["costratio"],Buildings[buildkey]["count"]+Buildings[buildkey]["tempCount"]-1));   //consider making function actualcost(buildkey,key) which returns value calculated value

			Stuff[keyy]["stored"]-=actualcost;
			document.getElementById(keyy).innerHTML = Stuff[keyy]["stored"];
		
			costTxt += Math.round(actualcost*Buildings[buildkey]["costratio"]) + "&nbsp" + keyy + "<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp";
		}
		costTxt = costTxt.slice(0,-56);


		if (!Buildings[buildkey]["buildOnce"]){
			document.getElementById(buildkey+"Costs").innerHTML = costTxt;	 //may be better way to do this but don't want to try to update cost that doesn't exist
		}



		//no we can't :(
	}  else {

		document.getElementById("statement").innerHTML = "Not enough "+ txtNotEnough +" to build " + Buildings[buildkey]["name"]; counter1 = 20;
	}
	return(canbuild);
}

function buildUp(){
	for(i=0;i<buildBuild.length;i++){
		if (buildConstruct[i]<100){
			buildConstruct[i]+=(100/Buildings[buildBuild[i]]["buildTime"]*time); //need to loop through buildkeys in array 1
			if(buildConstruct[i]>=100){
				buildConstruct[i] = 100;//so the bar doesn't go over if there is a rounding error
			}
			document.getElementById(buildBuild[i] + "progress").style.width = buildConstruct[i].toString() + "%"; //add html + css for the progress bars
		} else {
			finishBuilding(buildBuild[i],i);//also send the index so that if there are more than one of a building it knows which to remove
		}
	}
}

function finishBuilding(buildkey,index){
	//re-direct to special building calls
	if(buildkey == "councilhall"){
		finishCouncil(index);
	} else {


		//add storage space
		for(var keyyy in Buildings[buildkey]["addstorage"]){
			Stuff[keyyy]["maxstored"]+=Buildings[buildkey]["addstorage"][keyyy];
			document.getElementById(keyyy + "Max").innerHTML = Stuff[keyyy]["maxstored"];
		}
		//add worker space (and free workers)
		for(var key4 in Buildings[buildkey]["addworker"]){
			if(key4 == "freeworker"){
				Jobs.freeworker.workers+=Buildings[buildkey]["addworker"]["freeworker"];
				allworkers+=Buildings[buildkey]["addworker"]["freeworker"];
				document.getElementById("freeworkers").innerHTML = Jobs["freeworker"]["workers"];
				document.getElementById("totalWorkers").innerHTML = allworkers;
			} else {
			Jobs[key4]["maxworkers"]+=Buildings[buildkey]["addworker"][key4];
			document.getElementById(key4 + "sMax").innerHTML = Jobs[key4]["maxworkers"];
			}
		}

		Buildings[buildkey]["tempCount"]--;
		Buildings[buildkey]["count"]++;
		if (!Buildings[buildkey]["buildOnce"]){
			document.getElementById(buildkey).innerHTML = Buildings[buildkey]["count"];
		}

		//and reset freeworkers, construction bar, and buildBuild to "no"
		Jobs.freeworker.workers += Buildings[buildkey]["buildWorkers"];


		buildWorkers -= Buildings[buildkey]["buildWorkers"];
		document.getElementById("freeworkers").innerHTML = Jobs.freeworker.workers;
		document.getElementById(buildkey + "progress").style.width = "0%";
		buildBuild.splice(index,1);
		buildConstruct.splice(index,1);
	}
}
/////////////////////////////////////////////////////////////////////////////unlocking buildings and the resources those buildings start with////////////////////////////////////////////////////////////////////////////////// 
function unlock(unlockkey){

	if(!Buildings[unlockkey]["unlocked"]){
		
		Buildings.addBuildingButton(unlockkey);
		Buildings[unlockkey]["unlocked"] = 1;
		
		//adds newly unlocked resources
		for(i=0;i<Buildings[unlockkey]["unlockRes"].length;i++){

			var tempStuff = Buildings[unlockkey]["unlockRes"][i];
			if(!Stuff[tempStuff]["unlocked"]){
				Stuff[tempStuff]["unlocked"] = true;

				Stuff.addResourceLine(tempStuff);
			}
		}

		//add the new jobs that the building unlocks
		for(i=0;i<Buildings[unlockkey]["unlockJob"].length;i++){
			newJob = Buildings[unlockkey]["unlockJob"][i];
			newBox = Jobs[newJob]["box"];

			//should move this check to make (and make) jobbox as a call from the addJobElement() method?
			//if the jobBox for the unlocked job does not exist, make it
			if(JobBoxes.indexOf(newBox)===-1){
				JobBoxes.push(newBox);
				Jobs.addJobBox(newBox);
			}
			Jobs.addJobElement(newJob);

			
			Jobs[newJob]["unlocked"]=true;
			document.getElementById(newJob+"s").innerHTML = Jobs[newJob]["workers"];
			document.getElementById(newJob+"sMax").innerHTML = Jobs[newJob]["maxworkers"];

		}

		var costTxt = " ";

		for(var key in Buildings[unlockkey]["cost"]){//make this output the same as the update cost output from addBuilding()
			costTxt += Buildings[unlockkey]["cost"][key] + "&nbsp" + key + ",&nbsp";
		}

		costTxt = costTxt.slice(0,-6);

		document.getElementById(unlockkey+"Costs").innerHTML = costTxt;

		statementLog = Buildings[unlockkey]["statement"] + "<br><br>" + statementLog;
		document.getElementById("statement").innerHTML = Buildings[unlockkey]["statement"]; counter1 = 0;
		document.getElementById("logOut").innerHTML = statementLog;
	}
}

////////////////////////////////////////////////////////////////////////////research////////////////////////////////////////////////////////////////////////////////////
function SwapActiveRes(x){
	ActiveRes = x;
	document.getElementById("research").innerHTML = Research[x]["completion"];
	document.getElementById("researchMax").innerHTML = Research[x]["totalRes"];

	//change the tooltip for researchers
	consumeStr = "";
	for(var i in Research[x]["resCost"]){
		consumeStr += Research[x]["resCost"][i]*5*factor + " " + i + " / sec<br>";
	}
	document.getElementById("researchersMake").innerHTML = Jobs.researcher.make.research*Jobs.researcher.workbonus*5*factor+" research / sec<br>and consumes:<br>"+consumeStr;
}

var Research = {
	FarmEquip:	{name:"Farm Equipment",		resCost:{wood:2,lumber:1}, 		totalRes:1000, 	completion:0, done:false, reward:"Farm equipment improves farmers' food output by 50%"},
	StoneAxe:	{name:"Stone Axes",			resCost:{lumber:1,stone:2}, 	totalRes:1500, 	completion:0, done:false, reward:"Stone axes increase woodcutter production by 50%"},
	StoneChisel:{name:"Stone Chisels",		resCost:{lumber:.5,rock:.5,stone:1},totalRes:1000,completion:0,done:false,reward:"Better tool design for cutting stone increases<br>output of both masons and rockcutters by 20%"},
	FindOre:	{name:"Ore Finding",		resCost:{food:1,lumber:1},		totalRes:500, 	completion:0, done:false, reward:"Some workers learn how to look for potential mining sites"},
	Metalwork:	{name:"Metalworking",		resCost:{metal:1},				totalRes:3500, 	completion:0, done:false},
	Roads:		{name:"Roadbuilding",		resCost:{wood:1,stone:3},		totalRes:5000,	completion:0, done:false},
	Barns1:		{name:"Improve Barns",		resCost:{wood:1,lumber:1,rock:1},totalRes:2000,	completion:0, done:false, reward:"Update plans for barns to increase storage by 20%. Improves current barns and future barns will now require lumber."},
	Smelting:	{name:"Smelting",			resCost:{brick:1,lumber:1,stone:1,wood:1},totalRes:2700,completion:0, done:false, reward:"Figure out a way to smelt metal ore into usable metal."},
	Brickmaking:{name:"Brickmaking",		resCost:{wood:1,clay:1},		totalRes:1000,	completion:0, done:false, reward:"Learn how to fire the clay into bricks over wood fires."},

	addResearchButton: function(research){
		div = document.createElement("div");
		div.className = "researchButton"
		div.id = research;
		div.addEventListener("click",SwapResearchEvent);

		var uses = "";
		for(var i in Research[research]["resCost"]){
			uses += Research[research]["resCost"][i] + " " + i;
			uses += " and ";
		}
		uses = uses.slice(0,-5);
		div.innerHTML = "<div id ='"+ research + "resBar' class='resBar'> <p class='resText'>"+Research[research]["name"]+"</p></div><div class='tooltiptext'><br>Takes "+Research[research]["totalRes"]+" research<br>Uses "+uses+" per research<br><br>"+Research[research]["reward"]+"<br><br></div>";
		document.getElementById("pan3").appendChild(div);
	}
}

function researchIncr(resUp){

	if(!Research[resUp]["done"]){

		make = true;
		
		for(var resKey in Research[resUp]["resCost"]){

			incr = Research[resUp]["resCost"][resKey]*Jobs["researcher"]["workers"]*Jobs["researcher"]["workbonus"];

			if(Stuff[resKey]["stored"]-incr<0 || !Stuff[resKey]["unlocked"]){//need to check all the required resources before consuming any
				make = false;
			}
		}

		if(make) {
			for(var incrKey in Research[resUp]["resCost"]){

				Stuff[incrKey]["stored"]-= Research[resUp]["resCost"][incrKey]*Jobs["researcher"]["workers"]*Jobs["researcher"]["workbonus"];//dont need to look up Jobs[]*Jobs[] every time this loops
				document.getElementById(incrKey).innerHTML = Stuff[incrKey]["stored"];
			}
			Research[resUp]["completion"]+= time*Jobs["researcher"]["workers"]*Jobs["researcher"]["workbonus"]; //can add research to efficiency which increase researcher output% but doesn't increase materials cost - need to add a new resEfficiency variable

			document.getElementById(resUp + "resBar").style.width = Research[resUp]["completion"]/Research[resUp]["totalRes"]*100 + "%";
			if(Research[resUp]["completion"]>=Research[resUp]["totalRes"]){
				Research[resUp]["completion"]=Research[resUp]["totalRes"];
				Research[resUp]["done"] = true;

				logStatement("Research complete: " + Research[resUp]["reward"]);

				document.getElementById(resUp).style.display = "none";

				doBonus(resUp);
				ActiveRes = " ";
			}
			document.getElementById("research").innerHTML = Research[resUp]["completion"];
		}
	}
}

//what to do when research is completed
//the 'finished' statements get handled in the researchIncr() function so don't have new statements here
function doBonus(resUp){
	switch (resUp) {
	    case "FarmEquip":			
			console.log("research case 0");
	        Jobs.farmer.workbonus = Jobs.farmer.workbonus*1.5;

			makeStr = "";
			consumeStr = "";
		
			for (var i in Jobs.farmer.make){
				if(Jobs["farmer"]["make"][i]>0){
					makeStr += Jobs["farmer"]["make"][i]*Jobs.farmer.workbonus*factor*5 + " " + i + " / sec<br>"; //the 5 comes from ticks per second
				} else {
					consumeStr += Jobs["farmer"]["make"][i]*Jobs.farmer.workbonus*factor*-5 + " " + i + " / sec<br>"; //the 5 comes from ticks per second
				}

				//buildings unlock resources for now, eventually research will, but not jobs - can also unlock resources with research or by building a building check in condistions part of run() loop -  remove buildings unlocking resources and make all Stuff.addResourceLine calls form conditions section otherwise I will need to add to Buildings[building][make] array with research, etc. nevermind, that is ok. let the buildings unlock initial things and unlock more by adjusting make array, is good that way
			}

			if(consumeStr!==""){
				consumeStr = "<br>and consumes:<br>" + consumeStr;	
			}

			makeStr = makeStr.slice(0,-4);

			document.getElementById("farmersMake").innerHTML = makeStr+consumeStr;
			//some action to close the button but this below isn't doing anything
	        break;
	    case "StoneAxe":
			console.log("research case 1");
	        Stuff.wood.workbonus = Jobs.woodcutter.workbonus*1.5;

			//update the tooltips to show new production values
			makeStr = "";
			consumeStr = "";
		
			for (var i in Jobs.woodcutter.make){
				if(Jobs["woodcutter"]["make"][i]>0){
					makeStr += Jobs["woodcutter"]["make"][i]*Jobs.woodcutter.workbonus*factor*5 + " " + i + " / sec<br>"; //the 5 comes from ticks per second
				} else {
					consumeStr += Jobs["woodcutter"]["make"][i]*Jobs.woodcutter.workbonus*factor*-5 + " " + i + " / sec<br>"; //the 5 comes from ticks per second
				}

				//buildings unlock resources for now, eventually research will, but not jobs - can also unlock resources with research or by building a building check in condistions part of run() loop -  remove buildings unlocking resources and make all Stuff.addResourceLine calls form conditions section otherwise I will need to add to Buildings[building][make] array with research, etc. nevermind, that is ok. let the buildings unlock initial things and unlock more by adjusting make array, is good that way
			}

			if(consumeStr!==""){
				consumeStr = "<br>and consumes:<br>" + consumeStr;	
			}

			makeStr = makeStr.slice(0,-4);

			document.getElementById("woodcuttersMake").innerHTML = makeStr+consumeStr;

			//make this show up in town hall instaed of as it does here? need to add a 'add town hall message' sort of function
			stoneStr = "One of the newest wanderers to join your camp used to supervise mining opperations for the Great City. He offers to teach the group how to find ore and smelt it."
			statementLog = stoneStr + "<br><br>" + statementLog;
			document.getElementById("logOut").innerHTML = statementLog;//some statements are logged and displayed in the town hall annoucement instead of the normal statement line
			//sets the council message
			document.getElementById("council1").textContent = stoneStr;//need the <i>s?
			//give the town hall button a red color
			alertPanel("pan4");
			Research.addResearchButton("FindOre");
			Research.addResearchButton("Smelting");

	        break;
		case "StoneChisel":
			Jobs.rockcutter.workbonus*=1.2;
			Jobs.mason.workbonus*=1.2;

			makeStr = "";
			consumeStr = "";
		
			for (var i in Jobs.rockcutter.make){
				if(Jobs["rockcutter"]["make"][i]>0){
					makeStr += Jobs["rockcutter"]["make"][i]*Jobs.rockcutter.workbonus*factor*5 + " " + i + " / sec<br>"; //the 5 comes from ticks per second
				} else {
					consumeStr += Jobs["rockcutter"]["make"][i]*Jobs.rockcutter.workbonus*factor*-5 + " " + i + " / sec<br>"; //the 5 comes from ticks per second
				}

				//buildings unlock resources for now, eventually research will, but not jobs - can also unlock resources with research or by building a building check in condistions part of run() loop -  remove buildings unlocking resources and make all Stuff.addResourceLine calls form conditions section otherwise I will need to add to Buildings[building][make] array with research, etc. nevermind, that is ok. let the buildings unlock initial things and unlock more by adjusting make array, is good that way
			}

			if(consumeStr!==""){
				consumeStr = "<br>and consumes:<br>" + consumeStr;	
			}

			makeStr = makeStr.slice(0,-4);

			document.getElementById("rockcuttersMake").innerHTML = makeStr+consumeStr;

			makeStr = "";
			consumeStr = "";
		
			for (var i in Jobs.mason.make){
				if(Jobs["mason"]["make"][i]>0){
					makeStr += Jobs["mason"]["make"][i]*factor*Jobs.mason.workbonus*5 + " " + i + " / sec<br>"; //the 5 comes from ticks per second
				} else {
					consumeStr += Jobs["mason"]["make"][i]*Jobs.mason.workbonus*factor*-5 + " " + i + " / sec<br>"; //the 5 comes from ticks per second
				}

				//buildings unlock resources for now, eventually research will, but not jobs - can also unlock resources with research or by building a building check in condistions part of run() loop -  remove buildings unlocking resources and make all Stuff.addResourceLine calls form conditions section otherwise I will need to add to Buildings[building][make] array with research, etc. nevermind, that is ok. let the buildings unlock initial things and unlock more by adjusting make array, is good that way
			}

			if(consumeStr!==""){
				consumeStr = "<br>and consumes:<br>" + consumeStr;	
			}

			makeStr = makeStr.slice(0,-4);

			document.getElementById("masonsMake").innerHTML = makeStr+consumeStr;

			break;
		case "FindOre":
			console.log("research case 2");
			//add an explore button to (mostly unsuccessfully) look for mining sites
			div = document.createElement("div");
			div.id = "exploreButton";
			div.className = "exploreButton";
			div.innerHTML = "<div class='tooltiptext' id='exploreTip'><p>Requires (<span id ='exploreWorkers'>1</span>) workers for the exploration party<br>The trip will need <span id='exploreCosts'>30 food</span></p></div><div id='exploreBar' class='buildBar'><p class='buildText' style='padding-top:15px'>Send a party to explore and<br> map the surrounding area</p></div>";
			div.addEventListener("click",exploreGo);
			document.getElementById("pan4").appendChild(div);

			alertPanel("pan4");
			break;
	    case "Smelting":
			unlock("kiln");
			//need to add a newResearchButton() function;
	        console.log("case 2");
	        break;
	    case "Metalwork":
	        console.log("case 3");
	       	break;
	    case "Barns1":
			Buildings.barn.cost.lumber = 50;

			addsStr = "";
			for(var i in Buildings.barn.addstorage){
				Stuff[i]["maxstored"] += Buildings["barn"]["addstorage"][i]*.2*Buildings.barn.count;
				Buildings["barn"]["addstorage"][i] *=1.2;
				document.getElementById(i+"Max").innerHTML = Stuff[i]["maxstored"];
				addsStr += Buildings["barn"]["addstorage"][i]+ " " + i+ " storage";
				addsStr +="<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
			}
			addsStr = addsText.slice(0,-70);
			document.getElementById("barnAdds").innerHTML = addsStr;

			costStr = "";
			for(var i in Buildings.barn.cost){
				costStr += Buildings["barn"]["cost"][i] + " " + i + "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
			}
			//update tooltip for barn
			costStr = costStr.slice(0,-70);
			document.getElementById("barnCosts").innerHTML = costStr;
			
			
	        console.log("case 4");
	        break;
	    case "Brickmaking":
			Jobs.addJobElement("brickmaker");
			Stuff.addResourceLine("brick");
			Buildings.workshop.addworker.brickmaker = 2;
	        console.log("case 5");
	        break;
	    case 6:
	        console.log("case 6");
	}
}


////////////////////////////////////////////////////////////////////////////miscilanious functions working on////////////////////////////////////////////////////////////////////////////////////
//makes the panel select button turn red if it is not active
function alertPanel(pan){
	if(mark1!==pan&&mark2!==pan){
		document.getElementById("butt"+pan.slice(-1)).className = "buttAttn";
	}
}

function councilListen(){
	addBuilding("councilhall")
}
function finishCouncil(index){//some of this can be run in finishBuilding() and then break out right after calling finishCouncil() for parts that are different
	Buildings.councilhall.unlocked = true;
	document.getElementById("buildCounc").style.display = "none";
	decreeStr = "Council decree at Town Hall";
	document.getElementById("statement").innerHTML = decreeStr; counter1 = 0;

	document.getElementById("butt3").style.display = "inline";	
	alertPanel("pan3");
	unlock("lab");
	document.getElementById("council1").style.visibility = "visible";
	Jobs.freeworker.workers += Buildings.councilhall.buildWorkers;
	buildWorkers -= Buildings.councilhall.buildWorkers;
	document.getElementById("freeworkers").innerHTML = Jobs.freeworker.workers;
	buildBuild.splice(index,1);
	buildConstruct.splice(index,1);
}
function isEmpty(object) {
	for(var i in object) {
		return true;
	}
	return false;
}
function updateTransition(){

	bodyy.className = "normal";
}
//go through and put this in or just use from now on
function logStatement(string){
	statementLog = string + "<br><br>" + statementLog;
	document.getElementById("logOut").innerHTML = statementLog;
	document.getElementById("statement").innerHTML = string; counter1 = 0;
}

///////////////////////////////////////////////////////////////////////////exploring the land////////////////////////////////////////////////////////////////////////////////////
function exploreGo(){
	if(exploring){
		document.getElementById("statement").innerHTML = "We should wait until the last scouting party returns";
	} else {
		exploreNum = (exploreCount);
		exploreNumNext = (exploreCount+1);
		console.log("exploring...");

		//need certain number of free workers and food for them to carry
		var go = true;	
		noGoStr = "Not enough ";
		if(Jobs.freeworker.workers<exploreNum){
			noGoStr += "free workers, "
			go = false;
		}
		for(var i in exploreStuff){
			if(Math.round(exploreStuff[i]*exploreNum) > Stuff[i]["stored"]){
				go = false;
				noGoStr += i+", ";
			}
		}
		noGoStr = noGoStr.slice(0,-2);
		noGoStr += " for expedition"
 
		if(go){
			tooltipStr = "";
			for (var i in exploreStuff){
				Stuff[i]["stored"]-=Math.round(exploreStuff[i]*exploreNum);
				tooltipStr += Math.round(exploreStuff[i]*exploreNumNext) + " " + i + "<br>";
				//need to add in an update for the tooltip on sending an explore party - don't feel like it right now
			}
			document.getElementById("exploreWorkers").innerHTML = exploreNumNext;
			document.getElementById("exploreCosts").innerHTML = tooltipStr;
			Jobs.freeworker.workers -= exploreNum;
			document.getElementById("freeworkers").innerHTML = Jobs.freeworker.workers;
			exploreBar = 0;
			
			console.log("exploreCount: "+exploreCount);		
			exploring = true;
		} else {
			document.getElementById("statement").innerHTML = noGoStr;
		}
	}
}
function exploreUp(){
	exploreBar += time*20/(exploreCount);
	if(exploreBar>=100){
		exploreBar = 0;
		exploreEnd();
	}
	document.getElementById("exploreBar").style.width = exploreBar+"%";
}
function exploreEnd(){
	Jobs.freeworker.workers += exploreNum;
	document.getElementById("freeworkers").innerHTML = Jobs.freeworker.workers;
	exploreCount++;
	if(exploreCount===4){
		console.log("explore event1")
		logStatement("The exploring party discovered a potential mining site. You can build a shaft to extract ore");
		Buildings.addBuildingButton("mine");
		Jobs.addJobElement("miner");
	} else if(exploreCount===7) {
		console.log("explore event2");
		Token[10]=false;
		document.getElementById("mineBuild").className = "buildingButton";
		document.getElementById("mineBuild").addEventListener("click",addBuildingEvent);
		document.getElementById("statement").innerHTML = "The exploring party discovered another potential mining site. You can build a shaft to extract ore"; counter1=0;
		Buildings.mine.addworker.miner = 1;
	} else if(exploreCount===10){
		logStatement("The exploring party found a site by the river to extract clay.");
		Stuff.addResourceLine("clay");
		Jobs.addJobElement("clayworker");
		Research.addResearchButton("Brickmaking");
		
	} else if(exploreCount===14){
		logStatement("All the the immediate area around the base camp has been mapped. The next expeditions will need to venture futher along the valley or up the foothills.");
	} else if(exploreCount===15) {
		logStatement("The last group of explorers barely scared off a wild bearling. They advise that all future exploring missions be armed.");
		//need to add a place and mechanic for making and storing weapons (need a few expensive items - should have a making... bar in the armory and only whole numbered items)
		//spears should be in the Stuff object by the resource line should appear somewhere else (different tab or below a line break in resource pannel)
		//also need a way to return some of the special items (and lose some of them each trip). for now just lose all of them
		exploreStuff.spear = 1;
	} else {
		document.getElementById("statement").innerHTML = "Your explorers map some areas but find nothing of use"; counter1=10;
	}
	//add in an ungrade or building with a small penalty to auto-explore if you have enough stuff?
	exploring = false;
}

////////////////////////////////////////////////////////////////game loop////////////////////////////////////////////////////////////////////////////////////////

function run(){ 

	//clear the message to player after ~some seconds
	if(document.getElementById("statement").innerHTML!="&nbsp"){
		counter1++;
		if(counter1>50) {
			document.getElementById("statement").innerHTML = "&nbsp";
			counter1 = 0;
		}
	}



//check for events met to unlock new content

	//win the game for now
	if(Stuff.copper.stored<5){
		alert("That's it for now - check back later for more content. Thanks for playing!");
	}

	if(Buildings.shack.count==2&& Token[1]){
		wandererStr = "Soon another wanderer joins you in your work. More will surely come and stay if you have space to house them.";
		statementLog = wandererStr + "<br><br>" + statementLog;
		document.getElementById("logOut").innerHTML = statementLog;
		document.getElementById("statement").innerHTML = wandererStr; counter1 = 0;
		Token[1] = false;
	}
	//add forest box and woodcutter job
	if(Buildings.shack.count==3&& Token[2]){
		
		Stuff.wood.unlocked=true;

		Jobs.addJobBox("forest");
		Jobs.addJobElement("woodcutter");
		woodcutStr = "You should head back into the forest and cut more wood to continue building";
		statementLog = woodcutStr + "<br><br>" + statementLog;
		document.getElementById("logOut").innerHTML = statementLog;
		document.getElementById("statement").innerHTML = woodcutStr; counter1 = 0;
		Token[2] = false;
	}
	//statement - buildings cost more as you build them
	if(Buildings.shack.count==4&& Token[3]){
		morebuildStr = "As you build more buildings they will require more resources. Why? Because that's what we do in this genre.";
		statementLog = morebuildStr + "<br><br>" + statementLog;
		document.getElementById("logOut").innerHTML = statementLog;
		document.getElementById("statement").innerHTML = morebuildStr; counter1 = 0;
		Token[3] = false;
	}
	//adds hillside box and rockcutter job
	if(Buildings.shack.count>5&& Token[4]){

		Jobs.addJobBox("hillside");
		Jobs.addJobElement("rockcutter");

		//change to addResourceLine() call
		Stuff.addResourceLine("rock");
		Stuff.rock.unlocked=true;
		/////
		quarryStr = "One of the workers finds a small rocky clearing that can be turned into a quarry";
		statementLog = quarryStr + "<br><br>" + statementLog;
		document.getElementById("logOut").innerHTML = statementLog;
		document.getElementById("statement").innerHTML = quarryStr; counter1 = 0;
		Token[4] = false;
	}
	//unlocks shed (Woodshed)
	if(Buildings.shack.count>7){
		unlock("shed");
	}
	//unlocks expandQ (Expand Quarry)
	if(Buildings.shed.count>0 && Stuff.rock.stored>30) {
		unlock("expandQ");
	}
	//unlocks farm
	if(Buildings.expandQ.count>0){
		unlock("farm");
	}
	//unlocks barn
	if(Buildings.shed.count>2 && Buildings.expandQ.count>1){
		unlock("barn");
	}
	//unlocks mill
	if(Buildings.shack.count>8 && Buildings.shed.count>3 && Buildings.barn.count>0){
		unlock("mill");
	}
	//unlocks workshop
	if(Buildings.shack.count>8 && Buildings.expandQ.count>2 && Buildings.mill.count>0){
		unlock("workshop");
	}
	//unlocks hut
	if(!Buildings.hut.unlocked && Buildings.mill.count>0 && Buildings.workshop.count>0){
		unlock("hut");
	}
	//makes panel/tabs buttons visible (inline)
	if(Buildings.shack.count + Buildings.hut.count>=20 && Token[5]){
		shantyStr = "Your little camp has grown into a shanty town. You decide to form a council to govern and make decisions.";
		statementLog = shantyStr + "<br><br>" + statementLog;
		document.getElementById("logOut").innerHTML = statementLog;
		document.getElementById("statement").innerHTML = shantyStr; counter1 = 0;
		document.getElementById("title").innerHTML = "Camp Carlyhead";
		Token[5] = false;

		//give the town hall button a red color
		alertPanel("pan4");

		document.getElementById("butt1").style.display = "inline";
		document.getElementById("butt2").style.display = "inline";
		document.getElementById("butt4").style.display = "inline";
	}
	//increase rock and stone production 
	if(Research.StoneAxe.completion>350&&Token[6]){
		Token[6]=false;
		logStatement("Stone production is low. Maybe better mason tools would help.");
		Research.addResearchButton("StoneChisel");
		alertPanel("pan3");
	}
	//remove the first mine as useless
	if(Buildings.mine.tempCount===1&&Token[7]){
		Token[7] = false;
		if(Token[10]){
			document.getElementById("mineBuild").removeEventListener("click",addBuildingEvent);
		}
	}
	if(Buildings.mine.count===1&&Token[8]){
		Token[8]=false;
		if(Token[10]){
			logStatement("The first mine yielded no usable resources. Another site must be located.")
			document.getElementById("mineBuild").className = "deadBuilding";
		} else {
			logStatement("The first mine yielded no usable resources. You can try building a mineshaft at the second location.")
		}
	}
	if(Buildings.mine.count===2&&Token[9]){
		Token[9]=false;
		logStatement("This mine produces copper ore which can be smelted into copper.")
		Stuff.addResourceLine("cu_ore");
	}
	//unlocks warehouse
	if(Stuff.clay.unlocked&&Stuff.cu_ore.stored>10&&Stuff.clay.stored>10){
		unlock("warehouse");
	}

//phase 1 done? - phase 2 unlocks from research - more phase 3 unlocks below?//
//******************************************


	/////////continue the construction of new buildings
	if (buildBuild.length>0){
		buildUp()
	}

	//////increment research///////////////////
	if(ActiveRes != " " && !Research[ActiveRes]["done"]){
		researchIncr(ActiveRes);
	}

	//continue exploring
	if(exploring){
		exploreUp();
	}

	//////increment resources///////////////////
	Jobs.incrRes();
	Buildings.incrRes();
	if(cheating){
		for(var i in Stuff){
			Stuff[i]["stored"]=Stuff[i]["maxstored"];
		}
	}

	///////consume food/////////////////////////
	document.getElementById("food").innerHTML = Stuff["food"]["stored"].toFixed(1);
	Stuff.food.stored=(Stuff.food.stored*10-(allworkers*6*factor))/10;//should put allworkers as freeworkersMax/maxfreeworkers and clean up "allworkers" variable
	
	//panic if there is not enough food
	if(Stuff.food.stored<1){

		bodyy.className = "alert2"; //gets set back to class="normal" by a transition listener to make the flash effect
		//bodyy.className = "normal";
		document.getElementById("statement").innerHTML = "In a food-shortage panic all available workers take to hunting";
		counter1=0;
	
		tempFood = 0; 

		for(var i in Jobs){
			
			if(Jobs[i]["unlocked"] && i!=="farmer"){

				tempFood+=Jobs[i]["workers"];
				Jobs[i]["workers"] = 0;
				document.getElementById(i + "s").innerHTML = Jobs[i]["workers"];
			}
		}
		Jobs.hunter.workers = tempFood;
		Stuff.food.stored = Stuff.food.maxstored/3;
		document.getElementById("hunters").innerHTML = Jobs.hunter.workers;

	} 





} setInterval(run,200);


//////////////////////////////////////////////////////////end of game loop//////////////////////////////////////////////////////





//button to test a function
function testFunc(){
	for(var x in Stuff){
    
		Stuff[x]["stored"] = Stuff[x]["maxstored"];
	
	}

}


/////////////////////////////////////////local storage to save the game?///////////////

function storageAvailable(type) {
	try {
		var storage = window[type],
			x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	}
	catch(e) {
		return false;
	}
}

//taken from MDN tutorial on Storage
function saveGame(){//add in the Jobs object for storage
	if (storageAvailable('localStorage')) {
		console.log('Yippee! We can use localStorage awesomeness');

		data.set("Stuff", Stuff);
		data.set("Buildings", Buildings);
		data.set("Jobs", Jobs);
		data.set("GlobVar", GlobVar);
	}
	else {
		alert('Too bad, no localStorage for us');
	}
}

function load(){//oh this is going to be fun 
	if (storageAvailable()){
	//need to check whether these things exist?
	Stuff = data.get("Stuff");
	Buildings = data.get("Buildings");
	Jobs = data.get("Jobs");
	GlobVar = data.get("GlobVar");

	//and oh gee, how do I even start this
	//update to the stored values of all resources, maxes, buildings, costs  add refreshAmounts() function
	for (var i in Stuff){
		if (Stuff[i]["unlocked"]){
			Stuff.addResourceLine(i);
			document.getElementById(i) = Stuff[i]["stored"];
			document.getElementById(i+"Max") = Stuff[i]["maxstored"];
		}
	}
	for (var i in Buildings){
		if (Buildings[i]["unlocked"]){
			document.getElementById("")
		}
	}
	//show the values that have been unlocked
	//if there are more than X people show buttons up to butt3
	//if there is a councilhall then show butt4
	
	}
}

function prestige(){
	knowledge += Jobs.freeworker.maxworkers;
	localStorage.setItem("Knowledge",knowledge);
	//do I save knowledge and reload the page or reset the stored amounts of everything to 0 and refreshAmounts()?
	window.location.reload(false);//seems easiest
	knowledge = localStorage.getItem("Knowledge");
}

//taken from Alex Grande on stackoverflow, thanks
var data = {
  set: function(key, value) {
    if (!key || !value) {return;}

    if (typeof value === "object") {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  },
  get: function(key) {
    var value = localStorage.getItem(key);

    if (!value) {return;}

    // assume it is an object that has been stringified
    if (value[0] === "{") {
      value = JSON.parse(value);
    }

    return value;
  }
}


/*more ideas for methods - or make these into constructors?
function addResource(resName, parameters){
	Stuff[resName]={parameters};
}
function addJob(jobName, parameters){
	Jobs[jobName] = {parameters};
}
function addBuildings(buildName, parameters){
	Buildings[buildName] = {cost:costPara, count:0,}
}
*/






/* another way to create the new buildings and jobs - maybe try later
function createMansions() {
	var p1 = document.createElement("p");
	var t1 = document.createTextNode("Mansion: ");
	var s1 = document.createElement("span");
	s1.id="mansion";
	s1.appendChild(document.createTextNode("0"));
	var b1 = document.createElement("button")
	b1.appendChild(document.createTextNode("Build"));
	
	p1.appendChild(t1);
	p1.appendChild(s1);
	p1.appendChild(document.createTextNode(" "));
	p1.appendChild(b1);
	p1.appendChild(document.createTextNode(" Cost: 150 wood, 50 rock"))
	
	document.getElementById("test").appendChild(p1);
}
*/

/* Story ideas

Once you build up enough, barbarians attack you (must maintain troops and improve their armor/weapons - later can build walls or other fortifications to reduce number of soldiers needed for protection)
Once the city is very large whoever started the Great War comes for you
Say that you grow old and you pick a new leader after some time - could be related to prestige 
Some sort of exploring/making contact with the Great City or other civilizations (kittens?)
Electrical power
Add a hint button? - this can be handled in a subreddit thread (need to indicate shift-click and control-click)
Mkae it take random time for new workers to join up?

"As the town grows in size and reputation, more skilled workers are attracted. They offer insight and specialty on increasingly complex opperations"
*/