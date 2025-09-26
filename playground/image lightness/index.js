/**
 * Calculate the brightness level of the image in the specified selector.
 *
 * mark at sayhello.ch September 2025
 *
 */

const img = document.querySelector('.wp-block-sht-header__figure img');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

canvas.width = img.naturalWidth;
canvas.height = img.naturalHeight;
ctx.drawImage(img, 0, 0);

const {data} = ctx.getImageData(0, 0, canvas.width, canvas.height);
let r=0,g=0,b=0,count=0;
for (let i=0; i<data.length; i+=4) {
  r += data[i]; g += data[i+1]; b += data[i+2]; count++;
}
const avg = (r/count + g/count + b/count) / 3;
// scale 1 (dark) to 6 (very light)
const lightness = avg < 43 ? 1 : avg < 85 ? 2 : avg < 128 ? 3 : avg < 170 ? 4 : avg < 213 ? 5 : 6;
console.log('Average lightness:', lightness);
