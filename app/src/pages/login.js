import React, {Component} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'

class Login extends Component {
  static navigationOptions = {
    header: null,
  }

  state = { username: '', error: '' }

  async componentDidMount() {
    const username = await AsyncStorage.getItem('@GoTwitter:username')
    if(!username)
      return
    this.props.navigation.navigate('Timeline')
  }

  handleLoginPress = async () => {
    if(!this.state.username.length) {
      this.setState({ error: 'Preencha o nome de usuário!'})
      return 
    }
    await AsyncStorage.setItem('@GoTwitter:username', this.state.username)
    this.props.navigation.navigate('Timeline')
  }

  handleChange = (username) => {
    this.setState({ username: username, error: '' })
  }

  render() {
    return (
      <View style={ styles.container }>
      <Icon name="twitter" size={ 74 } color="#4AA6F0" />
        <View style={ styles.content }>
          <TextInput
            style={ styles.inputText } 
            placeholder="Nome de Usuário"
            value={ this.state.username }
            onChangeText={ this.handleChange }
          />
          <TouchableOpacity style={ styles.button } onPress={ this.handleLoginPress }>
            <Text style={ styles.buttonText }>Entrar</Text>
          </TouchableOpacity>
        </View>
        { 
          this.state.error.length ? <Text style={ styles.error }>{ this.state.error }</Text> : <Text></Text>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
    width: '90%'
  },
  inputText: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
    height: 44,
    alignSelf: 'stretch',
    paddingHorizontal: 15,
    fontSize: 16
  },
  button: {
    height: 44,
    alignSelf: "stretch",
    marginTop: 10,
    backgroundColor: "#4BB0EE",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginTop: 30,
  }
});

export default Login