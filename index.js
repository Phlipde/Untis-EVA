const express = require('express')
const AWS = require("aws-sdk");
const s3 = new AWS.S3()

const app = express()
async function getAWS(){
    console.log("getting AWS");
    await s3.putObject({
        Body: JSON.stringify({test:"main"}),
        Bucket: process.env.CYCLIC_BUCKET_NAME,
        Key: "test/main.json",
    }).promise()


    // get it back
    let my_file = await s3.getObject({
        Bucket: process.env.CYCLIC_BUCKET_NAME,
        Key: "test/main.json",
    }).promise()

    console.log(JSON.parse(my_file))

}

app.all('/', (req, res) => {
    console.log("Just got a request!")
    getAWS()
    res.send('Yo!')
})
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is listening on port ${process.env.PORT || 3000}`);
  });