import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {Principal, Livro} from '../screens'

const Stack = createStackNavigator();

class TelasUsuario extends React.Component{
	constructor(props){
		super(props);
		this.state = this.props.route.params;
	}
	render(){
		return(
			<Stack.Navigator>
				<Stack.Screen name="principal" component={Principal} 
					initialParams={{...this.state}}
				/>
				<Stack.Screen name="Livro" component={Livro} 
				/>
			</Stack.Navigator>
			
		);
	}
}

export default TelasUsuario;
