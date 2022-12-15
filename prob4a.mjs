import { readFileSync } from 'fs';

const data = readFileSync('input4.txt', {encoding: 'utf-8'});

const pairs = data.split('\n').map(line => line.split(',').map(elf => elf.split('-').map(Number)));
pairs.pop();

function fullyContained([a, b]) {
	if(a[0] >= b[0] && a[1] <= b[1]) return 1;
	if(b[0] >= a[0] && b[1] <= a[1]) return 1;
	return 0;
}

console.log(pairs.map(fullyContained).reduce((a,b)=>a+b))
