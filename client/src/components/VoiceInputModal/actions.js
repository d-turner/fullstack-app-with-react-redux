import { VOICE_INPUT } from '../../constants/actionTypes';

export function updateFromVoice(documentId, segmentId, text) {
  return {
    type: VOICE_INPUT,
    documentId,
    segmentId,
    text,
  };
}
