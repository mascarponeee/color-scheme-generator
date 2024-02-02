const colorInput = document.getElementById("color-input");
const modeSelect = document.getElementById("mode-select");
const submitBtn = document.getElementById("submit-btn");
const colorSchemeGrid = document.getElementById("color-scheme-grid");
let colorsArray = [];

document.addEventListener("click", (e) => {
  if (e.target.matches(".color") || e.target.matches(".color-hex")) {
    navigator.clipboard.writeText(e.target.dataset.hex)
    .then(() => {
      //alert("Copied")
      document.querySelector(".copied-to-clipboard-notification").style.opacity = 1;
      setTimeout(
        () => {
          document.querySelector(".copied-to-clipboard-notification").style.opacity = 0;
        },
        1500
      );
    })
    .catch(err => {
      console.log('Something went wrong', err);
    });
  } 
})

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  colorsArray = []
  let selectedColor = colorInput.value.slice(1);
  let selectedMode = modeSelect.value;
  getData(selectedColor, selectedMode);
})

function getData(color, mode) {
  fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}`)
    .then(res => res.json())
    .then(data => {
      for (let i = 0; i < data.colors.length; i++) {
        colorsArray.push(data.colors[i].hex.value);
      }
      renderColorScheme(colorsArray)
    })
  }

function renderColorScheme(colors) {
  colorSchemeGrid.innerHTML = `
    <div data-hex=${colors[0]} class="color color-1" style="background: ${colors[0]}"></div>
    <div data-hex=${colors[1]} class="color color-2" style="background: ${colors[1]}"></div>
    <div data-hex=${colors[2]} class="color color-3" style="background: ${colors[2]}"></div>
    <div data-hex=${colors[3]} class="color color-4" style="background: ${colors[3]}"></div>
    <div data-hex=${colors[4]} class="color color-5" style="background: ${colors[4]}"></div>
    <p data-hex=${colors[0]} class="color-hex color-1-hex">${colors[0]}</p>
    <p data-hex=${colors[1]} class="color-hex color-2-hex">${colors[1]}</p>
    <p data-hex=${colors[2]} class="color-hex color-3-hex">${colors[2]}</p>
    <p data-hex=${colors[3]} class="color-hex color-4-hex">${colors[3]}</p>
    <p data-hex=${colors[4]} class="color-hex color-5-hex">${colors[4]}</p>
  `
}