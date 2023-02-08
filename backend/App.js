const server = require("./config/server.js")

server.listen(process.env.HOST_PORT, () => {
    console.log(`Servidor Online na porta: ${process.env.HOST_PORT}`);
})