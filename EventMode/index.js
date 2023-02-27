const EventEmitter = require('events')

const event =new EventEmitter();

// event.on("Hello",()=>{
//     console.log("Hello my name is a")
// })

// event.on("Hello", () => {
//   console.log("Hello my name is b");
// });
// event.on("Hello", () => {
//   console.log("Hello my name is c");
// });


event.on("Hello",(sc,msg)=>{
    console.log(`Status code is ${sc} and page is ${msg}`)
})
event.emit("Hello",200,"ok")