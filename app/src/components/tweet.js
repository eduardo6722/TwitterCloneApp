import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Tweet = ({ tweet }) => {
  return (
    <View style={ styles.tweet }>
      <Text>{ tweet.content }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  tweet: {
    flexDirection: 'column',
    height: 70,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    marginTop: 5,
  }
})

export default Tweet