const express = require("express"); //importar express
const bodyParser = require("body-parser");
const cors = require('cors');
const configMensaje = require('./configMensaje');

/*firebase*/
const compression = require('compression')
const path = require('path');
/*-------*/

const app = express(); //crear al servidor
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());
app.use(cors());

/*firebase*/
require('dotenv').config()

app.use(express.urlencoded())
app.use(express.json())

app.set('views', path.join(__dirname, 'static', 'views'))
app.set('view engine', 'ejs')
app.use(compression())
app.use('/public', express.static(path.join(__dirname, 'static', 'public')))

var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
const { json } = require("express");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://kndy-food-8c7ba-default-rtdb.firebaseio.com",
});

let db = admin.firestore();

app.get('/api/codigoqr/:uid', async (req, res) => {
    let b = db.collection('pedidos')
    let userPedidos = await b.where('uid', '==', req.params.uid)
    let array = await userPedidos.get()
    if(array) {
        let pedidos = []
        array.forEach(doc => {
            pedidos.push(doc.data())
        })
        console.log('correcto')
        res.status(200).send(pedidos);
    }
    else console.log("Hijoles, esta mal we xd")
})
/*-----------*/

/* Correo */
app.post('/api/formulario', (req, res) => {
    configMensaje(req.body);
    res.status(200).send();
})

app.get('/', (req,res) => {
    res.send('App Works !!!!');
});


app.listen(port, () => {
    console.log(`hola servidor ejecucion en http://localhost:${port}`);
})
