import { StatusBar } from 'expo-status-bar';
import {StyleSheet, TextInput, View, Text, Pressable} from 'react-native';
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {Component} from "react";

const primary = '#2b1339'
const secondary = '#de7cda'
const header = '#210a2f'
const placeholderText = '#a49bab'
const icons = '#7d6e86'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tags: ['Cashew','Fortnite','React Native'],
      header: {
        name: '',
      },
      running: {
        name: '',
      },
      item: '21',
      tracked: [
        {
          tag_id: 2,
          name: 'Cashew is best',
          seconds: 80000000,
        }
      ]
    }
  }

  startTimer = () => {
    this.setState({
      running: {
        ...this.state.header,
        start: new Date(),
      }
    })
    this.textInput.clear()
  }

  handleChange = (e) => {
    this.setState({
      header: {
        name : e
      }
    });
  }

  render() {
    return (
        <IconComponentProvider IconComponent={MaterialCommunityIcons}>
          <View style={styles.container}>
            <View style={styles.header}>
              <TextInput style={styles.textInput} ref={input => { this.textInput = input }} onChangeText={this.handleChange} placeholderTextColor={placeholderText} placeholder={'What are you working on?'}/>
              <Icon name="folder-open" size={32} color="grey" style={styles.folder}/>
              <Pressable style={styles.start} onPress={this.startTimer}>
                <Icon name="play" size={32} color="white"/>
              </Pressable>
            </View >

            <StatusBar backgroundColor={secondary}  />
          </View>
        </IconComponentProvider>
    );
  }
}

export default App

const styles = StyleSheet.create({
  container: {
    backgroundColor: primary,
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  text: {
    color: 'white'
  },
  textInput: {
    padding: 0,
    width: '65%',
    left: 0,
    height: '100%',
    color: 'black',
    fontSize: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center",
    height: 100,
    width: '100%',
    backgroundColor: 'white',
  },
  folder: {
    width: '10%',
  },
  start: {
    width: '14%',
    margin: 'auto',
    backgroundColor: secondary,
  }
});
