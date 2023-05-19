import http from 'node:http';
import { Transform } from 'node:stream';

class ToPositiveStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    console.log(transformed);

    callback(null, Buffer.from(String(transformed)));
  }
}

const server = http.createServer(async (req, res) => {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const fullBufferStream = Buffer.concat(buffers).toString();

  console.log(fullBufferStream);

  return res.end(fullBufferStream);
  //   return req.pipe(new ToPositiveStream()).pipe(res);
});

const PORT = 3334;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
