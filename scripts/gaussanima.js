// ! https://codepen.io/guigaoliveira/pen/owEGxx

const NOSUNSE = document.getElementById("nosunse");
NOSUNSE.style.width = "75px";
NOSUNSE.style.display = "none";
const SUNPATH_PLEASE_HELP_ME_IM_GONNA_DIE = () => {
  NOSUNSE.style.display = "block";
  const gaussian = (mean, sigma) => ({
    mean,
    sigma,
    a: 1 / Math.sqrt(2 * Math.PI),
  });
  const addsigma = (obj, value) => (obj.sigma += value);
  const getValues = (obj, valueX) =>
    (obj.a / obj.sigma) *
    Math.E ** (-0.5 * ((valueX - obj.mean) / obj.sigma) ** 2);
  const generateValues = (obj, start, end) => {
    let allValues = [];
    const step = (Math.abs(start) + Math.abs(end)) / 100;
    for (let i = start; i < end; i += step) {
      allValues.push(getValues(obj, i));
    }
    return allValues;
  };
  // const draw = (obj, ctx) => {
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   const points = generateValues(obj, -10, 10);
  //   const len = points.length;
  //   ctx.strokeStyle = "blue";
  //   ctx.shadowBlur = 30;
  //   ctx.lineWidth = 1;
  //   ctx.shadowColor = "black";
  //   ctx.beginPath();
  //   points.map((p, i) =>
  //     ctx.lineTo((width * i) / len + 2, height - 2 - height * p)
  //   );
  //   ctx.stroke();
  // };

  // (2,6) à la place de (0,1) :
  const gauss = gaussian(2, 6);
  //
  // const canvas = document.querySelector("canvas");
  // const width = canvas.width;
  // const height = canvas.height;
  // const ctx = canvas.getContext("2d");

  // const showGraph = () => {
  //   document.querySelector("span").textContent = `${gauss.sigma}`.substring(0, 3);
  //   draw(gauss, ctx);
  // };
  // const btn = document.querySelectorAll("button");
  // const up = btn[0];
  // const down = btn[1];

  // up.addEventListener("click", () => {
  //   addsigma(gauss, 0.1);
  //   showGraph();
  // });
  // down.addEventListener("click", () => {
  //   addsigma(gauss, -0.1);
  //   showGraph();
  // });

  // showGraph();

  /**
   * >>> J'ai besoin de créer un keyframe généré automatiquement en JS avec la courbe de Gauss, et de l'utiliser sur l'image du soleil dans le HTML
   */

  //création et ajout de <style> dans le DOM
  let stylekey = document.createElement(`style`);

  const ASTRAL_IMG = document.querySelector(`#sun`);
  ASTRAL_IMG.append(stylekey);
  //création de la keyframe SunPath dans <style>
  // let keyframeSunPath = CSSKeyframeRule;

  let values = generateValues(gauss, -10, 10);
  // keyframeSunPath.name = "sunPath";
  const WIDTH = 1600;
  const HEIGHT = 500;

  stylekey.textContent = `
         main img { animation: sunPath 20s ease-in 250ms 1 normal;}
         @keyframes sunPath {`;
  values.forEach((v, i, array) => {
    stylekey.textContent += `${i}% { 
            transform: translate(${Math.round(
              (WIDTH * i) / array.length + 2
            )}px, -${Math.round(HEIGHT - 2 - HEIGHT * -(4.5 * v))}px );
            }`;
  });
  stylekey.textContent += "}";
  //! pour rendre la courbe + courbée => HEIGHT - 2 - HEIGHT * v

  // keyframeSunPath.insertRule(`transfom: translate(${})`, ${})

  //ajout de la keyframe
  // stylekey.append(`keyframeSunPath`);

  // https://www.geeksforgeeks.org/how-to-dynamically-create-keyframe-css-animations/
  /*
          // Javascript code to add keyframes
          let styleSheet = null;
          dynamicAnimation = (name, styles) => {
            // Creating a style element
            // To add the keyframes
            if (!styleSheet) {
              styleSheet = document.createElement("style");
              styleSheet.type = "text/css";
              document.head.appendChild(styleSheet);
              }
              // Adding The Keyframes
              styleSheet.sheet.insertRule(
                `@keyframes ${name} {${styles}}`,
                styleSheet.length
                );
                };
                
                const form = document.getElementById("input");
                const text = document.getElementById("text");
                form.addEventListener("submit", (e) => {
                  e.preventDefault();
                  // Adding an animation
                  // NewAnimation, with the
                  // Keyframes to the Stylesheet
                  dynamicAnimation("newAnimation", text.value);
                  // Timing and duration can be altered
                  // As per user requirements
                  document.getElementById("element").style.animation =
                  "newAnimation 3s infinite";
                  }); 
                  
                  */
  NOSUNSE.style.display = "none";
};
