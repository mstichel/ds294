import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

export default class ButtonList extends React.Component {
    render() {
        return (
            <View {...this.props} style={styles.buttonContainer}>{this.props.children}</View>
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
      flex: 1,
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      borderTopWidth: 1,
      borderTopColor: "#F5F5F5",
    }
  });
  