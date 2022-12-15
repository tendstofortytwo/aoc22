import { readFileSync } from 'fs';

const data = readFileSync('input12.txt', {encoding: 'utf-8'}).slice(0, -1);

let startPoints = [], end;
const matrix = data.split('\n').map((l,i) => l.split('').map((ch,j) => {
	if(ch === 'a' || ch === 'S') startPoints.push([i, j]);
	if(ch >= 'a' && ch <= 'z') return ch.charCodeAt(0) - 97;
	if(ch == 'S') return 0;
	end = [i, j];
	return 25;
}));

function pathFrom(start) {
	const visited = matrix.map(l => l.map(v => false));

	const queue = [[start, 0]];

	while(queue.length) {
		let [[i, j], steps] = queue.shift();
		if(i === end[0] && j === end[1]) {
			return steps;
		}
		const viablePath = (x, y) => {
			let b =
				x >= 0 && x < matrix.length && y >= 0 && y < matrix[0].length &&
				matrix[x][y] <= (matrix[i][j] + 1) &&
				!visited[x][y];
			return b
		}
		if(viablePath(i+1, j)) { queue.push([[i+1, j], steps+1]); visited[i+1][j] = true; }
		if(viablePath(i-1, j)) { queue.push([[i-1, j], steps+1]); visited[i-1][j] = true; }
		if(viablePath(i, j-1)) { queue.push([[i, j-1], steps+1]); visited[i][j-1] = true; }
		if(viablePath(i, j+1)) { queue.push([[i, j+1], steps+1]); visited[i][j+1] = true; }
	}
}

console.log(startPoints.map(pathFrom).filter(v => !!v).reduce((x,y)=>Math.min(x,y)));
