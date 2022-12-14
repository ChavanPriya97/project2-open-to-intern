const collegeModel = require("../models/collegeModel")

const createCollege = async function(req,res){
    try {
        let data = req.body
        if(Object.keys(data).length == 0 ) return res.status(400).send({status : false , message : "please provide data inside the body"})
        const college = await collegeModel.create(data)

        return res.status(201).send({status : true , message : "Successfully create college",data:college})
    } catch (error) {
        return res.status(500).send({status : false , message : error.message})   
    } 
}
module.exports = {createCollege}