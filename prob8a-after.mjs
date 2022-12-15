import { readFileSync } from 'fs';

const data = readFileSync('input8.txt', {encoding: 'utf-8'}).slice(0, -1);

const trees = data.split('\n').map(l => l.split('').map(Number));
const l = trees.length, b = trees[0].length;
let count = l * 2 + (b - 2) * 2;

function checkVisibility(x, y) {
	let i, j;
	for(i = 0; i < x; ++i) if(trees[i][y] >= trees[x][y]) break;
	if(i === x) return 1;
	for(i = x+1; i < l; ++i) if(trees[i][y] >= trees[x][y]) break;
	if(i === l) return 1;
	for(j = 0; j < y; ++j) if(trees[x][j] >= trees[x][y]) break;
	if(j === y) return 1;
	for(j = y+1; j < b; ++j) if(trees[x][j] >= trees[x][y]) break;
	if(j === b) return 1;
	return 0;
}
for(let i = 1; i < l - 1; ++i) {
	for(let j = 1; j < b - 1; ++j) {
		count += checkVisibility(i, j);
	}
}
console.log(count);
