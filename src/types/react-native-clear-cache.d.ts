declare module 'react-native-clear-cache' {
  const ClearCache: {
    getAppCacheSize: (vol: any) => void;
    clearAppCache: (vol: any) => void;
  };
  export default ClearCache;
}
