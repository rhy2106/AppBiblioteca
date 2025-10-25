import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './Navigation/StackNavigator';

class App extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<StackNavigator />
		);
	}
}

export default App;
