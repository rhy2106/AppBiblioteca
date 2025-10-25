import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Registrar, Principal } from '../Screen';
import StackinNavigator from './StackinNavigator';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

class Navigator3 extends React.Component{
	constructor(props){
		super(props);
		console.log(this.props.route.params);
		this.state = this.props.route.params;
		console.log(this.state);
	}
	render(){
		return(
			<Tab.Navigator>
				<Tab.Screen name="pesquisa" component={StackinNavigator}
				   initialParams={{
						usuario:this.state.usuario,
						email:this.state.email,
						genero:this.state.genero,
						pontuacao:this.state.pontuacao,
						UID:this.state.UID,
				   }}
				   options={{
						tabBarLabel: "pesquisa",
						tabBarIcon:({color,size}) => (<FontAwesome name="home" color={color} size={size}/>)
				  }}
				/>
				<Tab.Screen name="registrar" component={Registrar}
				   initialParams={{
						usuario:this.state.usuario,
						email:this.state.email,
						genero:this.state.genero,
						pontuacao:this.state.pontuacao,
						UID:this.state.UID,
				   }}
				   options={{
						tabBarLabel: "Registrar",
						tabBarIcon:({color,size}) => (<FontAwesome name="home" color={color} size={size}/>)
				  }}
				/>
			</Tab.Navigator>
		);
	}
}

export default Navigator3;
