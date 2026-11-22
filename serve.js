// Tiny static file server for local preview: `node serve.js` then open http://localhost:5057
const http=require('http'),fs=require('fs'),path=require('path');
const root=__dirname,port=process.env.PORT||5057;
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg'};
http.createServer((req,res)=>{
  let p=decodeURIComponent(req.url.split('?')[0]);if(p==='/')p='/index.html';
  const f=path.join(root,path.normalize(p));
  if(!f.startsWith(root)){res.writeHead(403);return res.end()}
  fs.readFile(f,(e,d)=>{if(e){res.writeHead(404);return res.end('Not found')}
    res.writeHead(200,{'Content-Type':types[path.extname(f)]||'application/octet-stream'});res.end(d)});
}).listen(port,()=>console.log('Reshu Art Lobby site on http://localhost:'+port));
