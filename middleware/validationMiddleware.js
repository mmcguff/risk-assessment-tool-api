
const BaseJoi = require('joi');
const Extension = require('joi-us-zipcode');
const Joi = BaseJoi.extend(Extension);

module.exports = (req, res, next) => {

    const schema = Joi.object().keys({
        state: Joi.string().length(2),
        zip: Joi.string().usZipCode()
      });
    
    const obj = {
        state: req.params.state,
        zip: req.params.zip
    };
    
    const { error } = Joi.validate(obj, schema);
    const valid = error == null; 

    if (valid) { 
        next(); 
      } else { 
        const { details } = error; 
        let message = details.map(i => i.message).join(',');
    
        if(message.includes('zip')){
            //Don't need to see all the zip codes
            message = message.substring(0,31);
        }
        
        console.log("error", message); 
       res.status(422).json({ error: message }) 
    } 
} 