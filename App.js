import {StatusBar} from 'expo-status-bar';
import {Platform, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {Icon, IconComponentProvider} from "@react-native-material/core";
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
      counter: null,
      handle: null,
      tags: ['Cashew','Fortnite','React Native'],
      dropdown: {
        open: false,

      },
      running: {
        name: '',
      },
      item: '21',
      tracked: [
        {
          tag_id: 0,
          name: 'Cashew is best',
          start: new Date(),
          end: new Date(2023, 2, 4),
        },
        {
          tag_id: 1,
          name: 'Fortnite Lets Play',
          start: new Date(),
          end: new Date(2023, 2, 4),
        },
        {
          tag_id: 2,
          name: 'Center Text in Header',
          start: new Date(),
          end: new Date(2023, 0, 3),
        },
        {
          tag_id: 2,
          name: 'Cashew is best',
          start: new Date(),
          end: new Date(2023, 2, 4),
        }
      ]
    }
  }

  startStopTimer = () => {
    if(!this.state.handle) {
      this.setState({
        running: {
          ...this.state.running,
          start: new Date(),
          tag_id: 1,
        }
      })

      const handle = setInterval(this.updateTimer, 200)

      this.setState({
        handle: handle
      })

      //stops the timer
    } else {
      this.setState({
        tracked: [...this.state.tracked,
          {
            ...this.state.running,
            end: new Date()
          }
        ]
      })
      clearInterval(this.state.handle)
      this.setState({
        running: {
          name : ''
        },
        handle: null,
      })
      this.textInput.clear()
    }

  }

  updateTimer = () => {
    this.setState({
      counter: this.getTimeDifference(this.state.running.start, Date.now())
    })
  }

  handleChange = (e) => {
    this.setState({
      running: {
        ...this.state.running,
        name : e
      }
    });
  }

  openSelect = () => {

  }



// Helper function to pad a number with leading zeros
  padZero = (number) => {
    return number.toString().padStart(2, '0');
  }

  getTimeDifference = (timestamp1, timestamp2) => {

    // Calculate the difference in milliseconds
    const diffInMilliseconds = Math.abs(timestamp2 - timestamp1);

    // Calculate the difference in seconds, minutes, and hours
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);

    // Calculate the remaining seconds and minutes after calculating the hours
    const remainingMinutes = diffInMinutes % 60;
    const remainingSeconds = diffInSeconds % 60;

    // Format the result as HH:mm:ss
    return `${this.padZero(diffInHours)}:${this.padZero(remainingMinutes)}:${this.padZero(remainingSeconds)}`;
  }

  render() {
    return (
        <IconComponentProvider IconComponent={MaterialCommunityIcons}>
          <View style={styles.container}>
            <View style={styles.header}>
              <TextInput style={styles.textInput} ref={input => { this.textInput = input }} onChangeText={this.handleChange} placeholderTextColor={placeholderText} placeholder={'What are you working on?'}/>
              {this.state.handle ? <Text>{this.state.counter}</Text> : ''}

              <Pressable style={styles.folder} onPress={this.openSelect}>
                <Icon name="folder-open" size={36} color="grey" />
              </Pressable>
              <Pressable style={styles.start} onPress={this.startStopTimer}>
                {this.state.handle ? <Icon name="pause" size={32} color="white"/> : <Icon name="play" size={32} color="white"/>}
              </Pressable>
            </View >
            <Text>
              {"\n"}{this.state.running.name}
            </Text>
            <View>
              {this.state.tracked.map((item, i) =>
                  <View style={styles.trackedItem} key={i}>
                    <Text style={styles.doneText}>
                      {item.name}
                    </Text>
                    <Text>
                      {this.getTimeDifference(item.start, item.end)}
                    </Text>
                    <Text style={styles.tags}>
                      {this.state.tags[item.tag_id]}
                    </Text>
                  </View>
              )}
            </View>


            <StatusBar backgroundColor={secondary}  />
            <Text style={{
              color: 'white',
              position: 'absolute',
              bottom: 0,
              right: 0,
              fontSize: 20,
              margin: 10
            }}>
              ToggaTrack
            </Text>
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
  },
  doneText: {
    maxWidth: '33%',
  },
  tags: {
    backgroundColor: 'lightgreen',
    borderRadius: 6,
    height: '60%',
    textAlignVertical: 'center',
    paddingHorizontal: 5,
  },
  text: {
    color: 'white'
  },
  textInput: {
    flex: 1,
    width: '65%',
    left: 0,
    height: '100%',
    color: 'black',
    fontSize: 22,
  },
  trackedItem: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: "center",
    width: '100%',
    height: 50,
    backgroundColor: 'lightgray',
    padding: 0,
    marginTop: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center",
    height: 70,
    width: '100%',
    backgroundColor: 'white',
    padding: 0,
    marginTop: 30,
  },
  folder: {
    width: '14%',
    height: '80%',
    justifyContent: 'center',
    alignItems: "center",
    marginRight: 10,
  },
  start: {
    width: 50,
    height: '70%',
    margin: 'auto',
    backgroundColor: secondary,
    borderRadius: 36,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: "center",
  },
});
