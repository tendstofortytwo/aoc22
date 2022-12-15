import { readFileSync } from 'fs';

const data = readFileSync('input15.txt', {encoding: 'utf-8'}).slice(0, -1);

const positions = data.split('\n').map(l => 
    l.split(': ').map(c => c.split(', ').map(d => Number(d.slice(d.indexOf('=')+1)))));

const dist = ([x1, y1], [x2, y2]) => Math.abs(x1 - x2) + Math.abs(y1 - y2);

const row = 2000000;
const notAt = new Set();
const alreadyPlaced = new Set();
positions.forEach(([[sx, sy], [bx, by]]) => {
    if(sy === row) alreadyPlaced.add(sx);
    if(by === row) alreadyPlaced.add(bx);
});
positions.forEach(([[sx, sy], [bx, by]]) => {
    const d = dist([sx, sy], [bx, by]);
    const vd = Math.abs(row - sy);
    if(vd <= d) {
        const hd = d - vd;
        for(let i = sx - hd; i <= sx + hd; ++i) {
            if(!alreadyPlaced.has(i)) notAt.add(i);
        }
    }
});

console.log(notAt.size);
