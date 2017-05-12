// update translation
export function updateSegment(id, target) {
  return {
    type: 'UPDATE_TARGET',
    segment: {
      id,
      target,
    },
  };
}
