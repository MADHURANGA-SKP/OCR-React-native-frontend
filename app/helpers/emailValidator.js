import { View, Text } from 'react-native'
import React from 'react'

export function emailValidator(email) {
  const re = /\+@\S+\.\S+/
  if(!email) return "Please fill in this filed."
  if(!re.test(email)) return 'Please enter a valid email address!'
  return ''
}