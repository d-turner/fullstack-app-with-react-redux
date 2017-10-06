import { SYNC } from '../../constants/actionTypes';

export default function save(documentId) {
  return {
    documentId,
    type: SYNC,
  };
}
