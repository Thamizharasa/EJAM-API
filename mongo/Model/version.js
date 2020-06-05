var mongoose =  require('mongoose');
  //  modelName = 'deploymentmodel',
	schemaDefinition = require('../schema/version'),
schemaInstance = mongoose.Schema(schemaDefinition),
modelInstance = mongoose.model('version', schemaInstance);
module.exports = modelInstance;
