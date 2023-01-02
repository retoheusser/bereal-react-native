import AsyncStorage from '@react-native-async-storage/async-storage';
import {FriendsFeedItem} from '../types/feedItem.type';

export async function storePosts(posts: FriendsFeedItem[]) {
  try {
    const keyValuePairs = posts.map(post => {
      return [`post_${post.id}_by_${post.ownerID}`, JSON.stringify(post)] as [
        string,
        string,
      ];
    });
    await AsyncStorage.multiSet(keyValuePairs);
  } catch (error) {
    console.error(error);
  }
}
