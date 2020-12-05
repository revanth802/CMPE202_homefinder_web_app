const router = require("express").Router();

const fs = require("fs");
const multer = require("multer");

const {
    sell,
    getOwners
} = require("./sell.service");
const { uploadFileToS3 } = require("./awsImageUpload");

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });


router.post("/", sell);

router.post("/uploadImage", upload.single("file"), async (req, res) => {
    console.log("Req body for add Pr", req.body);
    var userId = req.query.userId;
      try {
        
        const file = req.file
        const type = "jpg";
        console.log("type:::", type);
        const timestamp = Date.now().toString();
        const fileName = userId + "_"+timestamp; //`bucketFolder/${timestamp}-lg`;
        const data = await uploadFileToS3(file.buffer, fileName, type, "user");
  
        return res.status(200).send(data);
     } catch (error) {
        console.log("error", error);
      return res.status(400).send(error);
      }
    // });
  
    // return res.send({ signedUrl: data })
  });
  


router.get("/getOwners",getOwners)
module.exports = router;