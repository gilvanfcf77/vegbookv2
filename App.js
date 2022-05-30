import {
  StyleSheet,
  SafeAreaView,
  Platform
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors } from './src/modal/color';
import Route from './src/navigation/Router';
import 'react-native-gesture-handler';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './src/aws-exports';
Amplify.configure(awsconfig);

export default function App() {
  return (
    <SafeAreaView style={styles.safeAreaViewForAndroid}>
      <StatusBar style="auto" backgroundColor={colors.primary} />
      <Route />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaViewForAndroid: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    backgroundColor: colors.background
  }
});