const path= require("path");
const multer= require("multer");

// *? creating disk storage 
const storage= multer.diskStorage({
     destination: function(req,file,cb){
       cb(null,path.join(__dirname,'../uploads'))
     },
     filename:function(req,file,cb){
        // ** unique string sequence to save file in uploads dir
        const uniquePrefix = Date.now()+ Math.random().toString();
        cb(null, uniquePrefix+file.originalname);
     }
})

// *? fileFilter method to check file type while uploading process

const fileFilter=  function(req,file,cb){
    if(file.mimetype==='image/jpeg' || file.mimetype==='image/png'|| file.mimetype==='image/jpg'){
        cb(null,true)
    }
    else{
        cb(null,false)
    }

}

// ? upload instance 
const upload= multer({
    storage,
    limits:1024*1024*20 , // 20 MB file size 
    fileFilter
})


// single file upload method 

 const uploadSingle=function(fileKey){
    // returning a middleware function 
    return function(req,res,next){
        const uploadItem= upload.single(fileKey);
        uploadItem(req,res,function(err){
            if(err instanceof multer.MulterError){
                // a multer error has occured while uploading
              
                return res.status(500).send(err)
            }
           else if(err){
                // an unknown error has occured
               
                return res.status(500).send(err)
            }
            else {
                // everything is ok and return 
                return next()
            }
        })
    }
 }
//? upload mulitple file method
const uploadMultiple=function(fileKey){
    // returning a middleware function 
    return function(req,res,next){
       
        const uploadItems= upload.array(fileKey,10);
        uploadItems(req,res,function(err){
            if(err instanceof multer.MulterError){
                // a multer error has occured while uploading
                
                return res.status(500).send(err)
            }
           else if(err){
                // an unknown error has occured
                
                return res.status(500).send(err)
            }
            else {
                // everything is ok and return 
                
                return next()
            }
        })
    }
 }
 module.exports={uploadSingle,uploadMultiple}