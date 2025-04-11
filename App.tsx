import { StatusBar, SafeAreaView, Text } from 'react-native';
import AppNavigator from './src/Navigation Context and interfaces/AppNavigator';
import { ContextProvider } from './src/Navigation Context and interfaces/Context';
export default function App() {
  return (
    <SafeAreaView style={{flex:1, marginTop: StatusBar.currentHeight}}>
      <ContextProvider>
      <AppNavigator/>
      </ContextProvider>
    </SafeAreaView>
  );
};
