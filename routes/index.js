var express = require('express');
var router = express.Router();

var UserModel=require('../schema/user_table');
var AddData=require('../schema/add_table');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Express' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
router.get('/add-data', function(req, res, next) {
  res.render('add-data', { title: 'Express' });
});


router.get('/display-data', function(req, res,
   next) {
  
  AddData.find(function(err,db_users_array){
    if(err){
      console.log("Error in Fetch Data");
    }
      console.log(db_users_array);
      res.render('display-data',{user_array : db_users_array});

  })
 
});

router.post('/add-data', function(req, res, next) {
  // res.render('signup', { title: 'Express' });
  console.log("HEllo")
    // console.log(req);
    var fileobj=req.files.img_file;
    var filename=req.files.img_file.name;
    console.log(fileobj)
    // var img_file=req.body.img_file;

  const mybodydata={
    u_name:req.body.u_name,
    user_city:req.body.user_city,
    user_country:req.body.user_country,
    gender:req.body.gender,
    // img_file:req.body.img_file
    img_file:filename
    
    
  }
// var data=AddData(mybodydata);
// data.save(function(err){
//   if(err){
//     console.log("Error in INsert REcord");
//   }
//   else{
//   res.render('home');
//   }
// })
// });


var data=AddData(mybodydata);
data.save(function(err){
  if(err){
    console.log("Error in INsert REcord");
  }
  else{
        fileobj.mv("public/upload/"+filename,function(err){
       if(err){
          return res.status(500).send(err);
       }
        else{
          // res.send("File Upload");
          res.redirect('display-data');
       }
    })

  // res.redirect('/');
  }
})
});


router.post('/login', function(req, res, next) {
  
    user=req.body.email_name;
    pass=req.body.password;


     UserModel.find(function(err,db_users_array){

    //var email = req.params.email_name;
      // abc=req.params.email_name;
      // abc2=req.params.password; 

  for(var i=0,len=db_users_array.length; i<len;i++){
      if(db_users_array[i].email_name==user && db_users_array[i].password==pass){
          console.log(''+db_users_array[i].email_name);
          res.redirect('/home');
          return;
      }
    }

    res.redirect('/signup');



    //console.log(email);

    //   for (var i = 0, len = db_users_array.length; i < len; i++) {
    //      if(db_users_array[i].email_name==user && db_users_array[i].password==pass){
    //      console.log("Hello");
    //     // console.log(db_users_array[i].email_name);
    //      res.redirect("/home");
    //     break;
    //     }
    //       else{
    //         console.log("Hii");
    //         res.redirect("/signup");
    //       break;
    //       }
    // }
  });  
});

// Show Single data
router.get('/show/:id', function(req, res, next) {
    console.log(req.params.id);

    AddData.findById(req.params.id,function(err,db_users_array){
      if(err){
          console.log("Error in Single Record :"+err)
      }
      else{
          res.render('single-record',{user_array:db_users_array});
      }
    });
});


//Delete data using 
router.get('/delete/:id',function(req,res){

  AddData.findOneAndDelete(req.params.id,function(err,db_users_array){

      if(err){
        console.log('Error in Delete Data'+err);
        res.redirect('/display-data')
      }
      else{
          console.log('Record Delete');
          res.redirect('/display-data')
      }    
  })
});

//Edit Record
router.get('/edit/:id',function(req,res){

  AddData.findById(req.params.id,function(err,db_users_array){
    if(err){
        console.log('Edit Fetch Error '+err)
    }
    else{
        console.log(db_users_array);

        res.render('edit-form',{user_array:db_users_array})
    }

  })
})

router.post('/edit/:id',function(req,res){
    console.log("Edit ID is "+ req.params.id)

      const mybodydata={
        
          u_name:req.body.u_name,
          user_city:req.body.user_city,
          user_country:req.body.user_country

      }
      AddData.findByIdAndUpdate(req.params.id,mybodydata,function(err){
        if(err){
            console.log("Error in Edit"+err)
            res.redirect('/display-data')
        }
        else{
          console.log("HIIIIII")
            res.redirect('/display-data')
        }
      })

})


router.post('/signup', function(req, res, next) {
  // res.render('signup', { title: 'Express' });
  console.log("HEllo")

  const mybodydata={
    user_name:req.body.user_name,
    email_name:req.body.email_name,
    password:req.body.password
  }
var data=UserModel(mybodydata);
data.save(function(err){
  if(err){
    console.log("Error in INsert REcord");
  }
  else{
  res.redirect('login');
  }
});


});

module.exports = router;
