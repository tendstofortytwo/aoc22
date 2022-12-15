import { readFileSync } from 'fs';

const data = readFileSync('input1.txt', {encoding: 'utf-8'});

const elfCals = data.split('\n\n').map(elf => elf.split('\n').map(Number).reduce((a,b)=>a+b));

let m = [-Infinity, -Infinity, -Infinity];

for(let i = 0; i < elfCals.length; ++i) {
	m.push(elfCals[i]);
	m.sort((a,b)=>b-a);
	m.splice(3);
}

console.log('1a:', m[0]);
console.log('1b:', m[0] + m[1] + m[2]);
