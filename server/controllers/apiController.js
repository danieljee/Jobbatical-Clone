var crud = require('../crud');

module.exports = {
  getResources: function(req, res){
    var resource = req.params.resource;
    var db = crud[resource];
    if (!db){
      res.json({
        confirmation:'fail',
        message: 'Invalid resource type'
      });
      return;
    }
    db.find({})
      .then((result)=>{
        res.json({
          confirmation: 'success',
          result: result
        });
      })
      .catch((err)=>{
        res.json({
					confirmation: 'fail',
					message: err
				});
				return;
      });
  },

  getResource: function(req, res){
    var resource = req.params.resource;
    var id = req.params.id;
    var db = crud[resource];
    if (!db){
      res.json({
        confirmation:'fail',
        message: 'Invalid resource type'
      });
      return;
    }
    db.findById(id)
      .then((result) => {
        res.json({
          confirmation:'success',
          result: result
        });
      })
      .catch((err)=>{
        res.json({
          confirmation:'fail',
          message: err
        });
      });
  },

  postResource: function(req, res){
    var resource = req.params.resource;
    var db = crud[resource];
    if (!db){
      res.json({
        confirmation:'fail',
        message: 'Invalid resource type'
      });
      return;
    }
    db.create(req.body)
      .then((result) => {
        res.json({
          confirmation:'success',
          result: result
        });
      })
      .catch((err)=>{
        res.json({
          confirmation:'fail',
          message: err
        });
      });
  }
};
