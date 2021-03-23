const server = require('fastify')();
const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 4000;

console.log(`PID del worker: ${process.pid}`);

function fibonacci(limite) {
    let prev = 1n;
    let sig = 0n;
    let swap;
    while(limite) {
        swap = prev;
        prev = prev + sig;
        sig = swap;

        limite--;
    }
    return sig;
}

server.get('/:limite', async(request,response) => {
    return {
        pid : process.pid,
        limite : request.params.limite,
        valor : String(fibonacci(Number(request.params.limite)))
    };
});

server.listen(PORT, HOST, () => {
    console.log(`Escuchando en http://${HOST}:${PORT}`);
});