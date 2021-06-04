const { User } = require('../models')
const moment = require('moment')
module.exports = {
  getAllUsers() {
    return User.findAll({
      attributes: ['id', 'username', 'email', 'role']
    })
  },
  // méthodes à implémenter
  getUsers(offset = 0, limit = 10) { 
    return User.findAll({ offset: offset, limit: limit })
  },
  getAdmins() { 
    var x= User.findAll({
        where: {       
            role: 'admin' 
        }
      });
      return x
   },
  getAuthors() { 
    var x= User.findAll({
        where: {       
            role: 'author' 
        }
      });
      return x
   },
  getGuests(){ 
    var x= User.findAll({
        where: {       
            role: 'guest' 
        }
      });
      return x
   }, 
  async getUser(id) { 
    return await User.findOne({
    where: {       
        id
    },
    attributes: ['id', 'username', 'email', 'role']
    });
  },
  async getUserByEmail(email) { 
    return await User.findOne({
      where: {       
        email 
      },
      attributes: ['id', 'username', 'email', 'role']
    });
    },
    async addUser(user) { 
      const created = await User.create({username: user.username, email: user.email,
              password: user.password, role: user.role,
              createdAt : moment().format("YYYY/MM/DD h:mm:ss"),
              updatedAt : moment().format("YYYY/MM/DD h:mm:ss"),
      });
      let data = {}
      if (created != null){
        data.id = created.id
        data.username =  created.username
        data.email = created.email
        data.role = created.role
      }
      return data
   },
   async updateUser(user) {
    const __user = await this.getUserByEmail(user.email)
    console.log(__user)
    if (__user == null) return "can't update user"
    try{
      const updated = await User.update(user, {
        where: {
          id: __user.id
        }
      });
      if (updated == 1) return user;
      else throw new Error()
    } catch(error){
      return "can't update this user"
    }

   },
   async deleteUser(id) { 
      return await User.destroy({
        where: {
          id:id
        },
        attributes:['id', 'username', 'email', 'role']
    }); },
  // D'autres méthodes jugées utiles
}
