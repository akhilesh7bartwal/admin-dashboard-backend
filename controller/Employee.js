const bcrypt = require('bcryptjs/dist/bcrypt')
const jwt = require('jsonwebtoken')
const employeeModel = require('../model/Employee')

const Joi = require('@hapi/joi');

exports.showIndex = (req,res) =>{
    res.send("Running Node API")
}

exports.signUp =async (req,res) =>{

    const emailExist = await employeeModel.findOne({email:req.body.email})
    if(emailExist){
        res.status(400).send("Email exist");
        return;
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password,salt)

    const employee = new employeeModel({
        name:req.body.name,
        email:req.body.email,
        address:req.body.address,
        password:hashedPassword
    })
    try{
        const registrationSchema = Joi.object({
            name:Joi.string().min(3).required(),
            address:Joi.string().min(3).required(),
            email: Joi.string().min(5).required().email(),
            password: Joi.string().min(8).required()
        })
        const {error} =await registrationSchema.validateAsync(req.body)

        if(error){
            res.status(200).send(error.details[0].message)
            return;
        }
        else{
            const saveUser = await employee.save()
            res.status(200).send("Employee created successfully.")
        }
    }
    catch(error){
        res.status(500).send(error)
    }
    // employee.save()
    // .then(
    //     data =>{
    //         res.send(data)
    //     }).catch(error => {res.send(error)})
}

exports.signin = (req,res) =>{
    employeeModel.find()
    .then(result =>{
        res.send(result)
    }).catch(error => res.status(400).send(error))
}