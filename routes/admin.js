 var express = require('express');
var router = express.Router();
var productHelpers= require('../helper/product-helpers')

/* GET users listing. */
router.get('/', function(req, res, next) {

  productHelpers.getallproduct().then((product)=>
  {
    console.log(product)
    res.render('admin/view-products',{product,admin:false})
  })
  
});
router.get('/add-product', function(req,res){
  res.render('admin/add-product')
 });


 

 router.post('/add-product', (req,res)=>{
    console.log(req.body)
    console.log(req.files.image)

    productHelpers.addproduct(req.body,(id)=>
    {
      let Image=req.files.image //to get image files
      Image.mv('./public/product-images/'+id+'.jpg',(err,done)=>
      {
        if(!err)
        {
          res.render("admin/add-product") 
        }
        else
        {
          console.log(err)
        }
      } )
      
    })
 })

 router.get('/delete-product/:id',(req,res)=>
{
  let proId=req.params.id
  console.log(proId)
  productHelpers.deleteProduct(proId).then((response)=>
  {
    res.redirect('/admin/')
  })
})


router.get('/edit-product/:id',(req,res)=>
{
  
  let product= productHelpers.getProductdetails(req.params.id)
  res.render('admin/edit-product')
  
 })

module.exports = router;
