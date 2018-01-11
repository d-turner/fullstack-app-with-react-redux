import mariaDB from './index';
/* eslint max-len: 0, no-multi-str: 0, prefer-template: 0 */

const SELECT_DOCUMENT_AND_META = 'SELECT Documents.*, Document_META.segment_count, Document_META.list_order, Document_META.completed_segments, Document_META.total_word_count FROM Documents LEFT JOIN Document_META ON Documents.document_id = Document_META.document_id';

const DocumentWrapper = {
  findByUser(userId, cb) {
    return mariaDB.query(SELECT_DOCUMENT_AND_META + ' WHERE user_id = :userId',
    { userId },
    cb);
  },

  findOneDocument(id, cb) {
    return mariaDB.query(SELECT_DOCUMENT_AND_META + ' WHERE Documents.document_id = :id',
    { id },
    cb);
  },

  findDocumentBySavedName(id, cb) {
    return mariaDB.query(SELECT_DOCUMENT_AND_META + ' WHERE saved_name = :id',
    { id },
    cb);
  },

  create(name, description, filename, location, userId, cb) {
    return mariaDB.query('INSERT INTO Documents (name, description, saved_name, location, user_id) VALUES \
    (:name, :description, :filename, :location, :userId)',
    { name, description, filename, location, userId }, cb);
  },

  delete(documentId, cb) {
    return mariaDB.query('DELETE FROM Segment WHERE document_id = :documentId; DELETE FROM Document_META WHERE document_id = :documentId; DELETE FROM Documents WHERE document_id = :documentId',
    { documentId }, cb);
  },

  insertLog(documentId, location, userId, cb) {
    return mariaDB.query('INSERT IGNORE INTO Logs (document_id, location, user_id) VALUES (:documentId, :location, :userId)',
    { documentId, location, userId }, cb);
  },

  insertMetaData(documentId, segmentCount, listOrder, completedSegments, wordCount, cb) {
    return mariaDB.query('INSERT INTO Document_META (document_id, segment_count, list_order, completed_segments, total_word_count) VALUES \
    (:documentId, :segmentCount, :listOrder, :completedSegments,  :wordCount)',
    { documentId, segmentCount, listOrder, completedSegments, wordCount }, cb);
  },

  updateMetaData(documentId, segmentCount, listOrder, completedSegments, wordCount, cb) {
    return mariaDB.query('UPDATE Document_META SET segment_count = :segmentCount, list_order = :listOrder, completed_segments = :completedSegments, total_word_count = :wordCount WHERE document_id = :documentId',
    { documentId, segmentCount, listOrder, completedSegments, wordCount }, cb);
  },

  getMetaData(documentId, cb) {
    return mariaDB.query('SELECT * FROM Document_META WHERE document_id = :documentId',
  { documentId }, cb);
  },

  // should not really use this method
  setData(documentId, table, column, value, cb) {
    return mariaDB.query(`UPDATE ${table} SET ${column} = :value WHERE document_id = :documentId`,
  { documentId, value }, cb);
  },
};

export default DocumentWrapper;

// 'SELECT Documents.*, \
// Document_META.segment_count, Document_META.list_order, Document_META.completed_segments, Document_META.total_word_count, \
// Segment.segment_index, Segment.machine_translation, Segment.edit_mode_time, Segment.tile_mode_time, Segment.voice_mode_time, Segment.total_edit_time, \
// Segment.characters_entered, Segment.words_entered, Segment.mode \
// FROM Documents \
// LEFT JOIN Document_META \
// ON Documents.document_id = Document_META.document_id \
// LEFT JOIN Segment \
// ON Documents.document_id = Segment.document_id';