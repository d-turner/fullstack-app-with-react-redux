import multer from 'multer';

import passport from '../config/passport';
import logger from '../util/logger';
import doc from '../db/document';
import * as resp from '../config/Responses';

const dest = '/home/adapt/Documents/git/kanjingo-react-redux/client/src/data/';
const uploads = multer({ dest });

export default (app) => {
  // upload a document
  app.post('/api/uploadDocument', uploads.single('document'), (req, res) => {
    // body: { description, file }
    // req.user.user_id => use this to make sure the user is authenticated first
    const data = req.body;
    const file = req.file;
    const user = req.user;
    if (!file) {
      // Unprocessable Entity
      res.status(resp.unprocessable).json(resp.badParameters);
    }
    passport.ensureAuthenticated(req, res, (status, reply) => {
      if (status !== 200) {
        res.status(status).json(reply);
      }
      doc.create(file.originalname, data.description, `${dest}${file.filename}`, user.user_id, (err, result) => {
        if (err) logger.error(err);
        logger.info(result);
        res.status(status).json({ status: 'Insert successful' });
      });
    });
  });

  // get a single document
  app.get('/api/documents/:documentId ', (req, res) => {
    const user = req.user;
    const documentId = req.params.documentId;
    passport.ensureAuthenticated(req, res, (status, reply) => {
      if (status !== 200) {
        res.status(status).json(reply);
      }
      doc.findOneDocument(documentId, (err, result) => {
        if (err) logger.error(err);
        if (user.user_id !== result[0].user_id) {
          res.status(401).json({ status: 'Not Authorized' });
        }
        logger.info(result);
        res.status(status).send(result);
      });
    });
  });

  // get a user's list of documents
  app.get('/api/documents', (req, res) => {
    const user = req.user;
    passport.ensureAuthenticated(req, res, (status, reply) => {
      if (status !== 200) {
        res.status(status).json(reply);
      }
      doc.findByUser(user.user_id, (err, result) => {
        if (err) logger.error(err);
        logger.info(result);
        res.status(status).send(result);
      });
    });
  });
};
