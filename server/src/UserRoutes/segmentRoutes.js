import passport from '../config/passport';
import segment from '../db/segment';
import * as resp from '../config/Responses';
import tokenizeString from '../util/runTokenizer';

export default (app) => {
  // get segment data
  app.get('/api/segment/:documentId/:segmentIndex', passport.ensureAuthenticated, (req, res, next) => {
    const documentId = req.params.documentId;
    const segmentIndex = req.params.segmentIndex;
    segment.getSingle(documentId, segmentIndex, (err, result) => {
      if (err) { next(new Error('Could not find segment data')); return; }
      res.status(resp.good).send(result);
    });
  });

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
    const {
      segment_index: segmentIndex,
      machine_translation: machineTranslation,
      edit_mode_time: editTime,
      tile_mode_time: tileTime,
      voice_mode_time: voiceTime,
      total_edit_time: totalTime,
      characters_entered: charactersEntered,
      words_entered: wordsEntered,
      mode } = req.body;
    const documentId = req.params.documentId;
    segment.create(segmentIndex, documentId, machineTranslation, editTime, tileTime, voiceTime, totalTime, charactersEntered, wordsEntered, mode, (err, result) => {
      if (err) { next(err); return; }
      res.status(resp.good).send(result);
    });
  });

  // update segment data
  app.put('/api/segment/:documentId', passport.ensureAuthenticated, (req, res, next) => {
    // body: { segmentIndex, mt, editTime, tileTime, voiceTime, totalTime, charactersEntered, wordsEntered, mode }
    const {
      segment_index: segmentIndex,
      machine_translation: machineTranslation,
      edit_mode_time: editModeTime,
      tile_mode_time: tileModeTime,
      voice_mode_time: voiceModeTime,
      total_edit_time: totalEditTime,
      characters_entered: charactersEntered,
      words_entered: wordsEntered,
      mode } = req.body;
    const documentId = req.params.documentId;
    console.log(segmentIndex, documentId, machineTranslation, editModeTime, tileModeTime, voiceModeTime, totalEditTime, charactersEntered, wordsEntered, mode);
    segment.updateSegment(segmentIndex, documentId, machineTranslation, editModeTime, tileModeTime, voiceModeTime, totalEditTime, charactersEntered, wordsEntered, mode, (err, result) => {
      if (err) { next(err); return; }
      res.status(resp.good).send(result);
    });
  });

  // turn string into a array of tokens
  app.post('/api/tokenizer', passport.ensureAuthenticated, (req, res) => {
    // body: { data: 'some string' }
    const { data } = req.body;
    tokenizeString(data, (tokens) => {
      res.status(resp.good).json({ tokens });
    });
  });
};
