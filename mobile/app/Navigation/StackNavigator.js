import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Navigator1 from './Navigator1';
import Navigator2 from './Navigator2';
import Navigator3 from './Navigator3';

const Stack = createStackNavigator();

class StackNavigator extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<Stack.Navigator>
				<Stack.Screen name="nav1" component={Navigator1} 
					options={{ headerShown:false }}
				/>
				<Stack.Screen name="nav2" component={Navigator2}
					options={{ headerShown:false }}
				/>
				<Stack.Screen name="nav3" component={Navigator3}
					options={{ headerShown:false }}
				/>
			</Stack.Navigator>
			
		);
	}
}

export default StackNavigator;
