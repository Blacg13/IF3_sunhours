/** REGEX :
 * ? formats DD, DMS, DMM et géohash : 
 * /[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)/g;
 * ^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$
 * let firstRegex =
 * /[0-9]+?°?\s?[-+]?[0-9]+\.[0-9]+'?[a-zA-Z]?|[0-9]+°[0-9]+'[0-9]+["|'']\s?[a-zA-Z]+/g;
* let secondRegex =
* /[0-9]+?°?\s?[-+]?[0-9]+\.[0-9]+'?\s?[a-zA-Z]?\s?|[0-9]+°\s?[0-9]+'\s?[0-9]+["|'']\s?[a-zA-Z]+\s?/g;
let isLatValid = Regex.test("latitude.value");
let isLongValid = Regex.test("longitude.value");
console.log(isLatValid);
console.log(isLongValid);
* ? coordonnées du pic Everest : 
27°59'18''N
86°55'31''E
*/
//! récupération des éléments HTML
//? récupération des inputs et du bouton submit (DD) :
const DD_SUBMIT_BTN = document.getElementById("submitDD");
const LATITUDE = document.getElementById("latitude");
const LONGITUDE = document.getElementById("longitude");
const INDATE = document.getElementById("indate");
//? récupération des divs :
const DD_DIV = document.getElementById("formDD");
const ANIMATION_DIV = document.getElementById("animationdiv");
ANIMATION_DIV.style.display = "none";
const RESULT_DIV = document.getElementById("resultdiv");
RESULT_DIV.style.display = "none";
const RES_SUNRISE_DIV = document.getElementById("infosunrisediv");
const RES_SUNSET_DIV = document.getElementById("infosunsetdiv");
const RES_DAY_DIV = document.getElementById("infojourdiv");
// on ne parle PAS de SUNPATH_PLEASE_HELP_ME_IM_GONNA_DIE()... :
NOSUNSE.style.display = "none";
//! TODAY comme valeur par défaut de <input type="date">
/* 
const TODAY = new Date();
console.log(`${TODAY.getFullYear}-${TODAY.getMonth}-${TODAY.getDate}`);
INDATE.valueAsDate = `${TODAY.getFullYear}-${TODAY.getMonth}-${TODAY.getDate}`;
?==============================================================================
if (firefox) {
  INDATE.value = `${TODAY.getDay}/${TODAY.getMonth}/${TODAY.getFullYear}`;
  } else {
    INDATE.value = `${TODAY.getMonth}/${TODAY.getDay}/${TODAY.getFullYear}`;
} */
//! format DD
DD_SUBMIT_BTN.addEventListener("click", async () => {
  console.log("clic");
  console.log(INDATE.value);
  try {
    const res = await axios.get(
      `https://api.sunrisesunset.io/json?lat=${LATITUDE.value}&lng=-${LONGITUDE.value}&timezone=UTC&date=${INDATE.value}`
    );
    console.log(res.data.results);
    //? ==================================> test
    // console.log(test.toLocateTimeString("fr-ca"));
    // let infoArray = [
    //   `lever du soleil : ${res.data.results.sunrise}`,
    //   `début de l'aube : ${res.data.results.first_light}`,
    //   `coucher du soleil : ${res.data.results.sunset}`,
    //   `fin du crépuscule : ${res.data.results.last_light}`,
    //   `zénith : ${res.data.results.solar_noon}`,
    //   `durée du jour : ${res.data.results.day_length}`,
    // ];
    // let infoPArray = [];
    // let infoFunction = infoArray.forEach((info) => {
    //   let infoP = (document.createElement("p").innerText = `${info
    //     .slice(0, -6)
    //     .toString()}`);
    //   // if (infoP.includes(`durée`) == true) {
    //   //   infoP.push(" heures");
    //   // }
    //   console.log(`infoP : ${infoP}`);
    //   // infoPArray.push(`${infoP}`);
    // });
    // infoFunction();
    // console.log(`infoPArray : ${infoPArray}`);
    //? test <=================================
    //! Affichage des informations :
    const SUNRISE_IMG = document.createElement("img");
    SUNRISE_IMG.src = "./images/sunrise.png";
    SUNRISE_IMG.alt = "image d'un soleil qui se lève";
    const RES_SUNRISE_P = document.createElement("p");
    RES_SUNRISE_P.innerText = `lever du soleil : ${res.data.results.sunrise.slice(
      0,
      -6
    )}`;
    RES_FIRST_P = document.createElement("p");
    RES_FIRST_P.innerText = `début de l'aube : ${res.data.results.first_light.slice(
      0,
      -6
    )}`;
    RES_SUNRISE_DIV.append(SUNRISE_IMG, RES_SUNRISE_P, RES_FIRST_P);
    const SUNSET_IMG = document.createElement("img");
    SUNSET_IMG.src = "./images/sunset.png";
    SUNSET_IMG.alt = "image d'un soleil qui se couche";
    const RES_SUNSET_P = document.createElement("p");
    RES_SUNSET_P.innerText = `coucher du soleil : ${res.data.results.sunset.slice(
      0,
      -6
    )}`;
    const RES_LAST_P = document.createElement("p");
    RES_LAST_P.innerText = `fin du crépuscule : ${res.data.results.last_light.slice(
      0,
      -6
    )}`;
    RES_SUNSET_DIV.append(SUNSET_IMG, RES_SUNSET_P, RES_LAST_P);
    // const RES_NOON_P = document.createElement("p");
    // RES_NOON_P.innerText = `zénith : ${res.data.results.solar_noon.slice(
    //   0,
    //   -6
    // )}`;
    const RES_LENGTH_P = document.createElement("p");
    RES_LENGTH_P.innerText = `durée du jour : ${res.data.results.day_length
      .slice(0, -6)
      .concat(" ", "h", "e", "u", "r", "e", "s")}`;
    //? j'aurais pu mettre " heures", mais ça me fait trop rire
    RES_DAY_DIV.append(RES_LENGTH_P);
  } catch (error) {
    console.log("error");
    const ERROR_P = document.createElement("p");
    ERROR_P.textContent = "Il semblerait qu'il y ait eu un problème...";
    RESULT_DIV.append(ERROR_P);
  } finally {
    DD_DIV.style.display = "none";
    ANIMATION_DIV.style.display = "flex";
    // SUNPATH_PLEASE_HELP_ME_IM_GONNA_DIE();
    //! => fonctionanima( ) => animation dure 3 secondes
    setTimeout(() => {
      ANIMATION_DIV.style.display = "none";
      RESULT_DIV.style.display = "flex";
    }, 3000);
  }
});
