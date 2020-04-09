//  control sobre quieres pueden hacer peticiones: 

//Nota*: el asterisco es para todos si quieres solo unos cuantos servidores pon tu direccion.

Api.use((req, res, next) => {  
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, 
    Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// CREACION DE USUARIO PARA CONTROL REMOTO DE MYSQL:

//Nota*: Cambiar el % por una ip si quieres que solo tal servidor pueda conectarse con esa cuenta, % es para todo mundo.

 GRANT ALL PRIVILEGES ON *.* TO 'nombreusuario'@'%' IDENTIFIED BY 'constraseña_usuario' WITH GRANT OPTION;
 FLUSH PRIVILEGES;
 
