/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import TokenInput from './src/components/TokenInput';
import FeedView from './src/components/FeedView';
import useAuth from './src/hooks/useAuth';

const App = () => {
  const backgroundStyle = {
    backgroundColor: 'black',
    flex: 1,
  };
  const {accessToken, loading, refreshAccessToken} = useAuth();

  const setToken = async (token: string) => {
    await AsyncStorage.setItem('refresh_token', token);
    refreshAccessToken();
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <View style={backgroundStyle}>
        <Text style={styles.titleSection}>BeFake.</Text>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : accessToken ? (
          <FeedView />
        ) : (
          <TokenInput onTokenStore={setToken} />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleSection: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
  },
});

export default App;
