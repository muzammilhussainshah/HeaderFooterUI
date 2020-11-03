import React, { Component } from 'react';
import { View, Text, Button, Dimensions, TouchableOpacity } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
var months = ["January", "February", "March", "April",
  "May", "June", "July", "August", "September", "October",
  "November", "December"];

var weekDays = [
  "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
];
var nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export default class CustomCalendar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeDate: new Date(), booking: [{ date: "10-30-2020", title: "north marraige" }, { date: "10-15-2020", title: "city lawn" }]
    }
  };

  generateMatrix() {
    console.log([this.state.activeDate.getMonth() + 1 + "-" + this.state.activeDate.getDate() + "-" + this.state.activeDate.getFullYear()])
    var matrix = [];
    matrix[0] = weekDays;
    var year = this.state.activeDate.getFullYear();
    var month = this.state.activeDate.getMonth();
    var firstDay = new Date(year, month, 1).getDay();
    var maxDays = nDays[month];
    if (month == 1) { // February
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        maxDays += 1;
      }
    }
    var counter = 1;
    for (var row = 1; row < 7; row++) {
      matrix[row] = [];
      for (var col = 0; col < 7; col++) {
        matrix[row][col] = -1;
        if (row == 1 && col >= firstDay) {
          matrix[row][col] = counter++;
        } else if (row > 1 && counter <= maxDays) {
          matrix[row][col] = counter++;
        }
      }
    }
    return matrix;
  }

  _onPress = (item) => {
    this.setState(() => {
      if (!item.match && item != -1) {
        this.state.activeDate.setDate(item);
        return this.state;
      }
    });
  };

  changeMonth = (n) => {
    this.setState(() => {
      this.state.activeDate.setMonth(
        this.state.activeDate.getMonth() + n
      )
      return this.state;
    });
  }

  render() {
    const { booking } = this.state
    var matrix = this.generateMatrix();
    var rows = [];
    rows = matrix.map((row, rowIndex) => {
      console.log(row, rowIndex, "aaa")
      var rowItems = row.map((item, colIndex) => {
        const bookedDate = booking.filter(({ date }) => date === this.state.activeDate.getMonth() + 1 + "-" + item + "-" + this.state.activeDate.getFullYear());
        if (bookedDate.length) {
          console.log(bookedDate, "aaaaaaaaaaaaaaaaa")
          return (
            <TouchableOpacity activeOpacity={1}
            onPress={() => this._onPress(item)}
              style={{
                height: 70,
                width:windowWidth / 7,
                textAlign: 'center',
                borderWidth: 0.2, borderColor: "black",
                backgroundColor: '#ddd',
              }}
            >

              <Text
                style={{
                  width: windowWidth / 7,
                  textAlign: 'center',
                  alignSelf: "center",
                  alignItems: "center",
                  backgroundColor: rowIndex == 0 ? '#ddd' : '#fff',
                  color: colIndex == 0 ? '#a00' : '#000',
                  fontWeight: item == this.state.activeDate.getDate()
                    ? 'bold' : ''
                }}
               >
                {item != -1 ? item : ''}
              </Text>
              <Text style={{ fontSize:9 }}>
                {bookedDate[0].title}
              </Text>
            </TouchableOpacity>
          );
        }
        else {
          return (
            <Text
              style={{
                height: rowIndex == 0 ? 50 : windowHeight/10,
                width: windowWidth / 7,
                textAlign: 'center',
                alignSelf: "center",
                borderWidth: 0.2, borderColor: "black",
                alignItems: "center",
                backgroundColor: rowIndex == 0 ? '#ddd' : '#fff',
                color: colIndex == 0 ? '#a00' : '#000',
                fontWeight: item == this.state.activeDate.getDate()
                  ? 'bold' : ''
              }}
              onPress={() => this._onPress(item)}>
              {item != -1 ? item : ''}
            </Text>
          );
        }
      });
      return (
        <View
          style={{
            backgroundColor: "red",
            flexDirection: 'row',
            height:  rowIndex == 0 ? 50 : windowHeight/10,
            width: "100%",
          }}>
          {rowItems}
        </View>
      );
    });

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1,flexDirection:"row", justifyContent:"space-around", alignItems: "center" }}>
          <TouchableOpacity
          onPress={() => this.changeMonth(-1)}
          >
            <SimpleLineIcons name={"arrow-left"} size={20} style={{  }} />
          </TouchableOpacity>
          <Text style={{
            fontWeight: 'bold',
            fontSize: 18,
            textAlign: 'center',
          }}>
            {months[this.state.activeDate.getMonth()]} &nbsp;
          {this.state.activeDate.getFullYear()}
          </Text>
          <TouchableOpacity  onPress={() => this.changeMonth(+1)}>
            <SimpleLineIcons name={"arrow-right"} size={20} style={{  }} />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 7 }}>
          {rows}
        </View>
      </View>
    );
  }
}
