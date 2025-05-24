import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { theme } from '../../theme';

/**
 * A fun, character-driven tutorial mascot that guides users through the app
 */
const TutorialMascot = ({ message, onDismiss }) => {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 500 }}
      style={styles.container}
    >
      <View style={styles.mascotContainer}>
        <View style={styles.mascotFace}>
          <View style={styles.eye} />
          <View style={styles.eye} />
          <View style={styles.mouth} />
        </View>
      </View>
      
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>{message}</Text>
      </View>
      
      {onDismiss && (
        <TouchableOpacity style={styles.dismissButton} onPress={onDismiss}>
          <Feather name="x" size={18} color="#fff" />
        </TouchableOpacity>
      )}
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(123, 77, 255, 0.2)',
    borderRadius: 16,
    padding: 16,
    margin: 16,
    borderWidth: 1,
    borderColor: 'rgba(123, 77, 255, 0.4)',
  },
  mascotContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#7B4DFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  mascotFace: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 24,
    height: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eye: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#fff',
    margin: 2,
  },
  mouth: {
    width: 14,
    height: 6,
    borderRadius: 6,
    backgroundColor: '#fff',
    marginTop: 2,
  },
  messageContainer: {
    flex: 1,
  },
  messageText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
  },
  dismissButton: {
    padding: 4,
  }
});

export default TutorialMascot;