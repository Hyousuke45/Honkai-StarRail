function sum(arr) {
  return arr.reduce((a, b) => a + b, 0);
}


const StatList = [
  "ATKflat", "ATKpercent", "HPflat", "HPpercent", 
  "CRIT_Rate", "CRIT_DMG", "SPD", "EHR", 
  "DEFpercent", "DEFflat", "Break_Effect", 
  "ERR", "Healing", "ERes"
];




const Elemental = ["Physical", "Fire", "Wind", "Quantum", "Ice", "Imaginary", "Lightning"];

const BaseVal = [
  "Base_HP", "Base_ATK", "Base_DEF", "Base_SPD"
];



function Character_name() {


    fetch('Elements.json')
        .then(response =>{
            if (!response.ok) {
            throw new Error("Failed to load JSON");
            }
            return response.json();
        })  
        .then(data =>{
            Data = data;


    const prev_icon = document.getElementById("previous_icon");
    const current_icon = document.getElementById("current_icon");


    const prev_name = document.getElementById("Character_name_previous");
    const current_name = document.getElementById("Character_name_current");

    
    const selected = dropdownCharacters.value;
        
   
    console.log(Characters[selected].Path);

    current_icon.classList.remove("Fade-in");
    prev_icon.classList.remove("Fade-out");

if (current_icon.getAttribute("src") && current_icon.getAttribute("src").trim() !== "") {
  // Image src is set and not empty
  prev_icon.src = current_icon.src;
  void prev_icon.offsetWidth;
  prev_icon.classList.add("Fade-out");
}

    

 

    
    current_name.classList.remove("Fade-in");
    current_name.classList.remove("pacity-zero");
    
    prev_name.classList.remove("Character_name-prev");
    prev_name.innerHTML = `<strong>${document.getElementById("Character_name_current").innerText}</strong>`;
    prev_name.classList.add("Character_name-prev");

    
  
    
    
    current_icon.src = Data[Characters[selected].Path];

    setTimeout(() => {
        current_name.innerHTML = `<strong>${selected}</strong>`;
        current_name.classList.add("Fade-in");
        
    }, 100);
    setTimeout(() => {
        current_icon.classList.add("Fade-in");
    }, 200);
        })

}










    




