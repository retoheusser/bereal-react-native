import React from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import useFeed from '../hooks/useFeed';
import FeedItem from './FeedItem';

const FeedView: React.FC = () => {
  const {feed, loading, refreshing, setRefreshing} = useFeed();
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={feed}
          renderItem={({item}) => <FeedItem post={item} />}
          keyExtractor={item => item.id}
          onRefresh={() => setRefreshing(true)}
          refreshing={refreshing}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default FeedView;
