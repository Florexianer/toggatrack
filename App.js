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
      filterOpen: false,
      filter: null,
      running: {
        name: '',
        tag_id: 1,
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
          start: new Date()
        },
        dropdown: {
          open: false,
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
        ],
        dropdown: {
          open: false,
        }
      })
      clearInterval(this.state.handle)
      this.setState({
        running: {
          name : '',
          tag_id: this.state.running.tag_id
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
      },
      dropdown: {
        open: false
      }
    });
  }

  openSelect = () => {
    this.setState({
      dropdown: {
        ...this.state.dropdown,
        open: !this.state.dropdown.open,
      }
    })
  }

  setTag = (id) => {
    this.setState({
      running: {
        ...this.state.running,
        tag_id: id,
      }
    })
  }

  openFilter = () => {
    this.setState({
      filterOpen: !this.state.filterOpen,
    })
  }

  setFilter= (id) => {
    this.setState({
      filter: id
    })
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
            <Pressable style={styles.filter} onPress={this.openFilter}>
              <Icon name="filter" size={36} color="grey" />
            </Pressable>
            {/*
                Dropdown Tags selector
            */}
              {this.state.dropdown.open ?
                  <View style={styles.dropDown}>
                    {this.state.tags.map((item, i) =>
                        <Pressable onPress={() => this.setTag(i)} key={i} style={styles.dropDownItem}>
                          <Text style={{
                            backgroundColor: this.state.running.tag_id === i ? 'lightgreen' : 'white',
                            height: '100%',
                            textAlignVertical: 'center',
                            borderRadius: 4,
                          }}>
                            {item}
                          </Text>
                        </Pressable>
                    )}
                  </View>: ''
              }
            {/*
                Dropdown filter
            */}
            {this.state.filterOpen ?
                <View style={styles.dropDownFilter}>
                  {this.state.tags.map((item, i) =>
                      <Pressable onPress={() => this.setFilter(i)} key={i} style={styles.dropDownItem}>
                        <Text style={{
                          backgroundColor: this.state.filter === i ? 'lightgreen' : 'white',
                          height: '100%',
                          textAlignVertical: 'center',
                          borderRadius: 4,
                        }}>
                          {item}
                        </Text>
                      </Pressable>
                  )}
                  <Pressable onPress={() => this.setFilter(null)} style={styles.dropDownItem}>
                    <Text style={{
                      backgroundColor: this.state.filter === null ? 'lightgreen' : 'white',
                      height: '100%',
                      textAlignVertical: 'center',
                      borderRadius: 4,
                    }}>
                      none
                    </Text>
                  </Pressable>
                </View>: ''
            }

            <View style={styles.header}>
              <TextInput style={styles.textInput} ref={input => { this.textInput = input }} onChangeText={this.handleChange} onPressOut={() => {
                this.setState({
                dropdown: {
                  open: false
                }
              })}} placeholderTextColor={placeholderText} placeholder={'What are you working on?'}/>

              {this.state.handle ? <Text>{this.state.counter}</Text> : ''}

              <Pressable style={styles.folder} onPress={this.openSelect}>
                <Icon name="folder-open" size={36} color="grey" />
              </Pressable>
              <Pressable style={styles.start} onPress={this.startStopTimer}>
                {this.state.handle ? <Icon name="pause" size={32} color="white"/> : <Icon name="play" size={32} color="white"/>}
              </Pressable>
            </View >

            <Text>
              {'\n'}
            </Text>

            <View>
              {this.state.tracked.filter(n => this.state.filter === null | this.state.filter === n.tag_id).map((item, i) =>
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
                    <Pressable style={styles.folder} onPress={() => {
                      this.state.tracked.splice(i,1)
                      this.forceUpdate()
                    }}>
                      <Icon name="delete" size={36} color="#c5271f" />
                    </Pressable>
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
  dropDown: {
    position: "absolute",
    top: 80,
    right: 50,
    height: 120,
    zIndex: 4,
    width: '30%',
    backgroundColor: 'white',
    borderRadius: 16,
  },
  dropDownFilter: {
    position: "absolute",
    bottom: 50,
    left: 70,
    height: 120,
    zIndex: 4,
    width: '30%',
    backgroundColor: 'white',
    borderRadius: 16,
  },
  dropDownItem: {
    height: 40,
    backgroundColor: 'white',
    borderRadius: 4,
  },
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
  filter: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 36,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: "center",
  }
});
