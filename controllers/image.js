const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '481776e6b5704eaf92e595f725a50c12'
});

const handleApiCall = (req, res) => {
  app.models.initModel({id: Clarifai.FACE_DETECT_MODEL})
    .then(model => {
      return model.predict(req.body.input);
    })
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with api'));
}



const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json('unable to get entries'));
}

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall
}