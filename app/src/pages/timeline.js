import React, { Component } from 'react'
import { Text, TouchableOpacity , AsyncStorage, View, StyleSheet } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
import api from '../services/api'
import Tweet from '../components/tweet'

class Timeline extends Component {
  static navigationOptions = {
    title: 'Twitter',
    headerTitleStyle: {
      color: '#4BB0EE',
      marginLeft: -5
    },
    headerLeft: (
      <Icon
        style={{ marginLeft: 15 }}
        name="twitter"
        size={ 34 }
        color="#4BB0EE"
      />
    ),
    headerRight: (
      <TouchableOpacity>
        <Icon 
          name="edit"
          size={ 30 }
          color="#4BB0EE"
          style={{ marginRight: 16 }}
        />
      </TouchableOpacity>
    )
  }

  state = {
    tweets: []
  }

  componentWillMount() {
    this.getTweets()
  }

  getTweets = async () => {
    const result = await api.get('tweets')
    this.setState({ tweets: result.data })
  }

  handleLogOut = async () => {
    await AsyncStorage.setItem('@GoTwitter:username', '')
    this.props.navigation.navigate('login')
  }

  render() {
    return (
      <View style={ styles.container}>
        <TouchableOpacity onPress={ this.handleLogOut }>
          <Text>Sair</Text>
        </TouchableOpacity>
        <View style={ styles.tweet }>
          {
            this.state.tweets.map((tweet, index) => (
              <Tweet
                key={ index }
                tweet={ tweet}
              />
            ))
          }
        </View>
      </View>
      
    )
  } 
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tweet: {
    alignSelf: 'stretch',
    paddingHorizontal: 15,
  }
})

export default Timeline