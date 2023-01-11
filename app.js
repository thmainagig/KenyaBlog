const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');
const mongoose = require('mongoose');

const kenyaContent = "Petroleum Exploration in Kenya began in the 1950s within the Lamu Basin. It was until 2012 when the first commercially viable oil discovery was made in the Tertiary rift, followed by significant gas discoveries in offshore Lamu basin. To date, over 86 wells have been drilled with a majority within the Tertiary Rift. An estimate of over 4 billion barrels of crude oil reserves have been encountered in the Lokichar sub-basin by Tullow Plc and its partners, with recovery oil estimated to be 750 million barrels.";
const taalumaContent = "British Petroleum (BP) and Shell began exploring hydrocarbons in 1954 in the Lamu Embayment which resulted in the drilling of ten wells between 1960-1971. The consortium acquired 11,982 km of 2D seismics, 29,725 km of aeromagnetic data as well as 3,814 km of gravity";
const kilimoContent = "Before the 1980s, the tertiary rift was considered inferior exploration-wise with little activity. Shell drilled Eliye Springs-1 (dry) in 1992 and Loperot-1 (oil shows) in 1993 within the Lokichar sub-basin.  This was followed by a period of exploration hiatus that lasted to 2006 when oil was discovered in the Albertine graben in Uganda.";
const biasharaContent = "Acquisition of seismic data within the Anza Basin commenced in 1975 when Whitestone acquired 2D seismic data, with further acquisition surveys carried out by the Ministry of Energy, Chevron, Total E&P, Amoco & Shell over time. On acquiring seismics, Chevron later drilled Anza-1 and Bahati-1 (both dry), Total E&P drilled Ndovu-1 (oil and gas shows), Duma-1 (gas shows) and Kaisut-1 (dry) while Amoco drilled Sirius-1, Bellatrix-1, Chalbi-3, Hothori-1 (all three-had oil and gas shows) and Endela-1 (gas shows). ";
const techContent = "Between the 1960s-70s, Frobisher Ltd and Burmah Oil conducted photo geological field geology, gravity, aeromagnetic and seismic surveys that did not materialize into drilling programs. Elgal 1 & 2 (1987) and were drilled by Amoco but were both dry. ";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/blogDB", {useNewUrlParser: true});

const postContSchema = {
  title: String,
  content: String
};

const PostCont = mongoose.model("PostCont", postContSchema);

const postCultureSchema = {
  title: String,
  content: String
};

const PostCulture = mongoose.model("PostCulture", postCultureSchema);

const postFarmerSchema = {
  title: String,
  content: String
};

const PostFarmer = mongoose.model("PostFarmer", postFarmerSchema);

const postTraderSchema = {
  title: String,
  content: String
};

const PostTrader = mongoose.model("PostTrader", postTraderSchema);

const postTechSchema = {
  title: String,
  content: String
};

const PostTech = mongoose.model("PostTech", postTechSchema);

// var postConts = [];
// var postCultures = [];
// var postFarmers = [];
// var postTraders = [];
// var postTechs = [];

app.get("/", function(req,res){
  PostCulture.find({}, function(err, postCultures){

   res.render("taaluma", {

     taaluma: taalumaContent,
     cultureContent: postCultures
     });
 });
});

app.get("/mining", function(req,res){
  PostCont.find({}, function(err, postConts){

   res.render("index", {

     kenyanWell: kenyaContent,
     miningContent: postConts
     });
 });
});

app.get("/kilimo", function(req,res){
  PostFarmer.find({}, function(err, postFarmers){

   res.render("kilimo", {
     kilimo: kilimoContent,
     farmContent: postFarmers
     });
 });
});

app.get("/biashara", function(req,res){
  PostTrader.find({}, function(err, postTraders){
   res.render("biashara", {
     biashara: biasharaContent,
     businessContent: postTraders
     });
 });
});

app.get("/tech", function(req,res){
  PostTech.find({}, function(err, postTechs){
   res.render("tech", {
     tech: techContent,
     innovationContent: postTechs
     });
 });
});

app.get("/tcompose", function(req,res){
  res.render('tcompose');
})

app.post("/tcompose", function(req,res){
  const postCulture = new PostCulture({
    title: req.body.titleContent,
    content: req.body.postContent
  });
  postCulture.save(function(err){
   if (!err){
     res.redirect("/");
   }
 });
});

app.get("/taalumaposts/:postId", function(req,res){
  const requestedPostId = req.params.postId;

  PostCulture.findOne({_id: requestedPostId}, function(err, postCulture){
    res.render("taalumapost", {
      title: postCulture.title,
      content: postCulture.content
    });
  });
});

app.get("/mining/compose", function(req,res){
  res.render('compose');
})

app.post("/mining/compose", function(req,res){
  const postCont = new PostCont ({
    title: req.body.titleContent,
    content: req.body.postContent
  });
  postCont.save(function(err){
   if (!err){
     res.redirect("/mining");
   }
 });
});

app.get("/oilposts/:postId", function(req,res){
  const requestedPostId = req.params.postId;

  PostCont.findOne({_id: requestedPostId}, function(err, postCont){
    res.render("oilpost", {
      title: postCont.title,
      content: postCont.content
    });
  });
});

app.get("/kilimo/kicompose", function(req,res){
  res.render('kicompose');
})

app.post("/kilimo/kicompose", function(req,res){
  const postFarmer = new PostFarmer({
    title: req.body.titleContent,
    content: req.body.postContent
  });
  postFarmer.save(function(err){
   if (!err){
     res.redirect("/kilimo");
   }
 });
});

app.get("/kilimoposts/:postId", function(req,res){
  const requestedPostId = req.params.postId;

  PostFarmer.findOne({_id: requestedPostId}, function(err, postFarmer){
    res.render("kilimopost", {
      title: postFarmer.title,
      content: postFarmer.content
    });
  });
});

app.get("/biashara/bcompose", function(req,res){
  res.render('bcompose');
})

app.post("/biashara/bcompose", function(req,res){
  const postTrader = new PostTrader({
    title: req.body.titleContent,
    content: req.body.postContent
  });
  postTrader.save(function(err){
   if (!err){
     res.redirect("/biashara");
   }
 });
});

app.get("/biasharaposts/:postId", function(req,res){
  const requestedPostId = req.params.postId;

  PostTrader.findOne({_id: requestedPostId}, function(err, postTrader){
    res.render("biasharapost", {
      title: postTrader.title,
      content: postTrader.content
    });
  });
});

app.get("/tech/tecompose", function(req,res){
  res.render('tecompose');
})

app.post("/tech/tecompose", function(req,res){
  const postTech = new PostTech({
    title: req.body.titleContent,
    content: req.body.postContent
  });
  postTech.save(function(err){
   if (!err){
     res.redirect("/tech");
   }
 });
});

app.get("/techposts/:postId", function(req,res){
  const requestedPostId = req.params.postId;

  PostTech.findOne({_id: requestedPostId}, function(err, postTech){
    res.render("techpost", {
      title: postTech.title,
      content: postTech.content
    });
  });
});

app.listen(5000, function(){
  console.log("Server running successfully");
});
