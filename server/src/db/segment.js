import mariaDB from './index';
/* eslint max-len: 0, no-multi-str: 0, prefer-template: 0 */

const SegmentWrapper = {
  create(segmentIndex, documentId, machineTranslation, editTime, tileTime, voiceTime, totalTime, charactersEntered, wordsEntered, mode, cb) {
    return mariaDB.query('INSERT INTO Segment (segment_index, document_id, machine_translation, edit_mode_time, tile_mode_time, voice_mode_time, total_edit_time, characters_entered, words_entered, mode) VALUES \
    (:segmentIndex, :documentId, :machineTranslation, :editTime, :tileTime, :voiceTime, :totalTime, :charactersEntered, :wordsEntered, :mode)',
    { segmentIndex, documentId, machineTranslation, editTime, tileTime, voiceTime, totalTime, charactersEntered, wordsEntered, mode }, cb);
  },

  get(documentId, cb) {
    return mariaDB.query('SELECT * FROM Segment WHERE document_id = :documentId',
  { documentId }, cb);
  },

  getSingle(documentId, segmentIndex, cb) {
    return mariaDB.query('SELECT * FROM Segment WHERE document_id = :documentId AND segment_index = :segmentIndex',
  { documentId, segmentIndex }, cb);
  },

  updateSegment(segmentIndex, documentId, machineTranslation, editTime, tileTime, voiceTime, totalTime, charactersEntered, wordsEntered, mode, cb) {
    return mariaDB.query('UPDATE Segment SET machine_translation = :machineTranslation, edit_mode_time = :editTime, tile_mode_time = :tileTime, voice_mode_time = :voiceTime, total_edit_time = :totalTime, characters_entered = :charactersEntered, words_entered = :wordsEntered, mode = :mode WHERE document_id = :documentId AND segment_index = :segmentIndex',
    { segmentIndex, documentId, machineTranslation, editTime, tileTime, voiceTime, totalTime, charactersEntered, wordsEntered, mode }, cb);
  },

  delete(documentId, cb) {
    return mariaDB.query('DELETE FROM Segment WHERE document_id = :documentId',
    { documentId }, cb);
  },
};

export default SegmentWrapper;
