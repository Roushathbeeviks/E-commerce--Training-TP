var db= require("../config/connection")
var collection= require('../config/collection')
var objectId=require('mongodb').ObjectId

module.exports=
{
    addproduct:(product, callback)=>
    {
        db.get().collection('product').insertOne(product).then((data)=>
        {
            console.log(data);
            callback(data.insertedId)
            // console.log(data.insertedId[0]._id)
        })    
},

    getallproduct:()=>
    {
        return new Promise(async(resolve,reject)=>{
       let products= await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
       resolve(products)
        })
    },

 deleteProduct:(proId)=>
    {
    return new Promise((resolve,reject)=>
    {
        db.get().collection(collection.PRODUCT_COLLECTION).deleteOne({_id:objectId(proId)}).then((response)=>
        {
          console.log(response)
          resolve(response)
        })
    })
},

getProductdetails:(proId)=>
{
    return new Promise((resolve,reject)=>
    {
        db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:objectId(proId)}).then((product)=>
        {
            resolve(product)
        })
    })
},

updateProduct:(proId, productDetails)=>
{
    return new Promise((resolve,reject)=>
    {
        db.get().collection(collection.PRODUCT_COLLECTION).updateOne({_id:objectId(proId)},
        {$set:
        {
            name: productDetails.name,
            category:productDetails.category,
            price:productDetails.price,
            description:productDetails.description

        }}).then((response)=>
        {
            resolve()
        })
    })
}



}