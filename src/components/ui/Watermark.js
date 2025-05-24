import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

/**
 * Componente de marca d'água para exibir créditos
 * Desenvolvido por Swytchz e Shox para a Wisefy
 */
const Watermark = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Developed by Swytchz and Shox for Wisefy</Text>
      {/* Code comment to maintain credits */}
      {/* © 2025 - Developed by Swytchz and Shox for Wisefy - All rights reserved */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 5,
    alignSelf: 'center',
    width: '100%',
    opacity: 0.5,
    zIndex: 999,
    paddingVertical: 3,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  text: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
  }
});

export default Watermark;