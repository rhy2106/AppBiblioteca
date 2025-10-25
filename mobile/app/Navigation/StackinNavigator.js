import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {Principal, Livro} from '../Screen'

const Stack = createStackNavigator();

class StackinNavigator extends React.Component{
	constructor(props){
		super(props);
		this.state = this.props.route.params;
	}
	render(){
		return(
			<Stack.Navigator>
				<Stack.Screen name="principal" component={Principal} 
					initialParams={{...this.state}}
					options={{ headerShown:false }}
				/>
				<Stack.Screen name="Livro" component={Livro} 
					options={{ headerShown:false }}
				/>
			</Stack.Navigator>
			
		);
	}
}

export default StackinNavigator;
