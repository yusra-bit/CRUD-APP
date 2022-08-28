const PORT = 3000;
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');



//mongoose connection
 mongoose.connect('mongodb://localhost:27017/readinglist', () => {
     console.log('connected');
 }, 
 e => console.error(e));
  
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));


/*create Schemea*/
const listSchema = {

  title: String,
  author: String,
  rating: String
};

//new mongoose model
const List = mongoose.model("List", listSchema);


app.get('/', (req, res) => {
    res.render('index');
});
app.get('/login', (req, res) => {

        res.render("login")

});

app.get("/display", function(req, res){
    List.find({}, function(err, lists){
      res.render("display", {
       lists:lists
      });  
  
    })
     
  })

app.get('/delete/:id', function(req, res, ) {
      const id = req.params.id;

    List.findByIdAndRemove(id, (err) => {
    if (!err) {
    res.redirect('/display')
    } else {
    console.log('Failed to Delete user Details: ' + err);
    }
    });
    })
  
app.post('/', (req,res) => {
    
    const list = new List ({
        title: req.body.enterTitle,
        author: req.body.enterAuthor,
        rating: req.body.enterRating
    });
        

    list.save(function(err){
        if(!err){
            res.redirect('/')
        }
    });
    


    
});

//update part
app.get('/edit/:id', function(req, res) {
    List.findById(req.params.id, (err,lists ) => {
        if (!err) {
        res.render('edit', {
        lists:lists
        });
        } else {
        console.log('error', 'User not found with id = ' + req.params.id)
        res.redirect('/')
        }
        });
        })

//Creating a function to update data in MongoDB
app.post('/update/:id',  (req,res)=>{

    List.findByIdAndUpdate(req.params.id, {
        title: req.body.enterTitle || "Untitled Note",
        author: req.body.enterAuthor,
        rating: req.body.enterRating
    }, {new: true})
    .then(list => {
    
           console.log('success');
   
        res.redirect('/display')
    })
        
    });



       /* app.post('/update/:id',  (req,res)=>{
            List.findByIdAndUpdate(req.params.id,req.body);
            
        res.redirect('/display')
        });
        */

app.listen(PORT,function (){
    console.log(`Server stared on port ${PORT}`)
    });