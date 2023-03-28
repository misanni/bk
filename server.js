const express= require('express');
const app=express();
const book= require('./models/book.js');
const { response } = require('express');
const morgan =require("morgan");
app.use(express.urlencoded({extended: false}));
const methodOverride=require('method-override');
app.use(methodOverride('_method'));





app.get('/book', (request, response)=>{
   response.render('index.ejs',{
    allbook:book
 })
});
//app.get('/book/:id /edit',(request, response)=>{

   // response.render('index.ejs', {allbook:book});
//});

app.get('/book/:id', (request, response)=>{
    response.render("show.ejs",{i:request.params.id,
         bookname : book[request.params.id].name,
         bookimg:book[request.params.id].img,
          booktype:book[request.params.id].type});
           
});

app.get('/books/new', (request, response)=>{
    console.log(request.body);
    response.render("new.ejs");

});
app.get('/book/:id/edit',(request, response)=>{
response.render("edit.ejs",{i:request.params.id,
    bookname : book[request.params.id].name, 
    bookimg:book[request.params.id].img, 
    booktype:book[request.params.id].type, 
    bookid:book[request.params.id].id});
    
});

app.post('/book', (request, response)=>{
    console.log(request.body);
    book.push(request.body);
    
    response.redirect("/book");
});


app.delete('/book/:id', (request, response)=>{
    book.splice(request.params.id, 1);
    response.redirect('/book');
});
app.put('/book/:id',(request, response)=>{
    book[request.params.id] = request.body; 
	response.redirect('/book');
})
app.listen(3000,()=>{
    console.log("serveris listening to port...")
});