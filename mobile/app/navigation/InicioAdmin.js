import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Registrar, Principal } from '../screens';
import { Telas } from './';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

class InicioAdmin extends React.Component{
	constructor(props){
		super(props);
		console.log(this.props.route.params);
		this.state = this.props.route.params;
		console.log(this.state);
	}
	render(){
		return(
			<Tab.Navigator>
				<Tab.Screen name="telas" component={Telas}
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

export default InicioAdmin;
