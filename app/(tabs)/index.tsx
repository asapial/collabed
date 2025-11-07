import {  ScrollView } from 'react-native'
import React, { createContext } from 'react'
import Home from '../pages/home/home'
import AppBar from '../src/Components/shared/appBar'


export const AuthContext = createContext();


const index = () => {
  return (
    <ScrollView>
      <AppBar></AppBar>
      <Home></Home>
    </ScrollView>
  )
}

export default index