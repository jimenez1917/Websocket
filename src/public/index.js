const socket = io();

let form=document.getElementById('productform');
form.addEventListener('submit',(evt) => {
    evt.preventDefault();
    let data=new FormData(form);
    let sendObj ={};
    data.forEach((val,key)=>sendObj[key]=val);
    socket.emit('sendProduct',sendObj);
    form.reset();
})

socket.on('productlog',(data)=>{
    let products = data.payload;
    let productTem = document.getElementById('productTem');
    fetch('templates/newsProducts.handlebars').then(response=>{
        // let a=response.text();
        // console.log(a);
        return response.text();
    }).then(template=>{
        const processTem = Handlebars.compile(template);
        const html = processTem({products})
        productTem.innerHTML=html;
    })
})

function register(){
    let user = document.getElementById('user');
    let mensaje = document.getElementById('message')
            if(user.value.trim().length>0 && mensaje.value.trim().length>0){
                socket.emit('message',{
                user:user.value,
                message:mensaje.value
            })
            }
            user.value="";
            mensaje.value="";
}
// user.addEventListener('keyup',(evt)=>{
//     if(evt.key==="Enter"){
//         if(chatBox.value.trim().length>0){
//             socket.emit('message',{
//                 user:user,
//                 message:chatBox.value
//             })
//             chatBox.value="";
//         }
//     }
// })
// socket.on('productlog',(data)=>{
//     let products = data.payload;
//     let productTem = document.getElementById('productTem');
//     fetch('templates/newsProducts.handlebars').then(response=>{
//         // let a=response.text();
//         // console.log(a);
//         return response.text();
//     }).then(template=>{
//         const processTem = Handlebars.compile(template);
//         const html = processTem({products})
//         productTem.innerHTML=html;
//     })
// })