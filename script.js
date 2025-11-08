



let {Name, LC, RelicSetUse, RelicStatus} = "Select"


let Characters = {};
let LightCones = {};
let Relics = {};
let relic_icon = "";
let planar_icon = "";
let Planars = {};


const image = document.getElementById("black")
const stat_container =  document.getElementById("Main_Stats_Label");

const relic_selection = document.getElementById("RelicDropdown")
const planar_selection = document.getElementById("PlanarDropdown")

const dropdownCharacters = document.getElementById("characterDropdown");
const currentImage = document.getElementById("currentImage");
const previousImage = document.getElementById("previousImage");

const currentImage_icon = document.getElementById("currentImage-icon");
const previousImage_icon = document.getElementById("previousImage-icon");


const current_relic_name = document.getElementById("current-relic-name");
const previous_relic_name = document.getElementById("previous-relic-name");


const current_planar_name = document.getElementById("current-planar-name");
const previous_planar_name = document.getElementById("previous-planar-name");


const reset_button = document.getElementById("reset_button");

const reset_button_div = document.getElementById("reset_button_div");
const reset_icon = document.getElementById("reset_icon");



// const currentImage_art = document.getElementById("currentImage-art");
// const previousImage_art = document.getElementById("previousImage-art");

// const currentImage_effect = document.getElementById("currentImage-effect");
// const previousImage_effect = document.getElementById("previousImage-effect");


fetch("Characters.json")
  .then(response => response.json())
  .then(data => {
    Characters = data;
    
    Object.keys(data).forEach(name => {

      const option = document.createElement("option");
      option.value = name;
      option.textContent = name;
      dropdownCharacters.appendChild(option);
    });

    dropdownCharacters.addEventListener("change", () => {
      const selected = dropdownCharacters.value;
      Name = selected;
      calculate();
      imageAppear();
    Character_name();
      const imageSrc = data[selected].Splash_art;
        const Icon = data[selected].Icon;
    //   const Character_Splash_art = data[selected].Character_Splash_art;

    //   const Character_Splash_effect = data[selected].Character_Splash_effect;


      // Move current image to previous
      previousImage_icon.src = currentImage_icon.src;
      previousImage.src = currentImage.src;
        // previousImage_art.src = currentImage_art.src;
        // previousImage_effect.src = currentImage_effect.src;


      previousImage.className = "character-image fade-out";
      previousImage_icon.className = "icon-image fade-out";
    // previousImage_art.className = "character-image fade-out";
    //     previousImage_effect.className = "character-image fade-out";

      
    
      // Prepare current image
      currentImage.className = "character-image"; // Reset classes
      currentImage.src = ""; // Clear to trigger load
      void currentImage.offsetWidth; // Force reflow to restart animation

    currentImage_icon.className = "icon-image"; // Reset classes
      currentImage_icon.src = ""; // Clear to trigger load
      void currentImage_icon.offsetWidth; // Force reflow to restart animation
    



            
        
    //     currentImage_art.className = "character-image"; // Reset classes
    //   currentImage_art.src = ""; // Clear to trigger load
    //   void currentImage_art.offsetWidth; // Force reflow to restart animation
          

       
    //     currentImage_effect.className = "character-image"; // Reset classes
    //   currentImage_effect.src = ""; // Clear to trigger load
    //   void currentImage_effect.offsetWidth; // Force reflow to restart animation




      currentImage.src = imageSrc;
      currentImage_icon.src = Icon;
    //   currentImage_art.src = Character_Splash_art;
    //   currentImage_effect.src = Character_Splash_effect;


      currentImage.onload = () => {
        
        currentImage.className = "character-image fade-in-1";

        currentImage_icon.className = "icon-image fade-in";
        // currentImage_art.className = "character-image fade-in-2";
        // currentImage_effect.className = "character-image fade-in-3";

 
        // Optional: hide previous after animation
        setTimeout(() => {
            previousImage.className = "character-image hidden";
            previousImage_icon.className = "icon-image hidden";
        //   previousImage_art.className = "character-image hidden";
        //   previousImage_effect.className = "character-image hidden";

        }, 600);
      };


    
  });
})



// Make sure 'dropdown' is defined (e.g., from your HTML)
const dropdownLightcones = document.getElementById("LightconeDropdown");
const currentImageLightcone = document.getElementById("currentImageL");
const previousImageLightcone = document.getElementById("previousImageL");



