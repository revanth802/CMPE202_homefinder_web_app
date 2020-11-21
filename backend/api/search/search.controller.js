const Property= require("../../models/homelistings.js");

module.exports = {
    search: (req, res) => {
        console.log("in search controller")
        body = req.body
        // body.term="revanth";
        // body.floor="revanth";
        // body.propertyTypes="revanth";
        // body.other="revanth";
            console.log(body);
           
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
            { parkingType: { $regex:body.parking, $options: "i" } },
            { year_built: { $gte: body.year } },
            { otherAmenities: { $regex: body.other, $options: "i" } }
            ]
        }, (error, properties) => {
            if (error) {
                res.writeHead(500, {
                    'Content-Type': 'text/plain'
                })
                console.log("error", error)
                res.end();
            }
            res.status(200).json(properties);
        });
    },
    }
