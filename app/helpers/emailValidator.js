import { View, Text } from 'react-native'
import React from 'react'

export function emailValidator(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!email) return "Please fill in this field.";
  if (!re.test(email)) return 'Please enter a valid email address!';
  return '';
}