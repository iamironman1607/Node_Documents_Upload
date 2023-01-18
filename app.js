const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');
const mongoose= require('mongoose');
mongoose.set('strictQuery', true);

const ejs= require('ejs');
app.set('view engine', 'ejs');
app.set('views', 'views')
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res, next)=>{

    res.render('index');
})
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, 'public', 'uploads'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
const upload = multer({ storage: storage });
const multiUploads = upload.fields([{name:'file1'},{name:'file2', maxCount:3}]);

app.post('/uploadfiles', multiUploads, (req, res, next)=>{
   let files= req.files;
   console.log(files)
    if(req.files){
       res.status(200).json({files})
    }
    else{

        res.status(401).json({message:'failed as usual'})
    }
})



mongoose.connect('mongodb://localhost:27017')
.then(conn=>{
    console.log('DB Connectd');
    app.listen(3000, console.log('Server up at 3000'));
})
.catch(err=>{
    console.log('DB Connection Failed', err.message);
})





