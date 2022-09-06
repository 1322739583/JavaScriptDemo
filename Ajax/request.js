

//const request=require('Ajax/request')
const app=request()
app.get('/',(request,response)=>{
    console.log("hello")
})
app.listener(8000,()=>{
    console.log("8000 is listenning")
})