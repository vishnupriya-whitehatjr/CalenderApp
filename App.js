import React, { Component } from 'react';
import {Text, StyleSheet, View, TextInput, TouchableOpacity, FlatList} from 'react-native';
import {ListItem} from "react-native-elements";
import CalendarPicker from 'react-native-calendar-picker';
import db from "./config";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      events: [],
      eventText: ""
    };
    this.onDateChange = this.onDateChange.bind(this);
    this.requestRef = null;
  }

  addEvent = () => {
    db.collection("reminders").add({
      "event": this.state.eventText,
      "day": this.state.selectedStartDate.toString()
    })

    this.setState({
      eventText: ""
    })
  }

  async getEvents() {
    await db.collection("reminders").where("day", "==", this.state.selectedStartDate.toString())
    .onSnapshot(snapshot=>{
      var events = snapshot.docs.map(document=>document.data())
      console.log(events)
        this.setState({
            events: events
        })
        console.log(this.state.events);
      })
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });

    this.getEvents();
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({item, i}) => { 
    return ( 
    <ListItem key={i} bottomDivider>
        <ListItem.Content>
            <ListItem.Title>{item.event}</ListItem.Title>
            <ListItem.Subtitle>{item.day}</ListItem.Subtitle>
        </ListItem.Content>
    </ListItem>
    ) 
}

  render() {
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    return (
      <View style={styles.container}>
        <CalendarPicker
          onDateChange={this.onDateChange}
        />

        <View style={{display: "flex", marginTop: 15, flexDirection: "row"}}>
            <TextInput style={styles.textInput}
                placeholder="Event Name"
                value={this.state.eventText}
                onChangeText={
                  (text)=>{
                    this.setState({
                      eventText: text
                    })
                  }
              }/>
            <TouchableOpacity style={styles.addButton}
            onPress={
              ()=>{
                this.addEvent();
              }
            }>
              <Text style={styles.addText}>Add</Text>
            </TouchableOpacity>
        </View>

        <View style={{flex: 1, width: "100%"}}>
                    {this.state.events.length===0
                    ? (<View style={{flex: 1}}>
                        <Text>No Events Planned</Text>
                    </View>)
                    : (<FlatList keyExtractor={this.keyExtractor}
                    data={this.state.events}
                    renderItem={this.renderItem}/>)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 50
  },
  textInput:{
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 3.5,

    borderRightWidth: 0,

    width: "80%",
    alignSelf: "center",
    height: 40,
    fontSize: 20
  },
  addButton:{
    backgroundColor: "red",
    alignContent: "center",
    padding: 10,
    display: "flex",

    height: 40,

    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 3.5,

    borderLeftWidth: 0,
  }
});