//estrutura dentro do switch

const rl = require("node:readline");

const prompt = rl.createInterface({
    input: process.stdin, output: process.stdout
});

console.log("Bem vindo ao programa");
console.log("[1] Data atual");
console.log("[2] Horario atual");
console.log("[3] Ver linguagens");
console.log("[0] Sair");

prompt.question("> Selecione o que deseja fazer ", (answer) => {
    switch(answer){
        case "1":{
            const date = new Date();
            const day = date.getDate();
            const month = date.getMonth() +1;
            const year = date.getFullYear();
            console.log(`Hoje é ${day}/${month}/${year}`)
            break
        }
        case "2":{
            const data = new Date();
            const hora = data.getHours(); 
            const minutos = data.getMinutes();
            const segundos = data.getSeconds();
            console.log(`Agora eh ${hora}:${minutos}:${segundos}`)
            break
        }
        default:{
            console.log("Fim do programa")
        }

    }
    prompt.close();
})

/**
 * setInterval -> printa alguma coisa dentro de um intervalo de tempo
 */