const fs = require('fs');
const pathToProducts = __dirname+'/../files/products';

class ProductsManager{
       add=async(product)=>{
           if(fs.existsSync(pathToProducts)){
               try{
                   let data= await fs.promises.readFile(pathToProducts,'utf-8');
                   let products=JSON.parse(data);
                   if(products.length===0){
                       product.id=1;
                       products.push(product);
                       fs.promises.writeFile(pathToProducts,JSON.stringify(products,null,2))   
                       return {status:"succes", payload:'Added #1 product'}                    
                   }
                   product.id= products[products.length-1].id+1;
                   products.push(product);
                   await fs.promises.writeFile(pathToProducts,JSON.stringify(products,null,2));
                   return products;
               }catch(error){
                   return {status:"error", error:'holi'}
               }
           }else{
               try{
                   product.id=1;
                   await fs.promises.writeFile(pathToProducts,JSON.stringify([product],null,2))
                   return {status:"succes", payload:"Added first product"}
               }catch(error){
                 return{status:"error", error: 'error'}
               }
           }
       }

       get = async()=>{
           if(fs.existsSync(pathToProducts)){
                try{
                    let data= await fs.promises.readFile(pathToProducts,'utf-8');
                    let products=JSON.parse(data);
                    return {status:"success", payload: products}
               }catch(error){
                   return {status:"error", error:'error'}
               }
           }else{
               return {status:"error", message:'Don\'t exist the products'}
           }
       }
    
       delete = async (id)=>{
        //    if(id) return {status: "error", error:id}
           if(fs.existsSync(pathToProducts)){
               try{
                   let data = await fs.promises.readFile(pathToProducts,'utf-8')
                   let products = JSON.parse(data);
                   let newproducts= products.filter(product => product.id!==parseInt(id))
                   await fs.promises.writeFile(pathToProducts,JSON.stringify(newproducts,null,2))
                   return {status:"success", payload:'Deleted Product'};
               }catch(err) {
                   return {status:"error", message: "Error"}
               }
           }else{
               return {status:"failes", message: 'try again later'}
           }
       }
       getById = async(id)=>{
           if(!id) return {status:"failes", message:"Needed an Id"}
           if(fs.existsSync(pathToProducts)){
               try{
                   let data = await fs.promises.readFile(pathToProducts,'utf-8')
                   let products = JSON.parse(data);
                   let product = products.filter(product =>product.id === parseInt(id))
                   return {status:'success', products:product}
               }catch(error) {
                   return{status:'denied', message: error}
               }
           }
       }
       UploadById = async (id,body) => {
           if(!id) return {status:'denied', message:'Needed an Id'}
           if(fs.existsSync(pathToProducts)){
                try{
                    let data = await fs.promises.readFile(pathToProducts,'utf-8')
                    let products = JSON.parse(data);
                    let newproducts= products.map(product => {
                        if(product.id===parseInt(id)){
                            return body;
                        }else{
                            return product;
                        }
                    })
                    await fs.promises.writeFile(pathToProducts,JSON.stringify(newproducts,null,2))
                    return {status:'success', message: 'Product Update'}
                }catch(error){
                    return {status:'error', message: error.message}
                }
           }
        }
}

module.exports=ProductsManager;