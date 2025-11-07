import { View, Text } from 'react-native'
import React from 'react'
import Home from '../pages/home/home'
import AppBar from '../Components/shared/appBar'

const index = () => {
  return (
    <View>
      <AppBar></AppBar>
      <Home></Home>
    </View>
  )
}

export default index