const interModel = require("../models/internModel");
const collegeModel = require("../models/collegeModel")

const createIntern = async function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    try {
        let data = req.body
        const { name, mobile, email, collegeName} = data

        const findCollege = await collegeModel.findOne({name : collegeName,isDeleted :false}).select({_id:1,__v :0})
        if(!findCollege) return res.status(404).send({status: false , message : "college not fount with this college name"})
        
        const intern = await interModel.create({
            name : name,
            mobile : mobile,
            email:email,
            collegeId : findCollege._id.toString()
        })

        return res.status(201).send({status : true , message : "Successfully create intern",data:intern})
    } catch (error) {
        return res.status(500).send({status : false , message : error.message})   
    }
}

const getInterns = async function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    try {
        let collegeName =  req.query.collegeName

        const findCollege = await collegeModel.findOne({name : collegeName,isDeleted:false})
        if(!findCollege) return res.status(404).send({status: false , message : "college not fount with this college name"})

        const { _id,name ,fullName ,logoLink} = findCollege
        let collegeId = _id

        const internsData = await interModel.find({collegeId : collegeId , isDeleted :false}).select({_id: 1,name:1,email:1,mobile:1})
        if(internsData.length == 0) return res.status(404).send({status : false , message : "interns not found with this college name"})
        
        return res.status(200).send({status : true , message : "list of interns belongs from college",
                        data:{
                            name : name,
                            fullName : fullName,
                            logoLink :logoLink,
                            interns : internsData
                        }})
    } catch (error) {
        return res.status(500).send({status : false , message : error.message})   
    }
}
module.exports = {createIntern,getInterns}