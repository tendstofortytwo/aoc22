import { readFileSync } from 'fs';

const data = readFileSync('input3.txt', {encoding: 'utf-8'});

const sacks = data.split('\n');

function priority(ch) {
	if(ch >= 'a' && ch <= 'z') return ch.charCodeAt(0) - 96;
	if(ch >= 'A' && ch <= 'Z') return ch.charCodeAt(0) - 38;
	return 0;
}

console.log(sacks.map(s => {
	console.log(s);
	const half = s.length / 2;
	const left = {}, right = {};
	for(let i = 0; i < half; ++i) {
		if(right[s[i]]) return priority(s[i]);
		left[s[i]] = 1;
		if(left[s[i+half]]) return priority(s[i+half]);
		right[s[i+half]] = 1;
	}
	return 0;
}).reduce((a, b) => a+b));
