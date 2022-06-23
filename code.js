let mcan = document.getElementById("mcan");
let mctx = mcan.getContext("2d");
mcan.width = window.innerWidth;
mcan.height = window.innerHeight;
let mcw = mcan.width;
let mch = mcan.height;

function randomBetween(min, max, precision){
    return Math.floor((Math.random()*(max-min)+min)/precision)*precision;
}

function RGBtoString(r, g, b, a){
    r = Math.floor(r*255)*256*256*256;
    g = Math.floor(g*255)*256*256;
    b = Math.floor(b*255)*256;
    a = Math.floor(a*255);
    return "#"+(r+g+b+a).toString(16).padStart(8, "0");
}

function HSVtoString(h, s, v, a){
    let rgb = [0, 0, 0];
    for (let i=0; i<3; i++) {
        rgb[i] = s*Math.cos(h-i*2*Math.PI/3)+0.5;
        if (rgb[i] > 1) {
            rgb[i] = 1;
        }
        if (rgb[i] < 0) {
            rgb[i] = 0;
        }
        rgb[i] = rgb[i]-1+2*v;
        if (rgb[i] > 1) {
            rgb[i] = 1;
        }
        if (rgb[i] < 0) {
            rgb[i] = 0;
        }
    }
    return RGBtoString(...rgb, a);
}

function factor(n){
    if (n > 10000) {
        console.log("ERROR: prime factorization number too big");
    } else {
        if (primes[primes.length-1][0] < n-1) {
            for (let i=primes[primes.length-1][0]+1; i<n; i++) {
                if (factor(i).length == 1){
                    primes.push([i, [Math.random()*Math.PI*2, Math.random()*0.3+0.6, Math.random()*0.3+0.6]]);
                }
            }
        }
        let counter = 0;
        let m = n;
        let factors = [];
        let done = false;
        while (!done) {
            if (m == 1) {
                done = true;
            }
            if (primes[counter][0] > Math.sqrt(m)) {
                let item = 0;
                for (let i=0; i<primes.length; i++) {
                    if (primes[i][0] == m) {
                        item = primes[i];
                    }
                }
                if (item == 0) {
                    item = [m, [Math.random()*Math.PI*2, Math.random()*0.3+0.6, Math.random()*0.3+0.6]];
                    primes.push(item);
                }
                factors.push(item);
                done = true;
            }
            if (!done) {
                if (m%primes[counter][0] == 0) {
                    m /= primes[counter][0];
                    factors.push(primes[counter]);
                } else {
                    counter ++;
                }
            }
        }
        return factors;
    }
}

function addBlockTexture(n){
    let factors = factor(n);
    let color = [0, 1, 1];
    factors.forEach((factor)=>{
        while (factor[1][0] < color[0]-Math.PI) {
            factor[1][0] += Math.PI*2;
        }
        while (factor[1][0] > color[0]+Math.PI) {
            factor[1][0] -= Math.PI*2;
        }
        color[0] += factor[1][0]/factors.length;
        color[1] *= factor[1][1];
        color[2] *= factor[1][2];
    });
    blockTextures[n] = color;
    return color;
}

let primes = [[2, [Math.random()*Math.PI*2, Math.random()*0.3+0.6, Math.random()*0.3+0.6]]];
let blockTextures = [];

let w = [2, 3, 6, 5, 30];
for (let i=0; i<w.length; i++) {
    mctx.fillStyle = HSVtoString(...addBlockTexture(w[i]), 1);
    mctx.fillRect((i)*mcw/w.length, 0, (i+1)*mcw/w.length, mch);
}