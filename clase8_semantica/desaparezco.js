        document.getElementById("exec_tree")
            .addEventListener("keyup", function(event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                document.getElementById("myButton").click();
            }

        });
        //interpolation
        function lerp(a, b, u) {
            return (1 - u) * a + u * b;
        }
        var Anim = { //animation settings
            'duration': 3000,
            'interval' : 10,
            'stepUnit' : 1.0,
            'currUnit' : 0.0
        }
        var r,g,b;
        r=0;
        b=0;
        g=0;
        const canvas = document.getElementById("dibujo");
        const ctx = canvas.getContext('2d')

        const clock = function (ctx, w, h, ast) {
                if (ast === undefined) {    //avance natural del tiempo
                    console.log(r,ctx);
                    ctx.fillStyle = "rgba(200,200,200,.1)";
                    ctx.fillRect(0,0, 1000,1000)
                } else {                    // ingreso de un poema
                    let verso1 = ast[0][0]
                    let verso2 = ast[2][0]
                    let verso3 = ast[4][0]
                    let versos = [verso1,verso2,verso3];
                    console.log("clock:", versos);
                    let color;
                    for(const verso of versos) {
                        if (verso.type === "verbo"){
                          let r = verso.len;
                          console.log(r*10) 
                          color = "rgba("+(r*10).toString()+",200,200,.1)";
                        } else {
                          r = verso.lenSust;
                          g = verso.lenPrep;
                          b = verso.len;
                          color = "rgba("+(r*10).toString()+","+(g*30).toString()+","+(b).toString()+",.5)";
                        }
                        var x = w/2,
                        y = h/2,
                        // Radii of the white glow.
                        innerRadius = 15,
                        outerRadius = 270,
                        // Radius of the entire circle.
                        radius = 260;

                        var gradient = ctx.createRadialGradient(x, y, innerRadius, x, y, outerRadius);
                        gradient.addColorStop(0, 'white');
                        gradient.addColorStop(1, color);

                        ctx.arc(x, y, radius, 0, 2 * Math.PI);

                        ctx.fillStyle = gradient;
                        ctx.fill();
                    }
                }
            r++;g++;b++

        }

        setInterval(clock,100,ctx);
        const drawPoem = (astRaw) =>
        {
            let ast = JSON.parse(astRaw);
            clock(ctx, canvas.width,canvas.height, ast);
        }

        const buttonCodeTree = async () =>
        {
            let text = document.getElementById("exec_tree").value;
            let data = {element: text};
            console.log("Execccccccccc")
            return fetch("http://127.0.0.1:3000/exec", {
              method: "POST",
              headers: {'Content-Type': 'application/json'}, 
              body: JSON.stringify(data)
            }
            ).then(res => {
               return res.text();
            }).then(res=>drawPoem(res)).catch(function(error) {
              console.log(error);
            }).finally(()=>{console.log("finally");});

        }
