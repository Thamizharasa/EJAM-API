var mongoose =  require('mongoose');
  //  modelName = 'deploymentmodel',
	schemaDefinition = require('../schema/deploymentschema'),
schemaInstance = mongoose.Schema(schemaDefinition),
modelInstance = mongoose.model('deploymentmodel', schemaInstance);
module.exports = modelInstance;

