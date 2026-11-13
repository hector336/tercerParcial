const calcular = () => {
   
    document.querySelector("#tabla").innerHTML = "<img src='img/loading-gif.gif' width='200px' height='200px'>";
   
    setTimeout(() => {
        let n = parseFloat(document.querySelector("#numero").value);
        document.querySelector("#vn").innerHTML = `<b style="color:red">${n}</b>`;       
        let resultado = "";
      
        for (let i = 1; i <= 10; i++) {
            resultado += `<p style="color:blue">${n} x ${i} = ${n * i}</p>`;
        }

        document.querySelector("#tabla").innerHTML = resultado;
    }, 1000);
}

const resetear = () => {
    document.querySelector("#numero").value = 1;
    document.querySelector("#vn").innerHTML = "1";
    document.querySelector("#tabla").innerHTML = "1 x 1 = 1";
}