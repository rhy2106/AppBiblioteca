import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Registrar, Recepcao, Estoque, Usuarios } from '../screens';
import { TelasAdm } from './';
import { cor_header, cor_tab, cor_letra } from '../styles/Estilos';
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
			<Tab.Navigator
				screenOptions={{
					headerStyle: { backgroundColor: cor_header },
					headerTintColor: cor_letra,

					tabBarStyle: { backgroundColor: cor_header },
					tabBarActiveTintColor: cor_tab,
					tabBarInactiveTintColor: cor_letra,
				}}
			>
				<Tab.Screen name="estoque" component={Estoque}
				   initialParams={{
					   	usuario: this.state.usuario
				   }}
				   options={{
						tabBarLabel: "estoque",
						tabBarIcon:({color,size}) => (<FontAwesome name="home" color={color} size={size}/>),
				  }}
				/>
				<Tab.Screen name="registrar" component={Registrar}
				   initialParams={{
						usuario:this.state.usuario,
				   }}
				   options={{
						tabBarLabel: "Registrar",
						tabBarIcon:({color,size}) => (<FontAwesome name="pencil" color={color} size={size}/>),
				  }}
				/>
				<Tab.Screen name="recepcao" component={Recepcao}
				   initialParams={{
						usuario:this.state.usuario,
				   }}
				   options={{
						tabBarLabel: "Recepcao",
						tabBarIcon:({color,size}) => (<FontAwesome name="book" color={color} size={size}/>),
				  }}
				/>
				<Tab.Screen name="usuarios" component={Usuarios}
				   initialParams={{
						usuario:this.state.usuario,
				   }}
				   options={{
						tabBarLabel: "gerenciar usuarios",
						tabBarIcon:({color,size}) => (<FontAwesome name="users" color={color} size={size}/>),
				  }}
				/>
			</Tab.Navigator>
		);
	}
}

export default InicioAdmin;
