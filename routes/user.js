const { response, Router } = require('express');
var express = require('express');
const { Admin } = require('mongodb');
// var flash= require('flash')
var router = express.Router();
var productHelpers= require('../helper/product-helpers')
var userHelpers = require('../helper/user-helper')

 function verifyLogin(req,res,next)
{
  if(req.session.loggedIn)
  {
    next()
  }
  else
  {
    res.redirect('/login')
  }
}
/* GET home page. */


  router.get('/', function(req, res, next) 
  {
  let user=req.session.user
  console.log(user)
  productHelpers.getallproduct ().then((product)=>
     {
         res.render('user/view-product', {product,user});
     }
  )});



router.get('/login', (req,res)=>
{
    // if(req.session.loggedIn)
    //   {
    //  res.redirect('/')
    //  }
    // else
    // {

      res.render('user/login',{loginErr:req.session.loginErr})
      req.session.loginErr=false
    // }

  
})




router.get('/create', (req,res)=>
{
  res.render('user/create')
});




router.post('/create', (req,res)=>
{
  userHelpers.doSignup(req.body).then((response)=>
  {
    console.log(req.body)
  })
});



router.post('/login', (req,res)=>
{
  userHelpers.doLogin(req.body).then((response)=>
  {
    if(response.status)
    {

      req.session.loggedIn=true
      req.session.user=response.user
      res.redirect('/')
    }
    else
    {
      req.session.loginErr="Invalid Username or Password"
      res.redirect('/login')
    }
})
});


router.get('/logout',(req,res)=>
{
  req.session.destroy()
  // req.flash('success',"Successfully logged out");
  res.redirect('/login')
})

router.get('/cart' ,verifyLogin,(req,res)=>
{
  res.render('user/cart')
})



module.exports = router;
