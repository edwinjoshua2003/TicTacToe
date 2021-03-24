const x = document.createElement("i");
{/* <i class="bi bi-x"></i> */}
x.setAttribute("class", "bi bi-x color1");
x.setAttribute("id", "color1");
// x.setAttribute("aria-hidden", "true");
{/* <i class="fa fa-circle-o" aria-hidden="true"></i> */}
const o = document.createElement("i");
o.setAttribute("class", "fa fa-circle-o color2");
o.setAttribute("aria-hidden", "true");

player = document.getElementById('player');
player.innerHTML = '<span style="color:rgb(58, 59, 57)">✖</span>';

let c = 0;
let cell = [];

// document.getElementById("c5").innerHTML = o.outerHTML;
// console.log(document.getElementById("c5").innerHTML);

// document.getElementById("c1").innerHTML = x.outerHTML;
// console.log(document.getElementById("c1").innerHTML);

function main(element)
{
    c++;
    const t = document.getElementById(this.id);
    // console.log(cell);
    if(c % 2 == 0){
        t.innerHTML = o.outerHTML;
        cell[parseInt(this.id[1])] = o;
        player.innerHTML = '<span style="color:rgb(58, 59, 57)">✖</span>';
    }
    else{
        t.innerHTML = x.outerHTML;
        cell[parseInt(this.id[1])] = x;
        player.innerHTML = o.outerHTML;
    }
    t.removeEventListener('click', main);
    check();
    if(c==9 && !check())
    {
        let x = '<p style="font-size:150px;line-height:160px">✖'+o.outerHTML+'</p>';
        let r = document.getElementById('result');
        r.style.setProperty("color", "black");
        r.innerHTML=x+"DRAW";
        end();
    }
}

function check(){
    // console.log("I'm IN")
    let win = {1:((cell[1] == cell[2]) && (cell[2]==cell[3])),
                2:((cell[4] == cell[5]) && (cell[5]==cell[6])),
                3:((cell[7] == cell[8]) && (cell[8]==cell[9])), 
                4:((cell[1] == cell[4]) && (cell[4]==cell[7])), 
                5:((cell[2] == cell[5]) && (cell[5]==cell[8])),
                6:((cell[3] == cell[6]) && (cell[6]==cell[9])),
                7:((cell[1] == cell[5]) && (cell[5]==cell[9])),
                8:((cell[3] == cell[5]) && (cell[5]==cell[7]))};
    // console.log(win[1]);
    // console.log(win[2]);
    // console.log(win[3]);
    // console.log(win[4]);
    // console.log(win[5]);
    // console.log(win[6]);
    // console.log(win[7]);
    // console.log(win[8]);
    if(win[1] || win[2] || win[3] || win[4] || win[5] || win[6] || win[7] || win[8])
    {
        console.log("Win");
        if(c % 2 == 0){
            o.style.setProperty('font-size', "150px");
            let r = document.getElementById('result');
            r.style.setProperty("color", "black")
            r.innerHTML=o.outerHTML + "<br>WINNER!";
            end();
        }
        else{
            let x = '<p style="font-size:150px;line-height:160px">✖</p>';
            let r = document.getElementById('result');
            r.style.setProperty("color", "black");
            r.innerHTML=x + "WINNER!";
            end();
        }
        for(let i=1 ; i<10 ; i++)
        {
            document.getElementById(`c${i}`).removeEventListener("click", main);
        }
    }
    return win[1] || win[2] || win[3] || win[4] || win[5] || win[6] || win[7] || win[8];
}

function refresh()
{
    console.log("IN");
    location.reload();
    this.removeEventListener();
}

function end(){
    let y = document.getElementById("overlay").style;
    y.setProperty("height", "100%");
    y.setProperty("width", "100%");
    y.setProperty("z-index", "2");
    y.setProperty("background", "#033530");
    y.setProperty("filter", "blur(10px)");
    y.setProperty("opacity", "0.9");
    y.setProperty("top", "0");
    y.setProperty("left", "0");
    let r = document.getElementById("r_div").style;
    r.setProperty("opacity", "1"); 
    document.getElementById("result").style.setProperty("font-size", "70px");
    window.setTimeout(stop, 1000);
}

function stop()
{
    document.addEventListener("click", refresh);
}

for(let i=1 ; i<10 ; i++)
{
    cell[i] = document.getElementById(`c${i}`);
    // console.log(cell[i]);
    cell[i].addEventListener("click", main);
}