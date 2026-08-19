const chat = document.getElementById("chat");

async function enviar(){

    const pergunta = document.getElementById("pergunta").value;

    if(pergunta=="") return;

    chat.innerHTML += `
    <div class="msg user">
    <b>Você:</b><br>${pergunta}
    </div>
    `;

    document.getElementById("pergunta").value="";

    const resposta = await fetch("http://localhost:3000/chat",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            pergunta
        })

    });

    const dados = await resposta.json();

    chat.innerHTML += `
    <div class="msg bot">
    <b>FinanceAI:</b><br>${dados.resposta}
    </div>
    `;

    chat.scrollTop = chat.scrollHeight;

}