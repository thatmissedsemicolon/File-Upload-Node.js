const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors')
const PORT = 3000;
const app = express();


app.use(express.static('public'));
app.use(cors()); 
app.use(fileUpload());


app.post('/upload', (req, res) => {

    if (!req.files) {
        return res.status(500).send({ msg: "file is not found" })
    }
       
    const myFile = req.files.file;

  
    myFile.mv(`${__dirname}/public/${myFile.name}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }
   
        return res.send({name: myFile.name, path: `/${myFile.name}`});
    });
})


app.listen(process.env.PORT||PORT);