import React from 'react';
import {Linking, Pressable, StyleSheet, Text, View} from 'react-native';
import {FriendsFeedItem} from '../types/feedItem.type';

const FeedItemHeader: React.FC<{
  post: FriendsFeedItem;
}> = ({post}) => {
  async function openLocation() {
    const geoLink = `geo:0,0?q=${post.location._latitude},${post.location._longitude}`;
    const canOpenUrl = await Linking.canOpenURL(geoLink);
    if (canOpenUrl) {
      Linking.openURL(geoLink);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.username}>{post.userName}</Text>
      <View style={styles.metaInfo}>
        <Text style={styles.metaInfo}>
          {post.lateInSeconds ? 'Late' : 'On Time'}
        </Text>
        <Text style={styles.metaInfo}>
          {new Date(post.takenAt._seconds * 1000).toLocaleTimeString()}
        </Text>
        <Text style={styles.metaInfo}>Attempts: {post.retakeCounter + 1}</Text>
        {post.location ? (
          <Pressable onPress={openLocation}>
            <Text style={styles.locationLink}>Location</Text>
          </Pressable>
        ) : (
          ''
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  username: {
    color: 'white',
    fontWeight: 'bold',
  },
  metaInfo: {
    flexDirection: 'row',
    color: '#9E9E9E',
    marginRight: 8,
  },
  locationLink: {
    color: '#9E9E9E',
    textDecorationLine: 'underline',
  },
});

export default FeedItemHeader;
