import { readFileSync } from 'fs';

const data = readFileSync('input4.txt', {encoding: 'utf-8'});

const pairs = data.split('\n').map(line => line.split(',').map(elf => elf.split('-').map(Number)));
pairs.pop();

function overlapsPair([a, b]) {
	if(a[0] >= b[0] && a[0] <= b[1]) return 1;
	if(a[1] >= b[0] && a[1] <= b[1]) return 1;
	return 0;
}

function overlaps([a, b]) { return overlapsPair([a, b]) || overlapsPair([b, a]); }

console.log(pairs.map(overlaps).reduce((a,b)=>a+b))
