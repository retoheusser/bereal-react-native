import AsyncStorage from '@react-native-async-storage/async-storage';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, ScrollView, FlatList, View} from 'react-native';
import FeedItem from '../components/FeedItem';
import {FriendsFeedItem, User} from '../types/feedItem.type';

const UserDetail: React.FC = () => {
  const route = useRoute<RouteProp<{params: {user: User}}>>();
  const navigation = useNavigation();
  const [userMedia, setUserMedia] = useState<FriendsFeedItem[]>([]);
  const user: User = route.params.user;
  navigation.setOptions({title: user.username});

  useEffect(() => {
    const getAllMedia = async () => {
      const allKeys = await AsyncStorage.getAllKeys();
      const allKeysFromUser = allKeys.filter(
        key => key.includes('post_') && key.includes(user.id),
      );
      const result = await AsyncStorage.multiGet(allKeysFromUser);
      const allMediaFromUser = result
        .map(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ([key, value]): FriendsFeedItem => JSON.parse(value!),
        )
        .sort((a, b) => (a.takenAt._seconds < b.takenAt._seconds ? 1 : -1));
      setUserMedia(allMediaFromUser);
    };
    getAllMedia();
  }, [user]);

  return (
    <View style={styles.container}>
      <FlatList
        data={userMedia}
        renderItem={({item}) => <FeedItem post={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  text: {
    color: 'white',
  },
});

export default UserDetail;
