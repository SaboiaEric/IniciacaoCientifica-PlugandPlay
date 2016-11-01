    var http = require('http').createServer(servidor);
    var fs = require('fs');
    var five = require('johnny-five');
    var arduino = new five.Board();
    var led0, led1, led2, led3;

    arduino.on('ready', function(){
      console.log("Arduino Pronto");

      led0 = new five.Led(13);
      led1 = new five.Led(12);
      led3 = new five.Led(9);
      
      //Recebendo os valores dos sensores
      /*led2.on("change", () => {
        console.log(led2.value);
      });*/

      //document.body.style.backgroundColor = "red";

      //Alterar o tempo pela tela
      //Tempo do irrigador
      setInterval(() => {
        led3.toggle();
      }, 9600);
    });


    function servidor(req, res){
      var url = req.url;
      if(url == '/'){
        res.writeHead(200);
        res.end(fs.readFileSync('view/index.html'));
      }else if(url == '/led0'){
        res.writeHead(302, {'Location': '/'});
        res.end();
        led0.toggle();
      }else if(url == '/led1'){
        res.writeHead(302, {'Location': '/'});
        res.end();
        led1.toggle();
      }else{
        res.writeHead(200);
        res.end("<h1>Erro 404</h1>");
      }

    };

    http.listen(5000, function(){
      console.log("Servidor On-line");
    });