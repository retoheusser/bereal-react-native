import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import {FriendsFeedItem} from '../types/feedItem.type';
import FeedItemHeader from './FeedItemHeader';

const FeedItem: React.FC<{
  post: FriendsFeedItem;
}> = ({post}) => {
  const [swapped, setSwapped] = useState(true);
  const {width} = useWindowDimensions();

  return (
    <View style={styles.container}>
      <FeedItemHeader post={post} />
      <ImageBackground
        source={{uri: swapped ? post.secondaryPhotoURL : post.photoURL}}
        style={[
          {
            width,
            height: Math.round(width * 1.333333333),
          },
          styles.imageBackground,
        ]}>
        <Pressable onPress={() => setSwapped(!swapped)}>
          <Image
            source={{uri: swapped ? post.photoURL : post.secondaryPhotoURL}}
            style={styles.image}
          />
        </Pressable>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 16,
  },
  imageBackground: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  image: {
    margin: 16,
    width: 75,
    height: 100,
    borderRadius: 8,
    borderColor: 'black',
    borderWidth: 2,
  },
  title: {
    color: 'white',
    padding: 8,
  },
});

export default FeedItem;
