const UserService = require('./user')

class AdminService extends UserService {
  constructor () {
    super('admin')
    this.isAdmin = true
  }
}

const adminService = new AdminService()

module.exports = {
  adminService,
  AdminService,
}
