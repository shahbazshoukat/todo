const UserHandler = require("../handlers/users");

class UserManager{

    static async createUser(data){
        try{
            const doc = UserHandler.createUser(data);
            return doc;
        }catch(err){
            console.log(err);
        }
    }

    static async getUsers(){
        try{
            const doc = UserHandler.getUsers();
            return doc;
        }catch(err){
            console.log(err);
        }
    }
    static async getUser(userId){
        try{
            const doc = await UserHandler.getUser(userId);
            return doc;
        }catch(err){
            console.log(err);
        }
    }

}

module.exports = UserManager;