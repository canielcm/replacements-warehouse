
const validateRole = (...role)=>{
    return (req, res, next)=>{
        console.log('validateRole executed');
        console.log(role);
        
        const validRole = role.some(e=>e===req.user.role);
        validRole?next():res.status(401).json({message: 'Access denied, role not valid for this feature', rolesRequired: role});
    }
}

module.exports = {validateRole};