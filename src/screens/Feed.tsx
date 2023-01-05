import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import FeedView from '../components/FeedView';
import TokenInput from '../components/TokenInput';
import useAuth from '../hooks/useAuth';

const Feed: React.FC = () => {
  const {accessToken, loading, refreshAccessToken} = useAuth();

  const setToken = async (token: string) => {
    await AsyncStorage.setItem('refresh_token', token);
    refreshAccessToken();
  };

  return (
    <View style={styles.background}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : accessToken ? (
        <FeedView />
      ) : (
        <TokenInput onTokenStore={setToken} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'black',
    flex: 1,
  },
});

export default Feed;
