const Company = require('../models/company');
const asyncHandler = require('../middleware/async');

exports.addcompany = asyncHandler(async(req, res)=>{
    const { name, email, phone_number, specialization } = req.body;
    if(name,email){
      const userDetails = await Company.findOne({ name: name, email: email })
      if(userDetails!=null){
        res.status(200).send({status:false,msg:'Data Already Exists'});
      }
      else{
        const user = await Company.create({ name, email, phone_number, specialization });
        res.status(200).send({status:true,data:user,msg:'Company Registration Successful'});
      }
    }
    else{
      res.status(200).send({status:false,msg:'Company Registration unsuccessful'});
    } 
});