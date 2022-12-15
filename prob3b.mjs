import { readFileSync } from 'fs';

const data = readFileSync('input3.txt', {encoding: 'utf-8'});

const sacks = data.split('\n');

function priority(ch) {
	if(ch >= 'a' && ch <= 'z') return ch.charCodeAt(0) - 96;
	if(ch >= 'A' && ch <= 'Z') return ch.charCodeAt(0) - 38;
	return 0;
}

const lookups = sacks.map(s => {
	const lookup = {};
	for(let i = 0; i < s.length; ++i) {
		lookup[s[i]] = 1;
	}
	return lookup;
});

let sum = 0;

for(let i = 0; i < sacks.length; i += 3) {
	for(let j = 0; j < sacks[i].length; ++j) {
		const ch = sacks[i][j];
		if(lookups[i][ch] && lookups[i+1][ch] && lookups[i+2][ch]) {
			sum += priority(ch);
			break;
		}
	}
}
console.log(sum);