// FUNCTION SA CALCULATION EYOW WTF?
  function calculate() {
  try {
    let status = Array.from({ length: 14 }, () => [0]);
    let elemStat = Array.from({ length: 7 }, () => [0]);
    let baseStat = Array.from({ length: 7 }, () => [0]);

    let baseCritRate = 0;
    let baseCritDMG = 0;
    let baseHealing = 0;
    let baseEHR = 0;
    let baseERR = 0;
    let baseBE = 0;
    let baseERes = 0;


    const relic = document.getElementById("RelicDropdown").value;

    const name = document.getElementById("characterDropdown").value;
    
    const lc = document.getElementById("LightconeDropdown").value;
    // const relicSetUse = document.getElementById("RelicSetUseSelect").value;
    // const relicStatus = document.getElementById("RelicStatusSelect").value;
    
    // const [status, elemStat, baseStat] = StatCal(name, lc, relicSetUse, relicStatus); // assume StatCal is defined
    if (name !== ""){
    const charStatskey = (Characters[name]["Base_Stats"]);

    baseCritRate = (Characters[name]["Base_Stats"].Base_CritRate);
    baseCritDMG = (Characters[name]["Base_Stats"].Base_CritDMG);
    baseHealing = Characters[name]["Base_Stats"].Base_Healing;
    baseEHR = Characters[name]["Base_Stats"].Base_EHR;
    baseERR = Characters[name]["Base_Stats"].Base_ERR;
    baseBE = Characters[name]["Base_Stats"].Base_Break_Effect;
    baseERes = Characters[name]["Base_Stats"].Base_ERes;



    const element = Characters[name]["Element"];
        
    //    console.log(Characters[name]["Traces"]);
        
 for (const key in charStatskey) {
  
  if (StatList.includes(key)) {
    const index = StatList.indexOf(key);
    status[index].push(charStatskey[key]);
  } 
  
  
  else if (BaseVal.includes(key)) {
    const index = BaseVal.indexOf(key);
    baseStat[index].push(charStatskey[key]);
  }}


  for (const key in Characters[name]["Traces"]) {
    
    if (Elemental.includes(key)) {
    console.log(element);
    const index = Elemental.indexOf(element);
    console.log(index);
    elemStat[index].push(Characters[name]["Traces"][element].reduce((total, value) => total + value, 0));
    // console.log((Characters[name]["Traces"][element].reduce((total, value) => total + value, 0)));
    }

    if (StatList.includes(key)) {
        
        const index = StatList.indexOf(key);
        status[index].push(Characters[name]["Traces"][key].reduce((total, value) => total + value, 0));
        


    }

  };

    }


if (lc !== ""){
    let LCStats = (LightCones[lc]["Base_Stats"]);
    

  console.log("SULOD?????")
 for (const key in LCStats) {
  
  
  if (StatList.includes(key)) {
    const index = StatList.indexOf(key);
    status[index].push(LCStats[key]);
  } 
  else if (Elemental.includes(key)) {
    const index = Elemental.indexOf(key);
    elemStat[index].push(LCStats[key]);
  } 



  else if (BaseVal.includes(key)) {
    const index = BaseVal.indexOf(key);
    baseStat[index].push(LCStats[key]);
  }
};
}





if (relic !== ""){

  

  console.log("SULOD sa RELIC?????")
 for (const key1 in Relics[relic]["Status"]) {
  

  for (const key in Relics[relic]["Status"][key1]){

  const relic_val = Relics[relic]["Status"][key1][key];
  console.log(key);
  console.log(StatList)


  if (StatList.includes(key)) {
    console.log("added to status")
    const index = StatList.indexOf(key);
    status[index].push(relic_val);
    
  } 
  else if (Elemental.includes(key)) {
    const index = Elemental.indexOf(key);
    elemStat[index].push(relic_val);
  } 

  else if (BaseVal.includes(key)) {
    const index = BaseVal.indexOf(key);
    baseStat[index].push(relic_val);
  }}



};
}









    // Base stats
    let baseHP = 0 + sum(baseStat[0]);
    let baseATK = 0 + sum(baseStat[1]);
    let baseDEF = 0 + sum(baseStat[2]);
    let baseSPD = 0 + sum(baseStat[3]);
    console.log(baseHP)




    
    // Elemental Damage (if needed)
    let physical = sum(elemStat[0]);
    let fire = sum(elemStat[1]);
    let wind = sum(elemStat[2]);
    let quantum = sum(elemStat[3]);
    let ice = sum(elemStat[4]);
    let imaginary = sum(elemStat[5]);
    let lightning = sum(elemStat[6]);

    // Additional stats
    const addHP = Math.trunc(baseHP) * (sum(status[3]) / 100) + sum(status[2]);
    const addATK = Math.trunc(baseATK) * (sum(status[1]) / 100) + sum(status[0]);
    const addDEF = Math.trunc(baseDEF) * (sum(status[8]) / 100) + sum(status[9]);
    const addSPD = sum(status[6]);
    const addBE = sum(status[10]);
    const addERR = sum(status[11]);
    const addHealing = sum(status[12]);
    const addEHR = sum(status[7]);
    const addERes = sum(status[13]);

    // Overall stats
    const overallHP = 0 + Math.trunc(baseHP) + addHP;
    const overallATK = 0 + Math.trunc(baseATK)+ addATK;
    const overallDEF = 0 + Math.trunc(baseDEF) + addDEF;
    const overallSPD = 0 + Math.trunc(baseSPD) + addSPD;
    const overallBE = 0 + Math.trunc(baseBE) + addBE;
    const overallER = 0 + Math.trunc(baseERR) + addERR;
    const overallHealing = 0 + Math.trunc(baseHealing) + addHealing;
    const overallEHR = 0 + Math.trunc(baseEHR) + addEHR;
    const overallERes = 0 + Math.trunc(baseERes) + addERes;

    const overallCritRate = baseCritRate + sum(status[4]);
    const overallCritDMG = baseCritDMG + sum(status[5]);

    console.log("Final Stats:", {
      overallHP,
      overallATK,
      overallDEF,
      overallSPD,
      overallCritRate,
      overallCritDMG,


      overallBE,
      overallER,
      overallHealing,
      overallEHR,
      overallERes,



    physical,
    fire ,
    wind,
    quantum,
    ice,
    imaginary,
    lightning,



    });


    const element_HP = document.getElementById("Main_Stats_Display_HP");
    const element_ATK = document.getElementById("Main_Stats_Display_ATK");
    const element_DEF = document.getElementById("Main_Stats_Display_DEF");
    const element_SPD = document.getElementById("Main_Stats_Display_SPD");
    const element_CRTr = document.getElementById("Main_Stats_Display_CRTr");
    const element_CRTd = document.getElementById("Main_Stats_Display_CRTd");


    const element_HP_final = document.getElementById("Main_Stats_Display_HP_final");
    const element_ATK_final = document.getElementById("Main_Stats_Display_ATK_final");
    const element_DEF_final = document.getElementById("Main_Stats_Display_DEF_final");
    const element_SPD_final = document.getElementById("Main_Stats_Display_SPD_final");
    const element_CRTr_final = document.getElementById("Main_Stats_Display_CRTr_final");
    const element_CRTd_final = document.getElementById("Main_Stats_Display_CRTd_final");


    const BE = document.getElementById("BE");
    const ERR = document.getElementById("ERR");
    const EHR = document.getElementById("EHR");
    const ER = document.getElementById("ER");
    const OH = document.getElementById("OH");
    const ElementalDMG = document.getElementById("ElementalDMG");

    const BE_final = document.getElementById("BE_final");
    const ERR_final = document.getElementById("ERR_final");
    const EHR_final = document.getElementById("EHR_final");
    const ER_final = document.getElementById("ER_final");
    const OH_final = document.getElementById("OH_final");
    const ElementalDMG_final = document.getElementById("ElementalDMG_final");











    const image2 = document.getElementById("black_panel1");
    const image4 = document.getElementById("black_panel3");
    const image3 = document.getElementById("black_panel2");
    const stats = document.getElementById("Stats_Display");


    let element;

    try {
    element = Characters[name]["Element"]
    } catch {
        console.log("no character")
    }

    
    element_HP.classList.remove("text-move");
    element_ATK.classList.remove("text-move");
    element_DEF.classList.remove("text-move");
    element_SPD.classList.remove("text-move");
    element_CRTr.classList.remove("text-move");
    element_CRTd.classList.remove("text-move");

    element_HP_final.classList.remove("text-move");
    element_ATK_final.classList.remove("text-move");
    element_DEF_final.classList.remove("text-move");
    element_SPD_final.classList.remove("text-move");
    element_CRTr_final.classList.remove("text-move");
    element_CRTd_final.classList.remove("text-move");

    BE.classList.remove("text-move");
    ERR.classList.remove("text-move");
    EHR.classList.remove("text-move");
    ER.classList.remove("text-move");
    OH.classList.remove("text-move");
    ElementalDMG.classList.remove("text-move");

    BE_final.classList.remove("text-move");
    ERR_final.classList.remove("text-move");
    EHR_final.classList.remove("text-move");
    ER_final.classList.remove("text-move");
    OH_final.classList.remove("text-move");
    ElementalDMG_final.classList.remove("text-move");



    stats.classList.remove("stat-moveleft");
    



    document.getElementById("panel1").classList.remove("opacity-zero")
    document.getElementById("panel3").classList.remove("opacity-zero")
    document.getElementById("panel2").classList.remove("opacity-zero")

    image2.classList.remove("styled-image-blurred-panel1");
    image3.classList.remove("styled-image-blurred-panel2");
    image4.classList.remove("styled-image-blurred-panel1");

    element_HP.classList.add("opacity-zero");
    element_ATK.classList.add("opacity-zero");
    element_DEF.classList.add("opacity-zero");
    element_SPD.classList.add("opacity-zero");
    element_CRTr.classList.add("opacity-zero");
    element_CRTd.classList.add("opacity-zero");

    element_HP_final.classList.add("opacity-zero");
    element_ATK_final.classList.add("opacity-zero");
    element_DEF_final.classList.add("opacity-zero");
    element_SPD_final.classList.add("opacity-zero");
    element_CRTr_final.classList.add("opacity-zero");
    element_CRTd_final.classList.add("opacity-zero");

    BE.classList.add("opacity-zero");
    ERR.classList.add("opacity-zero");
    EHR.classList.add("opacity-zero");
    ER.classList.add("opacity-zero");
    OH.classList.add("opacity-zero");
    ElementalDMG.classList.add("opacity-zero");

    BE_final.classList.add("opacity-zero");
    ERR_final.classList.add("opacity-zero");
    EHR_final.classList.add("opacity-zero");
    ER_final.classList.add("opacity-zero");
    OH_final.classList.add("opacity-zero");
    ElementalDMG_final.classList.add("opacity-zero");


    



    stats.classList.add("opacity-zero");

    image2.classList.add("opacity-zero");
    image4.classList.add("opacity-zero");
    image3.classList.add("opacity-zero");

    fetch('Elements.json')
        .then(response =>{
            if (!response.ok) {
            throw new Error("Failed to load JSON");
            }
            return response.json();
        })  
        .then(data =>{

            

            
    

    document.getElementById("Main_Stats_Display_HP").innerHTML = `<span class = "leftstyle"> <img class = "mainstat_icons" src = "${data["HP_icon"]}" /></span> <strong>HP: ${Math.trunc(baseHP)} + ${Math.trunc(addHP)}`;
    document.getElementById("Main_Stats_Display_ATK").innerHTML = `<span class = "leftstyle"> <img class = "mainstat_icons" src = "${data["ATK_icon"]}" /></span><strong> ATK: ${Math.trunc(baseATK)} + ${Math.trunc(addATK)}`;
    document.getElementById("Main_Stats_Display_DEF").innerHTML = `<span class = "leftstyle"> <img class = "mainstat_icons" src = "${data["DEF_icon"]}" /></span><strong> DEF: ${Math.trunc(baseDEF)} + ${Math.trunc(addDEF)}`;
    document.getElementById("Main_Stats_Display_SPD").innerHTML = `<span class = "leftstyle"> <img class = "mainstat_icons" src = "${data["SPD_icon"]}" /></span><strong> SPD: ${Math.trunc(baseSPD)} + ${Math.trunc(addSPD)}`;
    document.getElementById("Main_Stats_Display_CRTr").innerHTML = `<span class = "leftstyle"> <img class = "mainstat_icons" src = "${data["CRITRate_icon"]}" /></span><strong> Crit Rate:`;
    document.getElementById("Main_Stats_Display_CRTd").innerHTML = `<span class = "leftstyle"> <img class = "mainstat_icons" src = "${data["CRITDMG_icon"]}" /></span><strong> Crit DMG:`;

    document.getElementById("Main_Stats_Display_HP_final").innerHTML = `<span class = "rightstyle"><strong>(${Math.trunc(overallHP)})</span>`;
    document.getElementById("Main_Stats_Display_ATK_final").innerHTML = `<span class = "rightstyle"><strong>(${Math.trunc(overallATK)})</span>`;
    document.getElementById("Main_Stats_Display_DEF_final").innerHTML = `<span class = "rightstyle"><strong>(${Math.trunc(overallDEF)})</span>`;
    document.getElementById("Main_Stats_Display_SPD_final").innerHTML = `<span class = "rightstyle"><strong>(${Math.trunc(overallSPD)})</span>`;
    document.getElementById("Main_Stats_Display_CRTr_final").innerHTML = `<span class = "rightstyle"><strong>${Math.trunc(overallCritRate)}%</span>`;
    document.getElementById("Main_Stats_Display_CRTd_final").innerHTML = `<span class = "rightstyle"><strong>${Math.trunc(overallCritDMG)}%</span>`;










    // force reflow
    void element_HP.offsetWidth;
    void element_ATK.offsetWidth;
    void element_DEF.offsetWidth;
    void element_SPD.offsetWidth;
    void element_CRTr.offsetWidth;
    void element_CRTd.offsetWidth;


    void element_HP_final.offsetWidth;
    void element_ATK_final.offsetWidth;
    void element_DEF_final.offsetWidth;
    void element_SPD_final.offsetWidth;
    void element_CRTr_final.offsetWidth;
    void element_CRTd_final.offsetWidth;

    void BE.offsetWidth;
    void ERR.offsetWidth;
    void EHR.offsetWidth;
    void ER.offsetWidth;
    void OH.offsetWidth;
    void ElementalDMG.offsetWidth;

    void BE_final.offsetWidth;
    void ERR_final.offsetWidth;
    void EHR_final.offsetWidth;
    void ER_final.offsetWidth;
    void OH_final.offsetWidth;
    void ElementalDMG_final.offsetWidth;










    void image2.offsetWidth;
    void image3.offsetWidth;
    void image4.offsetWidth;
    void stats.offsetWidth;


    


        setTimeout(() => {
            
        
        setTimeout(() => {
            
            image2.classList.add("styled-image-blurred-panel1");
            
            element_HP.classList.add("text-move");
            
         
        }, 0);
        setTimeout(() => {
            stats.classList.add("stat-moveleft");
            element_ATK.classList.add("text-move");
         
        }, 60);
        setTimeout(() => {
            image4.classList.add("styled-image-blurred-panel1");
           
            element_DEF.classList.add("text-move");
          
        }, 120);
        setTimeout(() => {
            image3.classList.add("styled-image-blurred-panel2");
            element_SPD.classList.add("text-move");
            
        }, 180);

        setTimeout(() => {
            element_CRTr.classList.add("text-move");
            
          
        }, 240);
        setTimeout(() => {
            element_CRTd.classList.add("text-move");
            
          
        }, 300);

        setTimeout(() => {
            
            element_HP_final.classList.add("text-move");

        }, 360);
        setTimeout(() => {

            element_ATK_final.classList.add("text-move");
        }, 420);
        setTimeout(() => {

            element_DEF_final.classList.add("text-move");
          
        }, 480);
        setTimeout(() => {
            element_SPD_final.classList.add("text-move");
          
        }, 540);
        setTimeout(() => {
            element_CRTr_final.classList.add("text-move");
          
        }, 600);
        setTimeout(() => {
            element_CRTd_final.classList.add("text-move");
          
        }, 660);

        setTimeout(() => {
            BE.classList.add("text-move");
          
        }, 720);
        setTimeout(() => {
            ERR.classList.add("text-move");
        }, 780);
        setTimeout(() => {
            EHR.classList.add("text-move");
        }, 840);
        setTimeout(() => {
            ER.classList.add("text-move");
        }, 900);
        setTimeout(() => {
            OH.classList.add("text-move");
        }, 960);
        setTimeout(() => {
            ElementalDMG.classList.add("text-move");
        }, 1020);

        // finals for the panel stats
        setTimeout(() => {
            BE_final.classList.add("text-move");
        }, 1080);
        setTimeout(() => {
            ERR_final.classList.add("text-move");
        }, 1140);
        setTimeout(() => {
            EHR_final.classList.add("text-move");
        }, 1200);
        setTimeout(() => {
            ER_final.classList.add("text-move");
        }, 1260);
        setTimeout(() => {
            OH_final.classList.add("text-move");
        }, 1320);
        setTimeout(() => {
            ElementalDMG_final.classList.add("text-move");
        }, 1380);
















        













        try {
        indexed = Elemental.indexOf(element);
        console.log(element);
        console.log(data[element]);







    document.getElementById("BE").innerHTML = `<span class="leftstyle"> <img class="mainstat_icons" src="${data["Break_effect_icon"]}" /></span><strong> Break Effect:`;
    document.getElementById("ERR").innerHTML = `<span class="leftstyle"> <img class="mainstat_icons" src="${data["Energy_regen_icon"]}" /></span><strong> Energy Regeneration:`;
    document.getElementById("EHR").innerHTML = `<span class="leftstyle"> <img class="mainstat_icons" src="${data["Effect_hit_rate_icon"]}" /></span><strong> Effect Hit Rate:`;
    document.getElementById("ER").innerHTML = `<span class="leftstyle"> <img class="mainstat_icons" src="${data["Effect_res"]}" /></span><strong> Effect RES:`;
    document.getElementById("OH").innerHTML = `<span class="leftstyle"> <img class="mainstat_icons" src="${data["Healing"]}" /></span><strong> Outgoing Healing:`;
    document.getElementById("ElementalDMG").innerHTML = `<span class="leftstyle"><img class="mainstat_icons" src="${data[element]}" /></span><strong> ${element} DMG Boost:`;







    // document.getElementById("BE").innerHTML = `<span class = "leftstyle-panel-stat"> <img class = "stat_icons" src = "${data["Break_effect_icon"]}" /></span> <strong> Break Effect:`;
    // document.getElementById("EHR").innerHTML = "<span class = 'leftstyle-panel-stats'><img class = 'stat_icons' src = '" + data["Effect_hit_rate_icon"] + "' /></span><strong> Effect Hit Rate:</strong> ";
    // document.getElementById("ER").innerHTML = "<span class = 'leftstyle-panel-stats'><img class = 'stat_icons' src = '" + data["Effect_res"] + "' /></span><strong> Effect RES:</strong> ";
    // document.getElementById("OH").innerHTML = "<span class = 'leftstyle-panel-stats'><img class = 'stat_icons' src = '" + data["Healing"] + "' /></span><strong> Outgoing Healing:</strong> ";
    // document.getElementById("ElementalDMG").innerHTML = `<span class = "leftstyle-panel-stats"><img src = "${data[element]}" /></span>${element} DMG Boost:<span class = "rightstyle-panel">${Math.trunc(sum(elemStat[indexed]))}%</span>`







    document.getElementById("BE_final").innerHTML = `<strong> ${Math.trunc(overallBE)}%`;
    document.getElementById("ERR_final").innerHTML = "<strong> " + Math.trunc(overallER) + "%";
    document.getElementById("EHR_final").innerHTML = "<strong> " + Math.trunc(overallEHR) + "%";
    document.getElementById("ER_final").innerHTML = "<strong> " + Math.trunc(overallERes) + "%";
    document.getElementById("OH_final").innerHTML = "<strong> " + Math.trunc(overallHealing) + "%";
    document.getElementById("ElementalDMG_final").innerHTML = `<strong> ${Math.trunc(sum(elemStat[indexed]))}%`;

    // stats.innerHTML = `<strong> 
    //                             <span class = "leftstyle-panel-stats"><img class = "stat_icons" src = "${data["Break_effect_icon"]}" /></span> Break Effect:<span class = "rightstyle-panel">${Math.trunc(overallBE)}%</span><br>
    //                             <span class = "leftstyle-panel-stats"><img class = "stat_icons" src = "${data["Energy_regen_icon"]}" /></span> Energy Regeneration Rate:<span class = "rightstyle-panel">${Math.trunc(overallER)}%</span><br>
    //                             <span class = "leftstyle-panel-stats"><img class = "stat_icons" src = "${data["Effect_hit_rate_icon"]}" /></span> Effect Hit Rate:<span class = "rightstyle-panel">${Math.trunc(overallEHR)}%</span><br>
    //                             <span class = "leftstyle-panel-stats"><img class = "stat_icons" src = "${data["Effect_res"]}" /></span> Effect RES:<span class = "rightstyle-panel">${Math.trunc(overallERes)}%</span><br>
    //                             <span class = "leftstyle-panel-stats"><img class = "stat_icons" src = "${data["Healing"]}" /></span> Outgoing Healing:<span class = "rightstyle-panel">${Math.trunc(overallHealing)}%</span><br>
    //                             <span class = "leftstyle-panel-element"><img src = "${data[element]}" /></span>${element} DMG Boost:<span class = "rightstyle-panel">${Math.trunc(sum(elemStat[indexed]))}%</span><br>`;









        } catch {
            console.log("NO FUCKING LIGHTCONE BITCH")
        }



})

}, 200);

  } catch (e) {
    console.error("Error calculating stats:", e);
  }
}




