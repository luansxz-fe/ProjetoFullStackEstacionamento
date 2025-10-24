const express = require("express")
const cors = require("cors");
const PORTA = 3000;
const app = express();
app.use(cors());
app.use(express.json());

let VEICULOS =[
    {id: 1 , placa: "KXF-1234", modelo: "SUV", pago : true , horario_entrada : new Date().toISOString()},
    {id: 2 , placa: "LCF-5678", modelo: "RET", pago : false , horario_entrada : new Date().toISOString()}
]

app.get("/", (req, res) =>{
    res.status(200).json({msg: "Hello"})
})

app.get("/lerveiculos", (req, res) =>{
      res.status(200).json(VEICULOS)
})

app.get("/lerveiculos/:id", (req, res) =>{
    const id = req.params.id;
    console.log(id)
    const meuCarro = VEICULOS.find(veiculo => veiculo.id === Number(id))

    res.status(200).json(meuCarro);
})

app.patch("/Atualizarpagamento/:id",(req, res)=> {
    const veiculo = VEICULOS.find(x => x.id === Number(req.params.id))
    if(!veiculo){
        return res.status(404).json({erro: "Não achei"});
        }
        const {pago} = req.body;
            if(pago !== undefined)veiculo.pago = pago;

            res.json(veiculo)
    })
app.delete("/Deletar/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = VEICULOS.findIndex(v => v.id === id);

    if (index === -1) {
        return res.status(404).json({ erro: "Veículo não encontrado" });
    }

    const removido = VEICULOS.splice(index, 1)[0]; 
    res.status(200).json(removido);
})
 
app.listen(PORTA, ()=>{
    console.log(`Servidor funcionando http://localhost:${PORTA}`)
})