 export const name ="Tom"
 const age=18

 function sayHello(params) {
    console.log("Hello ES Module");
}

const info={
    account:"Mike",
    password:"123456"
}

// export {name}
// export {age}
// export {sayHello}
// export {info}

export {
    name,
    age,
    sayHello,
    info
}