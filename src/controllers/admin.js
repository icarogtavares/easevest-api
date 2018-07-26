const DocumentController = require('./document')
const { adminService }  = require('../services/admin')

class AdminController extends DocumentController {

}

const adminController = new AdminController(adminService)

module.exports = {
  AdminController,
  adminController,
}
