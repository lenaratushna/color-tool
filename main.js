const hexColorInput = document.getElementById('hex-color');
const inputColorBox = document.getElementById('input-color');
const alteredColorBox = document.getElementById('altered-color');
const alteredColorText = document.getElementById('altered-color-hex');
const rangeColorSlider = document.getElementById('range-color');
const rangePercent = document.getElementById('range-percent');
const lightenText = document.getElementById('lighten-text');
const darkenText = document.getElementById('darken-text');
const toggleBtn = document.getElementById('toggle-btn');

const reset = () => {
    rangeColorSlider.value = 0;
    rangePercent.innerText = '0';
    inputColorBox.style.backgroundColor = '#' + hexColorInput.value.replace('#', '');
    alteredColorBox.style.backgroundColor = '#' + hexColorInput.value.replace('#', '');
    alteredColorText.innerText = '#' + hexColorInput.value.replace('#', '');
    hexColorInput.style.borderColor = '';
}

reset();

const isValidHex = (hex) => {
    const strippedHex = hex.replace('#', '').replace(/ /g,'');

    return strippedHex ? strippedHex.length === 3 || strippedHex.length === 6 : false;
}

const convertHexToRGB = (hex) => {
    if(!isValidHex(hex)) return null;

    let strippedHex = hex.replace('#', '').replace(/ /g,'');

    if(strippedHex.length === 3) {
        strippedHex = strippedHex.replace(/./g, '$&$&'); //double characters
    }
    
    const r  = parseInt(strippedHex.substring(0,2), 16);
    const g  = parseInt(strippedHex.substring(2,4), 16);
    const b  = parseInt(strippedHex.substring(4,6), 16);

    return {r, g, b};
}

const colorToHex = (color) => {
    let hexadecimal = color.toString(16);
    return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
  }

const convertRGBToHex = (r, g, b) => {
    return '#' + colorToHex(r) + colorToHex(g) + colorToHex(b)
}

const increaseWithin0To255 = (hex, amount) => {      // hex > 255 -> 255 
    return Math.min(255, Math.max(0, hex + amount)); // hex < 0 -> 0
}                                                    

const alterColor = (hex, percent) => {
    const {r, g, b} = convertHexToRGB(hex);
    
    const amount = Math.floor((percent/100) * 255);

    const newR = increaseWithin0To255(r, amount);
    const newG = increaseWithin0To255(g, amount);
    const newB = increaseWithin0To255(b, amount);

    return convertRGBToHex(newR, newG, newB);
}

hexColorInput.addEventListener('keyup', () => {
    const hex = hexColorInput.value;

    const strippedHex = hex.replace('#', '').replace(/ /g,'');

    if (isValidHex(strippedHex)) {
        inputColorBox.style.backgroundColor = '#' + strippedHex;
        reset();
    } else {
        hexColorInput.style.borderColor = 'red';
    };
});

rangeColorSlider.addEventListener('input', () => {
    if(!isValidHex(hexColorInput.value)) return;

    rangePercent.innerText = rangeColorSlider.value;

    const valueAddition  = 
        toggleBtn.classList.contains('toggled') 
            ? -rangeColorSlider.value 
            : rangeColorSlider.value;

    const alteredHex = alterColor(hexColorInput.value, valueAddition);

    alteredColorBox.style.backgroundColor = alteredHex;
    alteredColorText.innerText = alteredHex;
});

toggleBtn.addEventListener('click', () => {
    if(toggleBtn.classList.contains('toggled')){
        toggleBtn.classList.remove('toggled');
        lightenText.classList.remove('unselected');
        darkenText.classList.add('unselected');
    } else {
        toggleBtn.classList.add('toggled');
        lightenText.classList.add('unselected');
        darkenText.classList.remove('unselected');
    }
    reset();
});