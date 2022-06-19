const http = require("http")

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });

    if(req.url === '/produto') {
        res.end(JSON.stringify({
        data: 'Rota de produto'
        }));
    }

    if(req.url === '/usuario') {
        res.end(JSON.stringify({
        data: 'Rota de usuário'
        }));
    }

    res.end(JSON.stringify({
        data: 'Rota Indefinida'
        }));

}).listen(4001, () => console.log('O servidor está rodando na porta 4001'));