const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/cometaNews', {
     useNewUrlParser: true,
     useCreateIndex: true,
     useUnifiedTopology: true,
     useFindAndModify: false
})

mongoose.connection.on('connected', function () {  
     console.log('Conexão estabelecida e rodando em ' + 'mongodb://127.0.0.1:27017/cometaNews');
}); 
   
mongoose.connection.on('error',function (err) {  
     console.log('Erro de conexão no Mongoose: ' + err);
}); 
   
mongoose.connection.on('disconnected', function () {  
     console.log('Conexão do Mongoose finalizada.'); 
});
   
process.on('SIGINT', function() {  
     mongoose.connection.close(function () { 
          console.log('Conexão do Mongoose terminada devido ao encerramento da aplicação.'); 
          process.exit(0); 
     }); 
}); 