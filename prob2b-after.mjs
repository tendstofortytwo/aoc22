import { readFileSync } from 'fs';

const data = readFileSync('input2.txt', {encoding: 'utf-8'});

function fixRow(row) {
	return row.replace(/A/g, 'r')
		.replace(/B/g, 'p')
		.replace(/C/g, 's')
		.split(' ');
}

function rowScore(row) {
	const moves = ['r', 'p', 's'];
	if(row[1] === 'X') return (moves.indexOf(row[0])+2)%3 + 1;
	if(row[1] === 'Z') return (moves.indexOf(row[0])+1)%3 + 7;
	return moves.indexOf(row[0]) + 4;
}

const score = data.split('\n').map(fixRow).filter(r => r.length === 2).map(rowScore).reduce((a,b) => a+b);
console.log(score);
