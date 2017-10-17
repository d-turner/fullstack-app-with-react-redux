import { SYNC } from '../../constants/actionTypes';

export default function save(documentId, userId, email) {
  return {
    documentId,
    userId,
    email,
    type: SYNC,
  };
}
