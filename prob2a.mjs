import { readFileSync } from 'fs';

const data = readFileSync('input2.txt', {encoding: 'utf-8'});

function fixRow(row) {
	return row.replace(/A|X/g, 'r')
		.replace(/B|Y/g, 'p')
		.replace(/C|Z/g, 's')
		.split(' ');
}

function rowScore(row) {
	const moves = {
		'r': { beatenBy: 'p', score: 1 },
		'p': { beatenBy: 's', score: 2 },
		's': { beatenBy: 'r', score: 3 }
	};
	let score = moves[row[1]].score;
	console.log(score);
	if(moves[row[0]].beatenBy == row[1])
		score += 6;
	else if(row[0] === row[1])
		score += 3;
	else
		score += 0;
	console.log(row, score);
	return score;
}

const score = data.split('\n').map(fixRow).filter(r => r.length === 2).map(rowScore).reduce((a,b) => a+b);
console.log(score);
