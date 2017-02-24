/**
 * I am using ES6 and fecth and not compiling using anything
 * like Babel. This means this will not work in older browsers,
 * but this tool is meant for developers
 */

fetch('colors.json')
	.then(function(response) {
		return response.json();
	})
	.then(function(json) {
		console.log(json.colors);
		app.colors = json.colors;
	})
	.catch(function(err) {
		alert('There was an error!');
	});

var app = new Vue({
	el: '#app',
	data: {
		seen: true,
		colors: [],
	}
});

/**
 * Take a hex string and return its complement in hsl array
 */
function complementaryColor(hex) {
	const rgb = hexToRgb(hex);
	const hsl = rgbToHsl(rgb);
	const complementDegree = (hsl[0] * 360 + 180) / 360;
	return [complementDegree, hsl[1], hsl[2]];
}

/**
 * Takes a hex string and returns array of rgb values
 */
function hexToRgb(hex) {
	const arr = [hex.substr(1,2), hex.substr(3,2), hex.substr(5)];
	const base16 = '0123456789abcdef';
	let rgb = [];

	for (str of arr) {
		let base10 = base16.indexOf(str.substr(0,1)) * 16 + base16.indexOf(str.substr(1,1));
		rgb.push(base10);
	}

	return rgb;
}

/**
 * Takes an array of rgb values and returns an hsl array
 * http://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
 */
function rgbToHsl(rgb) {
	const r = rgb[0] / 255;
	const g = rgb[1] / 255;
	const b = rgb[2] / 255;

	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);

	let h = (max + min) / 2;
	let s = (max + min) / 2;
	let l = (max + min) / 2;

	if (max === min) {
		h = 0;
		s = 0;
	} else {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}

		h = h / 6;
	}

	return [h, s, l];
}

/**
 * Takes an array of hsl values and returns an rgb array
 * http://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
 */
function hslToRgb(hsl) {
	let r;
	let g;
	let b;

	const h = hsl[0];
	const s = hsl[1];
	const l = hsl[2];

	if (s === 0) {
		r = l;
		g = l;
		b = l;
	} else {
		const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		const p = 2 * l -q;

		r = hueToRgb(p, q , h + 1/3);
		g = hueToRgb(p, q , h);
		b = hueToRgb(p, q , h - 1/3);
	}

	r = Math.round(r * 255);
	g = Math.round(g * 255);
	b = Math.round(b * 255);

	return [r, g, b];
}

/**
 * Abstracted function for hslToRgb
 * http://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
 */
function hueToRgb(p, q, t) {
	if (t < 0) t += 1;
	if (t > 1) t -= 1;
	if (t < 1/6) return p + (q - p) * 6 * t;
	if (t < 1/2) return q;
	if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
	return p;
}











