import { readFileSync } from 'fs';

const data = readFileSync('input6.txt', {encoding: 'utf-8'});
const pktSize = 4;
for(let i = pktSize; i < data.length; ++i) {
	const lastFour = new Set(data.slice(i-pktSize, i));
	if(lastFour.size === pktSize) {
		console.log(i);
		break;
	}
}
