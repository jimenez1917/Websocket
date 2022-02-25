const express = require('express');
const {Server} = require ('socket.io');
const ProductsManager= require('./Manager/ProductsManager');

//services
const ProductsService = new ProductsManager();
const app = express();
const PORT = process.env.PORT||8080;
const server = app.listen(PORT, ()=>console.log(`listening on ${PORT}`));
const io=new Server(server);

app.use(express.static(__dirname + '/public'))

io.on('connection',async socket=>{
    console.log('Conectado')
    let products = await ProductsService.get();
    io.emit('productlog',products);

    socket.on('sendProduct',async data=>{
        await ProductsService.add(data);
        let products = await ProductsService.get();
        io.emit('productlog',products);
    })
    socket.on('message',data => {
        console.log(data);
    })
    
})


// app.use(express.urlencoded({extended: true}));
// app.use(express.json());


// app.get('/',(req,res)=>{
//     res.render('home')
// })


// app.post('/productos',(req,res) =>{
//     let product =req.body;
//     ProductsService.add(product).then(result=>res.render('productsview',{result}));
// })

