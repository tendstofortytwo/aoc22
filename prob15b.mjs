import { readFileSync } from 'fs';

const data = readFileSync('input15.txt', {encoding: 'utf-8'}).slice(0, -1);

const positions = data.split('\n').map(l => 
    l.split(': ').map(c => c.split(', ').map(d => Number(d.slice(d.indexOf('=')+1)))));

const dist = ([x1, y1], [x2, y2]) => Math.abs(x1 - x2) + Math.abs(y1 - y2);
const size = 4000000;
for(let row = 0; row < size; ++row) {
    const notAtRanges = [];
    positions.forEach(([[sx, sy], [bx, by]]) => {
        const d = dist([sx, sy], [bx, by]);
        const vd = Math.abs(row - sy);
        const hd = d - vd;
        if(hd < 0) return;
        notAtRanges.push([Math.max(0, sx - hd), Math.min(sx + hd, size)]);
    });
    notAtRanges.sort(([s1], [s2]) => s1 - s2);
    const shrunkRanges = [notAtRanges[0]];
    
    for(let i = 1; i < notAtRanges.length; ++i) {
        const last = shrunkRanges[shrunkRanges.length - 1];
        if(last[1] + 1 >= notAtRanges[i][0]) {
            last[1] = Math.max(last[1], notAtRanges[i][1]);
        }
        else {
            shrunkRanges.push(notAtRanges[i]);
        }
    }
    if(shrunkRanges.length > 1) {
        console.log((shrunkRanges[0][1] + 1) * size + row);
        break;
    }
}