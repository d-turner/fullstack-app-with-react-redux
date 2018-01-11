import passport from '../config/passport';
import doc from '../db/document';
import * as resp from '../config/Responses';


export default (app) => {
  // get meta data
  app.get('/api/documentMeta/:documentId', passport.ensureAuthenticated, (req, res, next) => {
    // body: { segmentCount, listOrder, completedSegments, wordCount }
    const documentId = req.params.documentId;
    doc.getMetaData(documentId, (err, result) => {
      if (err) { next(new Error('Could not find document meta data')); return; }
      res.status(resp.good).send(result);
    });
  });

  // insert meta data
  app.post('/api/documentMeta/:documentId', passport.ensureAuthenticated, (req, res, next) => {
    // body: { segmentCount, listOrder, completedSegments, totalWords }
    const { segmentCount, listOrder, completedSegments, totalWords } = req.body;
    const documentId = req.params.documentId;
    doc.insertMetaData(documentId, segmentCount, listOrder, completedSegments, totalWords, (err, result) => {
      if (err) { next(new Error('Meta data exists for document')); return; }
      res.status(resp.good).send(result);
    });
  });

  // update meta data
  app.put('/api/documentMeta/:documentId', passport.ensureAuthenticated, (req, res, next) => {
    // body: { segmentCount, listOrder, completedSegments, totalWords }
    const { segmentCount, listOrder, completedSegments, totalWords } = req.body;
    const documentId = req.params.documentId;
    doc.updateMetaData(documentId, segmentCount, listOrder, completedSegments, totalWords, (err, result) => {
      if (err) { next(new Error('Could not update document meta data')); return; }
      res.status(resp.good).send(result);
    });
  });
};
