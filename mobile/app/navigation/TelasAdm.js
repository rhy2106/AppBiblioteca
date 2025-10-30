import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {Estoque, Livro} from '../screens'

const Stack = createStackNavigator();

class TelasAdm extends React.Component{
	constructor(props){
		super(props);
		this.state = this.props.route.params;
	}
	render(){
		return(
			<Stack.Navigator>
				<Stack.Screen name="estoque" component={Estoque}
					initialParams={{...this.state}}
				/>
				<Stack.Screen name="Livro" component={Livro} 
				/>
			</Stack.Navigator>
			
		);
	}
}

export default TelasAdm;
