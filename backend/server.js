import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {

    res.send("FinanceAI Backend funcionando!");

});


app.post("/chat", async (req, res) => {

    try {

        const pergunta = req.body.pergunta;


        const resposta = await fetch("http://localhost:11434/api/generate", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                model: "llama3.1",

                prompt: `
Você é a FinanceAI.

Você é uma inteligência artificial especialista exclusivamente em finanças.

Seu conhecimento inclui:

- investimentos
- ações
- fundos imobiliários
- renda fixa
- criptomoedas
- economia
- planejamento financeiro
- educação financeira

Responda de forma clara, profissional e educativa.

Não responda assuntos fora de finanças.

Pergunta do usuário:
${pergunta}
`,

                stream: false

            })

        });


        const dados = await resposta.json();


        res.json({

            resposta: dados.response

        });


    } catch (erro) {

        console.log(erro);

        res.status(500).json({

            resposta: "Erro ao conectar com a inteligência artificial."

        });

    }

});


app.listen(3000, () => {

    console.log("FinanceAI rodando na porta 3000");

});