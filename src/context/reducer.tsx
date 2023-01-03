export default (store: object, payload: [string, any]) => {
  const [mutationType, newData] = payload;
  switch (mutationType) {
    case 'SET_CONFIG':
      return { ...newData };
    case 'SET_THEME':
      return { ...store, theme: newData };
    case 'PUT_CONFIG':
      return { ...store, ...newData };
    default:
      throw new Error('The mutationType is not supported.');
  }
};
