// validate-middleware
const validate = (schema) => async (req, res, next) => {
    console.log('/auth/register')
    try{
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    }
    catch(err){
        const message = err.errors[0].message;
        res.status(400).json({message: message});
    }
};
module.exports = validate;