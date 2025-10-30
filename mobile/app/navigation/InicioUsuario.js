import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TelasUsuario } from './';
import { Fila } from '../screens/';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

class Inicio extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			usuario: this.props.route.params,
		}
	}
	render(){
		return(
			<Tab.Navigator>
				<Tab.Screen name="telasUsuario" component={TelasUsuario}
				   initialParams={{
						usuario:this.state.usuario,
				   }}
				   options={{
						tabBarLabel: "Home",
						tabBarIcon:({color,size}) => (<FontAwesome name="home" color={color} size={size}/>),
					   	headerShown: false
					  }}
				/>
				<Tab.Screen name="fila" component={Fila}
				   initialParams={{
						usuario:this.state.usuario,
				   }}
				   options={{
						tabBarLabel: "Fila",
						tabBarIcon:({color,size}) => (<FontAwesome name="home" color={color} size={size}/>),
					  }}
				/>
			</Tab.Navigator>
		);
	}
}

export default Inicio;
