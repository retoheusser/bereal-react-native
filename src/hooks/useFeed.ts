import {useEffect, useState} from 'react';
import {API_BASE_URL} from '../api/base';
import {storePosts} from '../db/posts';
import {FriendsFeedItem} from '../types/feedItem.type';
import useAuth from './useAuth';

export default function useFeed() {
  const [feed, setFeed] = useState<FriendsFeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [accessToken] = useAuth();

  useEffect(() => {
    const loadFeed = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/feeds/friends`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const result: FriendsFeedItem[] = await response.json();
        storePosts(result);
        setFeed(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    };

    if (accessToken) {
      loadFeed();
    }
  }, [accessToken, refreshing]);

  return {
    feed,
    loading,
    refreshing,
    setRefreshing,
  };
}
