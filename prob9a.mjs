import { readFileSync } from 'fs';

const data = readFileSync('input9.txt', {encoding: 'utf-8'}).slice(0, -1);

const commands = data.split('\n').map(l => l.split(' '));
const dist = ([x1, y1], [x2, y2]) => Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2);
let stepsTaken = 0;
const ropeSize = 2;
const knots = new Array(ropeSize).fill(0).map(v => [0, 0]);
const tailPos = new Set();
commands.forEach(([d, m]) => {
	for(let i = 0; i < m; ++i) {
		if(d === 'U') knots[0][1]++;
		if(d === 'D') knots[0][1]--;
		if(d === 'L') knots[0][0]--;
		if(d === 'R') knots[0][0]++;

		for(let j = 1; j < ropeSize; ++j) {
			if(dist(knots[j-1], knots[j]) > 2) {
				let movementVector = [knots[j-1][0] - knots[j][0], knots[j-1][1] - knots[j][1]].map(v => v ? v/Math.abs(v) : 0);
				knots[j][0] += movementVector[0];
				knots[j][1] += movementVector[1];
			}
		}
		tailPos.add(`${knots[ropeSize-1]}`);
	}
});
console.log(tailPos.size);
