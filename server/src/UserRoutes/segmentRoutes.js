import passport from '../config/passport';
import segment from '../db/segment';
import * as resp from '../config/Responses';


export default (app) => {
  // get segment data
  app.get('/api/segment/:documentId', passport.ensureAuthenticated, (req, res, next) => {
    const documentId = req.params.documentId;
    segment.get(documentId, (err, result) => {
      if (err) { next(new Error('Could not find segment data')); return; }
      res.status(resp.good).send(result);
    });
  });

  // insert segment data
  app.post('/api/segment/:documentId', passport.ensureAuthenticated, (req, res, next) => {
    // body: { segmentIndex, mt, editTime, tileTime, voiceTime, totalTime, charactersEntered, wordsEntered, mode }
    const { segmentIndex, machineTranslation, editTime, tileTime, voiceTime, totalTime, charactersEntered, wordsEntered, mode } = req.body;
    const documentId = req.params.documentId;
    segment.insertSegmentData(segmentIndex, documentId, machineTranslation, editTime, tileTime, voiceTime, totalTime, charactersEntered, wordsEntered, mode, (err, result) => {
      if (err) { next(err); return; }
      res.status(resp.good).send(result);
    });
  });
};
