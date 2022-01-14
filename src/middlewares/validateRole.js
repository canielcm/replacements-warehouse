
const validateRole = (role)=>{
    return (req, res, next)=>{
        const validRole = role.some(e=>e===req.user.role);
        validRole?next():res.status(401).json({message: 'Access denied'});
    }
}

module.exports = validateRole;