import { readFileSync } from 'fs';

const data = readFileSync('input4.txt', {encoding: 'utf-8'});

const pairs = data.split('\n').map(line => line.split(',').map(elf => elf.split('-').map(Number)));
pairs.pop();

function inInterval([x, y], v) {
	return v >= x && v <= y;
}

function overlaps([a, b]) {
	if(inInterval(b, a[0])) return 1;
	if(inInterval(b, a[1])) return 1;
	if(inInterval(a, b[0])) return 1;
	return 0;
}

console.log(pairs.map(overlaps).reduce((a,b)=>a+b))
