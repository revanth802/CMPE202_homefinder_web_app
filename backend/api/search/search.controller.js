const Property= require("../../models/homelistings.js");
const Favourites= require("../../models/favouriteHomes.js");
const FavouriteSearches = require("../../models/favouriteSearches.js")
module.exports = {
    search: (req, res) => {
        console.log("in search controller")
        body = req.body
            // console.log(body);
           
        Property.find({
            $and: [{
                $or: [{ addressLine1: { $regex: body.term, $options: "i" } },
                { addressLine2: { $regex:  body.term, $options: "i" } },
                { city: { $regex:  body.term, $options: "i" } },
                { state: { $regex:  body.term, $options: "i" } },
                { zipcode: { $regex:  body.term, $options: "i" } }]
            },
            {type:body.type},
            { price: { $gte: body.minPrice, $lte: body.maxPrice } },
            // { area: { $lte: area } },
            { bedrooms: { $gte: body.beds } },
            { bathrooms: { $gte: body.baths } },
            { flooring: { $regex: body.floor, $options: "i" } },
            { hometype: { $regex: body.propertyTypes, $options: "i" } },
            { parking: { $regex:body.parking, $options: "i" } },
            { year_built: { $gte: body.year } },
            { amenities: { $regex: body.other, $options: "i" } },
            { owner: { $ne: body.email } }
            ]
        }, (error, properties) => {
            if (error) {
                res.writeHead(500, {
                    'Content-Type': 'text/plain'
                })
               
                res.end();
            }
        
            if(body.role==="user"){
            let ids_homes = properties.map(({ _id }) => _id)
            for(let i=0;i<ids_homes.length;i++)
            {
           
            FavouriteSearches.updateOne(
              {user:body.email,homeId:ids_homes[i]},
              { $inc: { frequency: 1 }},{upsert:true},
              (error, result) => {
            
              }
            );}}
            res.status(200).json(properties);
        });
    },

    addToFavourites: (req, res) => {
        body=req.body
        console.log(body)
        var newUserDetails = new Favourites({
            email: body.userid,
            houseId : body.houseid
      });
  
      newUserDetails.save((error, data) => {
        if (error) {
          console.log('error', error);
          
          res.end("error");
        }
        else {
          console.log("success");
         res.send("success")
          res.end();
        }
      });
        },
        myfavorites: (req, res) => {
          var store_ids=null
           Favourites.find({email : req.body.email}, (error, result) => {
              store_ids=result
              var op = store_ids.map(function(item) {
                return item.houseId;
              });
              Property.find({_id:{$in:op}},(error1,result1)=>{
                  res.send(result1)
                  res.end()
              }
                
                );
            });
            
          },

          myfavoriteSearches: (req, res) => {
            console.log("in my favr8 searches")
            var store_ids2=null
             FavouriteSearches.find({user : req.body.email}, (error, result) => {
                // store_ids2=result.sort( { frequency : -1} )
                result.sort(function(a, b) {
                  return (b.frequency) - (a.frequency);
              });
              // console.log(result)
              store_ids2=result
                var op2 = store_ids2.map(function(item) {
                  return item.homeId;
                })
              

                Property.find({ _id: { $in: op2 } },(err, res2) =>{

                  var orderedResults = op2.map(function(id) {
          
                      return res2.find(function(document) {
                          return document._id.equals(id);
                      });

                      
                  });
                  res.send(orderedResults)
                  res.end()
                  // console.log(orderedResults)
              
              });
                
            });
          
              
            }



    }
