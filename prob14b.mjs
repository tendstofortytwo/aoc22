import { readFileSync } from 'fs';

const data = readFileSync('input14.txt', {encoding: 'utf-8'}).slice(0, -1);

const givenPaths = data.split('\n').map(l => l.split(' -> ').map(s => s.split(',').map(Number)));

const xs = givenPaths.flat().filter((x, i) => i % 2 === 0);
const ys = givenPaths.flat().filter((y, i) => i % 2 === 1);
const points = givenPaths.flat();
const minY = 0; // going to be starting point
const maxY = Math.max(...points.map(([x, y]) => y)) + 2;
let minX = Math.min(...points.map(([x, y]) => x)) - 1;
let maxX = Math.max(...points.map(([x, y]) => x)) + 1;

// effectively infinite floor
let diff = Math.abs(maxY - minY) + 2;
console.log(diff)
minX -= diff;
maxX += diff;
console.log(minX, maxX, minY, maxY)
const paths = givenPaths.map(path => path.map(([x, y]) => [x - minX, y - minY]));
const sim = Array(maxX - minX + 1).fill().map(v => Array(maxY - minY + 1).fill(' '));
const origin = [500 - minX, 0 - minY];
const fill = ([x, y]) => { sim[x][y] = '#'; }
// floor
paths.push([[0, sim[0].length-1], [sim.length-1, sim[0].length-1]]);
paths.forEach(p => {
	for(let i = 0; i < p.length-1; ++i) {
		let [startX, startY] = p[i];
		let [endX, endY] = p[i+1];
		if(startX === endX)
			for(let j = Math.min(startY, endY); j <= Math.max(startY, endY); ++j) fill([startX, j]);
		else if(startY === endY)
			for(let j = Math.min(startX, endX); j <= Math.max(startX, endX); ++j) fill([j, startY]);
		else throw 'wtf';
	}
});

function display() {
	for(let i = 0; i < sim[0].length; ++i) {
		let outLine = '';
		for(let j = 0; j < sim.length; ++j) {
			outLine += sim[j][i];
		}
		console.log(outLine);
	}
	console.log('');
}

let n = 0;
let done = false;
while(!done) {
	++n;
	let sand = [...origin];
	while(true) {
		let [x, y] = sand;
		if(x < 0 || x >= sim.length || y >= sim[0].length) {
			done = true; break;
		}
		if(y+1 < sim[0].length && sim[x][y+1] === ' ') sand = [x, y+1];
		else if(x-1 >= 0 && y+1 < sim[0].length && sim[x-1][y+1] === ' ') sand = [x-1, y+1];
		else if(x+1 < sim.length && y+1 < sim[0].length && sim[x+1][y+1] === ' ') sand = [x+1, y+1];
		else if(y+1 >= sim[0].length) { done = true; break; }
		else break;
	}
	if(sand[0] === origin[0] && sand[1] === origin[1]) break;
	if(sim[sand[0]][sand[1]] !== ' ' || done) break;
	sim[sand[0]][sand[1]] = 'o';
}

console.log(n);
