import multer from 'multer';
import fs from 'fs';

import passport from '../config/passport';
import logger from '../util/logger';
import doc from '../db/document';
import * as resp from '../config/Responses';

const dest = '/home/dturner/git/kanjingo-react-redux/client/src/data/';
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
      doc.create(file.originalname, data.description, file.filename, file.path, user.user_id, (err, result) => {
        if (err) logger.error(err);
        doc.findOneDocument(result.info.insertId, (erro, row) => {
          if (erro) logger.error(erro);
          row[0].location = undefined;
          row[0].user_id = undefined;
          res.status(status).json({ status: 'Insert successful', result: row });
        });
      });
    });
  });

  // get a single document from the database
  app.get('/api/documents/:documentId', (req, res) => {
    const user = req.user;
    const documentId = req.params.documentId;
    passport.ensureAuthenticated(req, res, (status, reply) => {
      if (status !== 200) {
        res.status(status).json(reply);
      }
      doc.findDocumentBySavedName(documentId, (err, result) => {
        if (err) logger.error(err);
        if (!result[0] || user.user_id !== result[0].user_id) {
          res.status(401).json({ status: 'Not Authorized' });
        }
        res.status(status).send(result[0]);
      });
    });
  });

  // return a single document file
  app.get('/api/document/:documentId', (req, res) => {
    const documentId = req.params.documentId;
    passport.ensureAuthenticated(req, res, (status, reply) => {
      if (status !== 200) {
        res.status(status).json(reply);
      }
      res.sendFile(dest + documentId, (err) => {
        if (err) console.log(err);
        else console.log('Sent file');
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
        res.status(status).send(result);
      });
    });
  });

  // update a single document
  app.post('/api/syncDocument/:documentId', (req, res) => {
    const user = req.user;
    const documentId = req.params.documentId;
    passport.ensureAuthenticated(req, res, (status, reply) => {
      if (status !== 200) {
        return res.status(status).json(reply);
      }
      return doc.findDocumentBySavedName(documentId, (err, result) => {
        if (err) logger.error(err);
        if (!result[0] || !user || user.user_id !== result[0].user_id) {
          return res.status(401).json({ status: 'Not Authorized' });
        }
        const location = result[0].location;
        let data = '';
        req.on('data', (chunk) => {
          data += chunk.toString('utf8');
        });
        return req.on('end', () => {
          fs.writeFile(location, data, (fail) => {
            if (fail) {
              return res.status(501).send('Failed');
            }
            return res.status(status).send('Saved');
          });
        });
      });
    });
  });

  // delete a single document
  app.delete('/api/documents/:documentId', (req, res) => {
    const documentId = req.params.documentId;
    passport.ensureAuthenticated(req, res, (status, reply) => {
      if (status !== 200) {
        return res.status(status).json(reply);
      }
      // need to delete from Document, Document_META and Segment Table
      return doc.delete(documentId, (err, result) => {
        if (err) {
          logger.error(err);
          return res.status(resp.error).send('Fail');
        }
        return res.status(resp.good).send('Success');
      });
    });
  });

  // upload a log
  app.post('/api/uploadLog/:documentId', (req, res) => {
    const user = req.user;
    const documentId = req.params.documentId;
    passport.ensureAuthenticated(req, res, (status, reply) => {
      if (status !== 200 || !user) {
        return res.status(status).json(reply);
      }
      let data = '';
      req.on('data', (chunk) => {
        data += chunk.toString('utf8');
      });
      return req.on('end', () => {
        const location = `${dest}logs/${documentId}`;
        doc.insertLog(documentId, location, user.user_id, (err, result) => {
          // TODO: fix when value already in table
          logger.log(result);
          if (err) logger.error(err);
          fs.writeFile(location, data, (fail) => {
            if (fail) {
              logger.error(fail);
              return res.status(401).send('Failed');
            }
            return res.status(status).send('Saved');
          });
        });
      });
    });
  });
};