fetch("Lightcones.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(data => {
    LightCones = data;
    Object.keys(data).forEach(name => {
      const option = document.createElement("option");
      option.value = name;
      option.textContent = name;
      dropdownLightcones.appendChild(option);
    });
 
    dropdownLightcones.addEventListener("change", function() {
      const selected = dropdownLightcones.value;
      LC = selected;
      calculate();
      imageAppear();
      const imageSrcL = data[selected].Image;

      // Move current image to previous
      previousImageLightcone.src = currentImageLightcone.src;
      previousImageLightcone.className = "Lightcone-image fade-out";

      // Prepare current image
      currentImageLightcone.className = "Lightcone-image"; // Reset classes
      currentImageLightcone.src = ""; // Clear to trigger load
      void currentImageLightcone.offsetWidth; // Force reflow to restart animation

      currentImageLightcone.src = imageSrcL;
      currentImageLightcone.onload = () => {
        currentImageLightcone.className = "Lightcone-image fade-in";


    
    
        // Optional: hide previous after animation

        setTimeout(() => {
          previousImageLightcone.className = "Lightcone-image hidden";
        }, 600);

      };
  });
  });
















function imageAppear(){


    stat_container.classList.remove("opacity-zero");


    relic_selection.className = ("RelicDropdown-anim");
    
    reset_icon.classList.remove("opacity-zero");
    reset_button_div.classList.add("reset_button-anim");

    setTimeout(() => {
      planar_selection.className = ("RelicDropdown-anim");
    }, 100);
    

}






// RelicSetUse, RelicStatus


// function StatCal(Name, LC,) {
//   const Status = Array.from({ length: 14 }, () => [0]);
//   const ElemStat = Array.from({ length: 7 }, () => [0]);
//   const BaseStat = Array.from({ length: 7 }, () => [0]);

//   // Add trace stats
//   if (Name !== "Select") {
//     const traces = Characters.Characters[Name]["Traces"];
//     for (let stats in traces) {
//       if (s.StatList.includes(stats)) {
//         const indexuse = s.StatList.indexOf(stats);
//         const sumTrace = traces[stats].reduce((a, b) => a + b, 0);
//         Status[indexuse].push(sumTrace);
//       } else if (s.Elemental.includes(stats)) {
//         const indexuse = s.Elemental.indexOf(stats);
//         const sumTrace = traces[stats].reduce((a, b) => a + b, 0);
//         ElemStat[indexuse].push(sumTrace);
//       }
//     }
//   }

//   // Add lightcone base stats
//   if (LC !== "Select") {
//     const lcStats = Lightcones.Lightcones[LC]["Base_Stats"];
//     for (let stats in lcStats) {
//       const index = s.BaseVal.indexOf(stats);
//       BaseStat[index].push(lcStats[stats]);
//     }
//   }

//   // // Add relic set bonus
//   // if (RelicSetUse !== "Select") {
//   //   const statName = Relic.RelicSets[RelicSetUse]["2 piece"][0];
//   //   const bonusValue = Relic.RelicSets[RelicSetUse]["2 piece"][1];
//   //   const RelicIndex = s.StatList.indexOf(statName);
//   //   Status[RelicIndex].push(bonusValue);
//   // }

//   // // Add relic piece stats
//   // for (let piece in PhainonStatus.Piece2) {
//   //   for (let stats in PhainonStatus.Piece2[piece]) {
//   //     const value = PhainonStatus.Piece2[piece][stats];

//   //     if (stats === "Main") {
//   //       const mainStat = value[0];
//   //       const mainValue = value[1];

//   //       if (s.Elemental.includes(mainStat)) {
//   //         const index = s.Elemental.indexOf(mainStat);
//   //         ElemStat[index].push(mainValue);
//   //       } else {
//   //         const index = s.StatList.indexOf(mainStat);
//   //         Status[index].push(mainValue);
//   //       }
//   //     } else {
//   //       const index = s.StatList.indexOf(stats);
//   //       const statValue = stats === "CRIT_Rate" || stats === "CRIT_DMG"
//   //         ? Math.round(value * 1000) / 1000
//   //         : value;

//   //       Status[index].push(statValue);
//   //     }
//   //   }
//   // }

//   return { Status, ElemStat, BaseStat };
// }




  const selected_relic = document.getElementById("RelicDropdown");

  fetch("Relics.json")
    .then(response => response.json())
    .then(data => {
      Relics = data;

      // Loop through each top-level key in the JSON
      Object.keys(data).forEach(name => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        selected_relic.appendChild(option);  // Use the correct dropdown element
      });

      // Optional: Add change event listener
      selected_relic.addEventListener("change", () => {
      relic_icon = relic_selection.value;
      
        calculate();
        relic_name()



      });
    })
    .catch(error => {
      console.error("Failed to load Relics.json:", error);
    });






  const selected_planar = document.getElementById("PlanarDropdown");

  fetch("Planar.json")
    .then(response => response.json())
    .then(data => {
      Planars = data;

      // Loop through each top-level key in the JSON
      Object.keys(data).forEach(name => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        selected_planar.appendChild(option);  // Use the correct dropdown element
      });

      // Optional: Add change event listener
      selected_planar.addEventListener("change", () => {
        planar_icon = planar_selection.value;
        
        
        calculate();
        planar_name()



      });
    })
    .catch(error => {
      console.error("Failed to load Relics.json:", error);
    });




reset_button.addEventListener('click', (event) =>{
  console.log("clicked as fuck")
  reset_icon_rotation();
})



