import {useEffect, useState} from 'react';
import {API_BASE_URL} from '../api/base';
import {storePosts} from '../db/posts';
import {FriendsFeedItem} from '../types/feedItem.type';
import useAuth from './useAuth';

export default function useFeed() {
  const [feed, setFeed] = useState<FriendsFeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const {accessToken, refreshAccessToken} = useAuth();

  useEffect(() => {
    const loadFeed = async (attemptNr: number) => {
      try {
        if (attemptNr >= 2) {
          throw new Error('cannot load feed');
        }
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/feeds/friends`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) {
          await refreshAccessToken();
          loadFeed(attemptNr + 1);
          return;
        }
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
      loadFeed(0);
    }
  }, [accessToken, refreshing]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    feed,
    loading,
    refreshing,
    setRefreshing,
  };
}
