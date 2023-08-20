const express = require('express')
const CyclicDb = require("@cyclic.sh/dynamodb")
const db = CyclicDb("splendid-slug-hoodieCyclicDB")


const app = express()
async function getDB(){
    
    const main = db.collection("main")

    // create an item in collection with key "leo"
    let leo = await main.set("leo", {
    type: "cat",
    color: "orange"
    })
    
    // get an item at key "leo" from collection main
    let item = await main.get("leo")
    console.log(item)
    

}

app.all('/', (req, res) => {
    console.log("Just got a request!")
    getDB()
    res.send('Yo!')
})
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is listening on port ${process.env.PORT || 3000}`);
  });