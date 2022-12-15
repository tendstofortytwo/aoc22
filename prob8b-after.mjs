import { readFileSync } from 'fs';

const data = readFileSync('input8.txt', {encoding: 'utf-8'}).slice(0, -1);

const trees = data.split('\n').map(l => l.split('').map(Number));

const l = trees.length, b = trees[0].length;

function checkVisibility(x, y) {
	let i, j, counts = [0, 0, 0, 0];
	for(i = x-1; i >= 0; --i) {
		counts[0]++;
		if(trees[i][y] >= trees[x][y]) break;
	}
	for(i = x+1; i < l; ++i) {
		counts[1]++;
		if(trees[i][y] >= trees[x][y]) break;
	}
	for(j = y-1; j >= 0; --j) {
		counts[2]++;
		if(trees[x][j] >= trees[x][y]) break;
	}
	for(j = y+1; j < b; ++j) {
		counts[3]++;
		if(trees[x][j] >= trees[x][y]) break;
	}
	return counts.reduce((x,y)=>x*y);
}
let max = 0;
for(let i = 1; i < l - 1; ++i) {
	for(let j = 1; j < b - 1; ++j) {
		max = Math.max(max, checkVisibility(i, j));
	}
}
console.log(max);
