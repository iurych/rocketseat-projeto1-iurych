import http from 'node:http';

// - criar
// - ler
// - atualizar
// - deleter

// HTTP:
// - Método http;
// - URL

const users = [];
let id = 1;

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const body = Buffer.concat(buffers).toString();

  console.log(body);

  if (req.method === 'GET' && url === '/users') {
    return res
      .setHeader('content-type', 'application-json')
      .end(JSON.stringify(users));
  }

  if (method === 'POST' && url === '/users') {
    users.push(
      {
        id: id++,
        name: 'Iury',
        email: 'iury@gmail.com',
      },
      {
        id: id++,
        name: 'mikhail',
        email: 'mikhail@gmail.com',
      }
    );
    return res.writeHead(201).end('usuário criado com sucesso');
  }

  return res.writeHead(404).end();
});

const PORT = 3333;
server.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
