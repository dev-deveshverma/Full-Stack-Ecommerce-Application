const bcrypt = require('bcryptjs');

const hashPassword = (password) => {
    return  bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

const comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}


module.exports = {
    hashPassword,
    comparePassword,}