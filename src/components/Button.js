import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {backgroundColor} from '../constants';
class Button extends Component {
  render() {
    const {onPress, title, color = backgroundColor} = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={[styles.buttonLogin, {backgroundColor: color}]}>
          <Text style={{color: '#FFF', fontWeight: 'bold'}}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default Button;

const styles = StyleSheet.create({
  buttonLogin: {
    paddingHorizontal: 42,
    paddingVertical: 14,

    alignItems: 'center',
    borderRadius: 8,
  },
});
