import { ScrollView } from 'react-native'
import React, { createContext } from 'react'
import Home from '../pages/home/home'
import AppBar from '../src/Components/shared/appBar'
// import AuthProvider from '../src/context/AuthProvider';





const index = () => {
  return (

    <ScrollView>
        <Home></Home>
      </ScrollView>
  )
}

export default index