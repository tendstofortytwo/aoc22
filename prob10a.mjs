import { readFileSync } from 'fs';

const data = readFileSync('input10.txt', {encoding: 'utf-8'}).slice(0, -1);

const instructions = data.split('\n').map(i => i.split(' '));

const cyclesToCheck = [20, 60, 100, 140, 180, 220];
let cycle = 0, x = 1, next = 0, res = 0;
instructions.forEach(([i, v]) => {
	if(i === 'addx') cycle += 2;
	else ++cycle;
	if(cycle >= cyclesToCheck[next]) {
		res += cyclesToCheck[next] * x;
		console.log(cyclesToCheck[next], x, res);
		++next;
	}
	if(v) x += Number(v);
});
console.log(res);
