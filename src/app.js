const express = require('express');
const ProductsManager= require('./Manager/ProductsManager')
const ProductsService = new ProductsManager();
const app = express();



app.set('views',__dirname + '/views')
app.set('view engine','ejs')
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.get('/',(req,res)=>{
    res.render('home')
})


app.post('/productos',(req,res) =>{
    let product =req.body;
    ProductsService.add(product).then(result=>res.render('productsview',{result}));
})

const PORT = 8080;
const server = app.listen(PORT, ()=>console.log(`listening on ${PORT}`));