function relic_name(){
  const Relic_2Piece_effect_name = ((Relics[relic_icon]["Status"]["2-Piece"]["Description"]));
  current_relic_name.classList.remove("text-move-set");
  current_relic_name.classList.add("opacity-zero");
  previous_relic_name.classList.remove("Fade-out");

  void previous_relic_name.offsetWidth;
  

  

  
  
  if (current_relic_name.innerHTML.trim() !== "") {
  previous_relic_name.innerHTML = current_relic_name.innerHTML;
  previous_relic_name.classList.add("Fade-out");
  }

  current_relic_name.innerHTML = `<span><img class = "set_icon" src="${Relics[relic_icon].Icon}" /></span><strong>2 Piece effect:<br></strong>${Relic_2Piece_effect_name}`;
  void current_relic_name.offsetWidth;

  current_relic_name.classList.add("text-move-set");
  
}



function planar_name(){
 
  current_planar_name.classList.remove("text-move-set");
  current_planar_name.classList.add("opacity-zero");
  previous_planar_name.classList.remove("Fade-out");

  void previous_planar_name.offsetWidth;
  
  if (current_planar_name.innerHTML.trim() !== "") {
  previous_planar_name.innerHTML = current_planar_name.innerHTML;
  previous_planar_name.classList.add("Fade-out");
  }


  current_planar_name.innerHTML = `<span><img class = "set_icon" src="${Planars[planar_icon].Icon}" /></span><strong>2 Piece effect:</strong><br>`;

  
  
  
  void current_planar_name.offsetWidth;

  current_planar_name.classList.add("text-move-set");
  
}




function  reset_icon_rotation() {
  console.log("call as fuck")
  const reset_icon = document.getElementById("reset_icon");
  reset_icon.classList.remove("animate_rotate");
  void reset_icon.offsetWidth;
  reset_icon.classList.add("animate_rotate");
}
  