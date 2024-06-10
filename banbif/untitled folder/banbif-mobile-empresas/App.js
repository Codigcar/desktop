import * as React from 'react'
import { NativeBaseProvider } from 'native-base'
import Routes from './src/route/Routes'



const App = () => {
  return (
    <NativeBaseProvider>
      <Routes />
    </NativeBaseProvider>
  );
};

export default App