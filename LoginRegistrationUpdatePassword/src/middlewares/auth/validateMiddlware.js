const Joi=require("joi");
const validator=require("express-joi-validation").createValidator({});

const validateMiddleware=(schema, property) => { 
    return (req, res, next) => { 
      // const { error } =Joi.(req[property], schema); 
      const {error}=schema.validate(req[property]);
      const valid = error == null; 
      if (valid) { next(); } 
      else { 
        const { details } = error; 
        const message = details.map(i => i.message).join(',')
        console.log("error", message); 
        res.status(422).json({ error: message }) 
      }
      // res.send(data) 
    } 
    
  }

  module.exports=validateMiddleware;