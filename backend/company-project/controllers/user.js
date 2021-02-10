const User = require('../models/user');
const asyncHandler = require('../middleware/async');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

exports.register = asyncHandler(async(req, res)=>{
    const { name, email, phone_number, password,position, specialization } = req.body;
      var encryptedPassword = bcrypt.hashSync(password, 10)
      if(name,email){
        const userDetails = await User.findOne({ name: name, email: email })
        if(userDetails!=null){
          res.status(200).send({status:false,msg:'Data Already Exists'});
        }
        else{
          const user = await User.create({ name, email, password:encryptedPassword, phone_number,position, specialization });
          res.status(200).send({status:true,data:user,msg:'Registration Successful'});
        }
      }
      else{
        res.status(200).send({status:false,msg:'Registration unsuccessful'});
      } 
});

exports.login = asyncHandler(async (req, res, next) => {
    const {  email, password} = req.body;
    if(email){
      const userDetails = await User.findOne({ email: email });
      console.log(userDetails)
      if (userDetails!=null) {
        const match = await bcrypt.compareSync(password, userDetails.password)
        if(match){
          res.status(200).send({status:true,data:userDetails,msg:'Login Successful'});
        }
        else{
          res.status(200).send({status:false,msg:'user password incorrect'});
        }
      }else{
        res.status(200).send({status:false,message:'Invalid details'});
      }
    }
    else{
        res.status(200).send({status:false,msg:'Invalid Email'});
    }
  });

exports.matchskills = asyncHandler(async(req, res)=>{
        let companyDetails = await User.aggregate(
            [
                { $match: { _id: new mongoose.Types.ObjectId(req.params.id) }},
                {
                    $lookup:
                    {
                        from: 'companies',
                        localField: "specialization",
                        foreignField: "specialization",
                        as: "userskillmatchedcompanies"
                    }
                },
            ]);
            if (companyDetails != null) {
                res.status(200).send({ status: true, data: companyDetails, msg: 'company skills matched' });
            } else {
                res.status(200).send({ status: false, msg: 'company skills not matched' });
            }
});  