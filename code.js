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
                factors.push(m);
                done = true;
            }
            if (m%primes[counter][0] == 0) {
                m /= primes[counter][0];
                factors.push(primes[counter][0]);
            } else {
                counter ++;
            }
        }
        return factors;
    }
}

let primes = [[2, [Math.random()*Math.PI*2, Math.random()*0.3+0.6, Math.random()*0.3+0.6]]];

for (let i=0; i<200; i++) {
    mctx.fillStyle = HSVtoString(Math.PI*2*i/200, Math.random()*0.3+0.6, Math.random()*0.3+0.6, 1);
    mctx.fillRect(mcw*i/200, 0, mcw*(i+1)/200, mch);
}