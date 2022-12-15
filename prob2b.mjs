import { readFileSync } from 'fs';

const data = readFileSync('input2.txt', {encoding: 'utf-8'});

function fixRow(row) {
	return row.replace(/A/g, 'r')
		.replace(/B/g, 'p')
		.replace(/C/g, 's')
		.split(' ');
}

function rowScore(row) {
	const moves = {
		'r': { beats: 's', beatenBy: 'p', score: 1 },
		'p': { beats: 'r', beatenBy: 's', score: 2 },
		's': { beats: 'p', beatenBy: 'r', score: 3 }
	};
	console.log(row);
	if(row[1] === 'X') row[1] = moves[row[0]].beats;
	else if(row[1] === 'Z') row[1] = moves[row[0]].beatenBy;
	else row[1] = row[0];
	let score = moves[row[1]].score;
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
