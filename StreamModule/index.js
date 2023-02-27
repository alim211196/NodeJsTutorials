const fs = require("fs");
const http = require("http");

const server = http.createServer();

server.on("request", (req, res) => {
    const rstream = fs.createReadStream("input.txt");

    //first way to work with stream
    //  rstream.on('data',(data)=>{
    //     res.write(data)
    //  })
    //  rstream.on('end',()=>{
    //     res.end()
    //  })
    //   rstream.on('error',(err)=>{
    //     res.end('File not found')
    //   })

    //second way to work with stream
    rstream.pipe(res);
});

server.listen(8080);
