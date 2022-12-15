import { readFileSync } from 'fs';

const data = readFileSync('input3.txt', {encoding: 'utf-8'});

const sacks = data.split('\n');
sacks.pop();

function priority(ch) {
	if(ch >= 'a' && ch <= 'z') return ch.charCodeAt(0) - 96;
	if(ch >= 'A' && ch <= 'Z') return ch.charCodeAt(0) - 38;
	return 0;
}

const lookups = sacks.map(s => new Set(s.split('')));

let sum = 0;

for(let i = 0; i < sacks.length; i += 3) {
	let idx = i;
	if(sacks[i+1].length < sacks[idx].length) idx = i+1;
	if(sacks[i+2].length < sacks[idx].length) idx = i+2;
	for(let j = 0; j < sacks[idx].length; ++j) {
		const ch = sacks[idx][j];
		if(lookups[i].has(ch) && lookups[i+1].has(ch) && lookups[i+2].has(ch)) {
			sum += priority(ch);
			break;
		}
	}
}
console.log(sum);
