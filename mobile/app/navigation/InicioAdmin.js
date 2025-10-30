import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Registrar, Recepcao, Estoque } from '../screens';
import { TelasAdm } from './';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

class InicioAdmin extends React.Component{
	constructor(props){
		super(props);
		console.log(this.props.route.params);
		this.state = {
			usuario: this.props.route.params,
		}
		console.log(this.state);
	}
	render(){
		return(
			<Tab.Navigator>
				<Tab.Screen name="telasAdm" component={TelasAdm}
				   initialParams={{
					   	usuario: this.state.usuario
				   }}
				   options={{
						tabBarLabel: "estoque",
						tabBarIcon:({color,size}) => (<FontAwesome name="home" color={color} size={size}/>),
		   				headerShown: false,
				  }}
				/>
				<Tab.Screen name="registrar" component={Registrar}
				   initialParams={{
						usuario:this.state.usuario,
				   }}
				   options={{
						tabBarLabel: "Registrar",
						tabBarIcon:({color,size}) => (<FontAwesome name="home" color={color} size={size}/>),
				  }}
				/>
				<Tab.Screen name="recepcao" component={Recepcao}
				   initialParams={{
						usuario:this.state.usuario,
				   }}
				   options={{
						tabBarLabel: "Recepcao",
						tabBarIcon:({color,size}) => (<FontAwesome name="home" color={color} size={size}/>),
				  }}
				/>
			</Tab.Navigator>
		);
	}
}

export default InicioAdmin;
