const express = require("express")
const fs = require("fs")
const path = require("path")

const app = express()
const port = 8000

app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(express.static(path.join(__dirname + "/public")))

app.post("/SendInformation", (req, res) => {
    console.log(`> Information sent...`)

    const data = fs.readFileSync("src/Data.json")
    var myObj = JSON.parse(data)

    myObj.push(req.body)

    jsonContent = JSON.stringify(myObj)

    fs.writeFile("src/Data.json", jsonContent, "utf-8", (err) => {
        if(err) {
            console.log("Error trying to save information\n")
            res.sendStatus(400)
        }

        console.log("> Saved\n")
        res.sendFile(path.join(__dirname + "/src/Login.html"))
    })
})

app.post("/Login", (req, res) => {
    const file = fs.readFileSync("src/Data.json", "utf-8")
    let jsonData = JSON.parse(file)

    let valid = false

    for(let key in jsonData) {
        if(jsonData[key].Username == req.body.Username && jsonData[key].Password == req.body.Password) {
            valid = true
            break
        }
    }

    if(valid == true) {
        console.log("> Successful login")
        res.sendStatus(200)
    } else {
        console.log("- Login error")
        res.sendStatus(400)
    }
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/src/SignUp.html"))
})

app.listen(port, function() {
    console.log(`http://localhost:${port}`)
})
