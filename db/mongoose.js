const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/cometaNews', {
     useNewUrlParser: true,
     useCreateIndex: true,
     useUnifiedTopology: true,
     useFindAndModify: false
})

mongoose.connection.on('connected', function () {  
     console.log('Mongoose default connection open to ' + 'mongodb://127.0.0.1:27017/cometaNews');
}); 
   
// If the connection throws an error
mongoose.connection.on('error',function (err) {  
     console.log('Mongoose default connection error: ' + err);
}); 
   
// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
     console.log('Mongoose default connection disconnected'); 
});
   
// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
     mongoose.connection.close(function () { 
          console.log('Mongoose default connection disconnected through app termination'); 
          process.exit(0); 
     }); 
}); 