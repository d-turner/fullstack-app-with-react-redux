import passport from '../config/passport';
import logger from '../util/logger';
import doc from '../db/document';
import * as resp from '../config/Responses';


export default (app) => {
  // get meta data
  app.get('/api/documentMeta/:documentId', (req, res) => {
    // body: { segmentCount, listOrder, completedSegments, wordCount }
    const documentId = req.params.documentId;
    passport.ensureAuthenticated(req, res, (status, reply) => {
      if (status !== 200) {
        res.status(status).json(reply);
      }
      doc.getMetaData(documentId, (err, result) => {
        if (err) {
          logger.error(err);
          res.status(status).json({ error: 'Could not find document meta data', err });
        } else res.status(status).send(result);
      });
    });
  });

  // insert meta data
  app.post('/api/documentMeta/:documentId', (req, res) => {
    // body: { segmentCount, listOrder, completedSegments, totalWords }
    const { segmentCount, listOrder, completedSegments, totalWords } = req.body;
    const documentId = req.params.documentId;
    passport.ensureAuthenticated(req, res, (status, reply) => {
      if (status !== 200) {
        res.status(status).json(reply);
      }
      doc.insertMetaData(documentId, segmentCount, listOrder, completedSegments, totalWords, (err, result) => {
        if (err) {
          logger.error(err);
          res.status(resp.conflict).json({ error: 'Meta data exists for document', err });
        } else res.status(status).send(result);
      });
    });
  });

  // update meta data
  app.put('/api/documentMeta/:documentId', (req, res) => {
    // body: { segmentCount, listOrder, completedSegments, totalWords }
    const { segmentCount, listOrder, completedSegments, totalWords } = req.body;
    const documentId = req.params.documentId;
    passport.ensureAuthenticated(req, res, (status, reply) => {
      if (status !== 200) {
        res.status(status).json(reply);
      }
      doc.updateMetaData(documentId, segmentCount, listOrder, completedSegments, totalWords, (err, result) => {
        if (err) {
          logger.error(err);
          res.status(resp.conflict).json({ error: 'Could not update document meta data', err });
        } else res.status(status).send(result);
      });
    });
  });

  // get segment data
  app.get('/api/segment/:documentId', (req, res) => {
    const documentId = req.params.documentId;
    passport.ensureAuthenticated(req, res, (status, reply) => {
      if (status !== 200) {
        res.status(status).json(reply);
      }
      doc.getSegmentData(documentId, (err, result) => {
        if (err) {
          logger.error(err);
          res.status(status).json({ error: 'Could not find segment data', err });
        } else res.status(status).send(result);
      });
    });
  });

  // insert segment data
  app.post('/api/segment/:documentId', (req, res) => {
    // body: { segmentIndex, mt, editTime, tileTime, voiceTime, totalTime, charactersEntered, wordsEntered, mode }
    const { segmentIndex, machineTranslation, editTime, tileTime, voiceTime, totalTime, charactersEntered, wordsEntered, mode } = req.body;
    const documentId = req.params.documentId; 
    passport.ensureAuthenticated(req, res, (status, reply) => {
      if (status !== 200) {
        res.status(status).json(reply);
      }
      doc.insertSegmentData(segmentIndex, documentId, machineTranslation, editTime, tileTime, voiceTime, totalTime, charactersEntered, wordsEntered, mode, (err, result) => {
        if (err) {
          logger.error(err);
          res.status(status).json({ error: 'Something went wrong', err });
        } else res.status(status).send(result);
      });
    });
  });
};
