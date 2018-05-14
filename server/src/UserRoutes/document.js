import multer from 'multer';
import fs from 'fs';

import passport from '../config/passport';
import doc from '../db/document';
import * as resp from '../config/Responses';

const dest = '/home/adapt/Documents/git/kanjingo-react-redux/client/src/data/';
const logDest = `${dest}logs/`;
const uploads = multer({ dest });

export default (app) => {
  // upload a document
  app.post('/api/uploadDocument', passport.ensureAuthenticated, uploads.single('document'), (req, res, next) => {
    // body: { description, file }
    // req.user.user_id => use this to make sure the user is authenticated first
    const data = req.body;
    const file = req.file;
    const user = req.user;
    if (!file) {
      // Unprocessable Entity
      res.status(resp.unprocessable).json(resp.badParameters);
    }
    doc.create(file.originalname, data.description, file.filename, file.path, user.user_id, (err, result) => {
      if (err) { next(err); return; }
      doc.findOneDocument(result.info.insertId, (error, row) => {
        if (error) { next(error); return; }
        res.status(resp.good).json({ status: 'Insert successful', result: row });
      });
    });
  });

  // get a single document from the database
  app.get('/api/documents/:documentId', passport.ensureAuthenticated, (req, res, next) => {
    const user = req.user;
    const documentId = req.params.documentId;
    doc.findDocumentBySavedName(documentId, (err, result) => {
      if (err) { next(err); return; }
      if (!result[0] || user.user_id !== result[0].user_id) {
        res.status(resp.forbidden).json({ status: 'Not Authorized' });
      }
      res.status(resp.good).send(result[0]);
    });
  });

  // return a single document file
  app.get('/api/document/:documentId', passport.ensureAuthenticated, (req, res, next) => {
    const documentId = req.params.documentId;
    res.sendFile(dest + documentId, (err) => {
      if (err) { next(err); return; }
      next();
    });
  });

  // get a user's list of documents
  app.get('/api/documents', passport.ensureAuthenticated, (req, res, next) => {
    const user = req.user;
    doc.findByUser(user.user_id, (err, result) => {
      if (err) { next(err); return; }
      res.status(resp.good).send(result);
    });
  });

  // update a single document
  app.post('/api/syncDocument/:documentId', passport.ensureAuthenticated, (req, res, next) => {
    const user = req.user;
    const documentId = req.params.documentId;
    doc.findDocumentBySavedName(documentId, (err, result) => {
      if (err) { next(err); return; }
      if (!result[0] || !user || user.user_id !== result[0].user_id) {
        res.status(resp.forbidden).json({ status: 'Not Authorized' });
      }
      const location = result[0].location;
      let data = '';
      req.on('data', (chunk) => {
        data += chunk.toString('utf8');
      });
      req.on('end', () => {
        fs.writeFile(location, data, (fail) => {
          if (fail) { next(fail); return; }
          res.status(resp.good).send('Saved');
        });
      });
    });
  });

  // delete a single document
  app.delete('/api/documents/:documentId', passport.ensureAuthenticated, (req, res, next) => {
    const documentId = req.params.documentId;
    doc.delete(documentId, (err, result) => {
      if (err) { next(err); return; }
      res.status(resp.good).send('Success');
    });
  });

  // upload a log
  app.post('/api/uploadLog/:documentId', passport.ensureAuthenticated, (req, res, next) => {
    const user = req.user;
    const documentId = req.params.documentId;
    let data = '';
    req.on('data', (chunk) => {
      data += chunk.toString('utf8');
    });
    req.on('end', () => {
      const location = logDest + documentId;
      doc.insertLog(documentId, location, user.user_id, (err, result) => {
        // TODO: fix when value already in table
        if (err) { next(err); return; }
        fs.writeFile(location, data, (fail) => {
          if (fail) { next(fail); return; }
          res.status(resp.good).send('Saved');
        });
      });
    });
  });

  // return a single log document file
  app.get('/api/log/:documentId', passport.ensureAuthenticated, (req, res, next) => {
    const documentId = req.params.documentId;
    res.sendFile(logDest + documentId, (err) => {
      if (err) { next(err); return; }
      next();
    });
  });
};
