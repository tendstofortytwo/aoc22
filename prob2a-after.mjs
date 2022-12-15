import { readFileSync } from 'fs';

const data = readFileSync('input2.txt', {encoding: 'utf-8'});

function fixRow(row) {
	return row.replace(/A|X/g, 'r')
		.replace(/B|Y/g, 'p')
		.replace(/C|Z/g, 's')
		.split(' ');
}

function rowScore(row) {
	const moves = ['r', 'p', 's'];
	let idx = moves.indexOf(row[1]);
	let score = idx + 1;
	if(row[0] == moves[(idx+2) % 3])
		score += 6;
	else if(row[0] === row[1])
		score += 3;
	else
		score += 0;
	return score;
}

const score = data.split('\n').map(fixRow).filter(r => r.length === 2).map(rowScore).reduce((a,b) => a+b);
console.log(score);
