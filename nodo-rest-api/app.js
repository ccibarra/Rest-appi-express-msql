import express, { json } from 'express';
import fs from "fs";

const app = express ();
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

app.get("/status", (request, response) => {
  const status = {
     "Status": "Running"
  };
  
  response.send(status); 
});

const readData = () => {
  try {
    const data = fs.readFileSync("./db.json", "utf8"); 
    return JSON.parse(data);
  }catch (error){
    console.log(error);x
  }
};

const writedata = (data) => {
  try {
    fs.writeFileSync("./db.json", JSON.stringify(data)); 
  }catch (error){
    console.log(error);
  }
};

// consultar todos 
app.get("/clientes", (request, response) => {
  const data = readData();
  
  response.send(data); 
});

// consultar por id 
app.get("/clientes/:id", (request, response) => {
  const data = readData();
  const id = parseInt(request.params.id);
  const cliet = data.clientes.find((cliet) => cliet.id === id);
  
  response.send(cliet);
});

// crear
app.post("/clientes", (request, response) => {
  const data = readData();
  const body = request.body;
  const newClient = {
    id: data.clientes.length + 1,
    ...body,
  };
  data.clientes.push(newClient)
  writedata(data);

  response.json(newClient);
});

// actualizar
app.put("/clientes/:id", (request, response) => {
  const data = readData();
  const body = request.body;
  const id = parseInt(request.params.id);
  const clietIndex = data.clientes.findIndex((cliet) => cliet.id === id);
  data.clientes[clietIndex] = {
      ...data.clientes[clietIndex],
      ...body,   
 };
  writedata(data);

  response.json({message: "Cliente actualizado con exito :)"});
});

// eliminar 
app.delete("/clientes/:id", (request, response) => {
  const data = readData();
  const id = parseInt(request.params.id);
  const clietIndex = data.clientes.findIndex((cliet) => cliet.id === id);
  data.clientes.splice(clietIndex, 1);
  writedata(data);

  response.json({ message: "Cliente eliminado con éxito" }); 
});