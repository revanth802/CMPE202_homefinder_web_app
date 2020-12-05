const fs = require('fs');
const AWS = require('aws-sdk');
const  configValues  = require('../../config/mongoconfig');
const s3 = new AWS.S3({
  accessKeyId: configValues.s3AccessKey,
  secretAccessKey: configValues.s3SecretAccessKey
});



function uploadFileToS3(buffer, name, type,param) {

    //const fileContent  = Buffer.from(req.files.uploadedFileName.data, 'binary');
    let promise = new Promise((resolve, reject) => {

        let params= {
            ACL: 'public-read',
            Body: buffer,
            Bucket: configValues.s3BucketName +"/images",
            ContentType: type.mime,
            Key: `${name}.${type}`
          };
        
        
        s3.upload(params, (s3Err, resp) => {
            if (s3Err) {
                console.log("error in upload: ",s3Err);
                //deleteFile(file);
                reject(s3Err);
            }
            else {
                imageUrl = resp.Location;
                //deleteFile(file);
                resolve(resp);
            }
          });
        // s3.upload(params, function (s3Err, resp) {
        //     if (s3Err) {
                
        //     } else {
                
        //     }
        // });
    });
    return promise;
};

exports.uploadFileToS3 = uploadFileToS3;