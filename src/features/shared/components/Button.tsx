import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
}) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[variant],
        isDisabled && styles.disabled
      ]}
      onPress={onPress}
      disabled={isDisabled}
    >
      <Text style={[
        styles.text,
        styles[`${variant}Text`]
      ]}>
        {loading ? 'Chargement...' : title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  // Variants
  primary: {
    backgroundColor: '#007AFF',
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#ccc',
  },
  danger: {
    backgroundColor: '#FF3B30',
  },
  // Disabled state
  disabled: {
    backgroundColor: '#ccc',
    borderColor: '#ccc',
  },
  // Text styles
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: '#666',
  },
  dangerText: {
    color: 'white',
  },
});