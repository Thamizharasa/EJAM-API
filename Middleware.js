var DeploymentModel = require('./mongo/Model/deploymentmodel');
var version = require('./mongo/Model/version');
         


var GetDeployments = async function()
{
    try
    {
        
        //var data = await DeploymentModel.find();
        return await DeploymentModel.find();
        //return data;
    }
    catch(err)
    {
        return err;
    }
}

var GetTemplateName = async function()
{
    try
    {
      return  await version.find({},{_id:0});
    }
    catch(err)
    {
        return err;
    }
}



var deleteDeployments = async function(req)
{
    try
    {
        return await DeploymentModel.deleteOne({_id:req.body.id})
    }
    catch(err)
    {
        return err;
    } 
}

var AddDeployments = async function(req)

{
   
	var deploymentModel = new DeploymentModel({
     	url: req.body.url,
		templateName : req.body.templateName,
        version :req.body.version,
        deployedAt : req.body.deployedAt    
    });
    
  try
  {
        return {_id} = await deploymentModel.save();
  }
  catch(err)
  {
       return err;
  }

 }

module.exports={
    GetDeployments :GetDeployments,
    AddDeployments :AddDeployments,
    deleteDeployments:deleteDeployments,
    GetTemplateName:GetTemplateName
}