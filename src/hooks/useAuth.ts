import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import jwt_decode, {JwtPayload} from 'jwt-decode';

interface GoogleApiRefreshTokenResponse {
  access_token: string;
  expires_in: string;
  token_type: string;
  refresh_token: string;
  id_token: string;
  user_id: string;
  project_id: string;
}

const BEREAL_GOOGLE_API_KEY = 'AIzaSyDwjfEeparokD7sXPVQli9NsTuhT6fJ6iA';

export default function useAuth() {
  const [accessToken, setAccessToken] = useState('');
  const [loading, setLoading] = useState(true);

  async function refreshAccessToken() {
    try {
      const refreshToken = await AsyncStorage.getItem('refresh_token');

      if (!refreshToken) {
        return;
      }

      const response = await fetch(
        `https://securetoken.googleapis.com/v1/token?key=${BEREAL_GOOGLE_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            refresh_token: refreshToken,
            grant_type: 'refresh_token',
          }),
        },
      );
      const {access_token}: GoogleApiRefreshTokenResponse =
        await response.json();
      await AsyncStorage.setItem('access_token', access_token);
      setAccessToken(access_token);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function isTokenValid(token: string) {
    const decoded: JwtPayload = jwt_decode(token);
    const hasExpired = new Date().valueOf() >= decoded.exp! * 1000;
    return !hasExpired;
  }

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        if (!token) {
          throw new Error('no access token stored');
        }
        if (!isTokenValid(token)) {
          throw new Error('access token expired');
        }
        await AsyncStorage.setItem('access_token', token);
        setAccessToken(token);
        setLoading(false);
      } catch (error) {
        refreshAccessToken();
      }
    };
    getAccessToken();
  }, []);

  return {accessToken, loading, refreshAccessToken};
}
