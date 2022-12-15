import { readFileSync } from 'fs';

const data = readFileSync('input10.txt', {encoding: 'utf-8'}).slice(0, -1);

const instructions = data.split('\n').map(i => i.split(' '));

const screen = Array(240).join(' ').split('');
let cycle = 0, x = 1;
instructions.forEach(([i, v]) => {
	const render = () => {
		if(x-1 === (cycle % 40) || x === (cycle % 40) || x+1 === (cycle % 40)) screen[cycle] = '#';
		++cycle;
	};
	render();
	if(i === 'addx') render();
	if(v) x += Number(v);
});
function chunk(str, n) {
	const arr = [];
	for(let i = 0; i < str.length; i += n) {
		arr.push(str.slice(i, i+n));
	}
	return arr;
}
console.log(chunk(screen.join(''), 40));
