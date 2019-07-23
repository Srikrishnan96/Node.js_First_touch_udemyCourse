var userNames = [];
function requestHandler(req, res) {
    var url = req.url;
    var method = req.method;
    res.setHeader('Content-Type', 'text/html');
    if(url === '/') {
        res.write('<html>');
        res.write('<head><title>NodeApp</title></head>');
        res.write(`<body><h1>GREETINGS FROM NODE!!!</h1>
            <form action='/create-users' method='POST'><input type='text' name='username' placeholder='UserName'><button type='submit'>SUBMIT</button></form></body>`);
        res.write('</html>');
        return res.end();
    }
    if(url === '/users') {
        res.write('<html>');
        res.write('<head><title>NodeApp</title></head>');
        res.write(`<ul>
            ${(function(){
                var nameList = '';
                userNames.forEach(function(name){
                    nameList += `<li>${name}</li>`
                });
                return nameList;
            })()}
        </ul>`);
        res.write(`<body>
            <form action='/create-users' method='POST'><input type='text' name='username' placeholder='UserName'><button type='submit'>SUBMIT</button></form></body>`);
        return res.end();
    }
    if(url === '/create-users') {
        var names = [];
        req.on('data', (name)=> {
            names.push(name);
        });
        req.on('end', ()=>{
            const parsedData = Buffer.concat(names).toString();
            userNames.push(parsedData.split('=')[1]);
            res.writeHead(302, {'Location': '/users'});
            return res.end();
        });
        return;
    }
}

module.exports = requestHandler;