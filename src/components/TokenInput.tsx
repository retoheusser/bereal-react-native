import React, {useState} from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';

const TokenInput: React.FC<{
  onTokenStore: (token: string) => void;
}> = ({onTokenStore}) => {
  const [refreshToken, setRefreshToken] = useState('');

  return (
    <View style={{padding: 16}}>
      <TextInput
        style={styles.textInput}
        placeholder="Refresh Token"
        onChangeText={value => setRefreshToken(value)}
        value={refreshToken}
      />
      <Button onPress={() => onTokenStore(refreshToken)} title="Save" />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'white',
  },
});

export default TokenInput;
