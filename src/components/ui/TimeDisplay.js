import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TimeDisplay = ({ time, containerStyle, textStyle }) => {
  // Simplify display for various time formats
  const formattedTime = time
    .replace(':00', '') // Remove ":00" if present
    .replace(' ', '\n'); // Replace space with newline for AM/PM

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.timeText, textStyle]}>{formattedTime}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default TimeDisplay;