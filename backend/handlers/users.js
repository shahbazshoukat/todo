const User = require("../models/user");
const bcrypt = require("bcrypt");

class UserHandler{
    static async createUser(data){
       const hash = await bcrypt.hash(data.password, 10);
        const user = new User({
            name: data.name,
            email: data.email,
            password: hash
        });
        return user.save();
    }
    static loginUser(data){
        const q = { email: data.email };
        return User.findOne(q).lean().exec();
    }
    static getUsers(){
        return User.find();
    }
    static getUser(userId){
        return User.findOne({ _id: userId });
    }

}

module.exports = UserHandler;