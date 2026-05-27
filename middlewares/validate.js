const validate =(schema)=>(req,res,next)=>{
    const {error}=schema.validate(req.body)
    console.log(error);
    if(error)
    {
        return res.status(400).json({error:error.details[0].message})
    }

    next();
}

module.exports=validate;