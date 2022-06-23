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
        rgb[i] = s*Math.cos(h-i*2*Math.PI/3)-0.5+2*v;
        if (rgb[i] > 1) {
            rgb[i] = 1;
        }
        if (rgb[i] < 0) {
            rgb[i] = 0;
        }
    }
    return RGBtoString(...rgb, a);
}

mctx.fillStyle = HSVtoString(Math.random()*Math.PI*2, Math.random(), Math.random(), 1);
mctx.fillRect(0, 0, mcw, mch);