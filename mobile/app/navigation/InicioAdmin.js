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
					headerStyle: { backgroundColor: "#e38652" },
					headerTintColor: "white",
					tabBarStyle: { backgroundColor: cor_header },
					tabBarActiveTintColor: cor_tab,
					tabBarInactiveTintColor: cor_letra,
				}}
			>
				<Tab.Screen name="Estoque" component={Estoque}
				   initialParams={{
					   	usuario: this.state.usuario
				   }}
				   options={{
						tabBarLabel: "Estoque",
						tabBarIcon:({color,size}) => (<FontAwesome name="home" color={color} size={size}/>),
						headerLeft: () => (
							<FontAwesome name="home" size={24} color="white"style={{marginLeft: 15,marginRight:5}}/>
						),
				  }}
				/>
				<Tab.Screen name="Registrar" component={Registrar}
				   initialParams={{
						usuario:this.state.usuario,
				   }}
				   options={{
						tabBarLabel: "Registrar",
						tabBarIcon:({color,size}) => (<FontAwesome name="pencil" color={color} size={size}/>),
						headerLeft: () => (
							<FontAwesome name="pencil" size={24} color="white"style={{marginLeft: 15,marginRight:5}}/>
						),
				  }}
				/>
				<Tab.Screen name="Recepção" component={Recepcao}
				   initialParams={{
						usuario:this.state.usuario,
				   }}
				   options={{
						tabBarLabel: "Recepção",
						tabBarIcon:({color,size}) => (<FontAwesome name="book" color={color} size={size}/>),
						headerLeft: () => (
							<FontAwesome name="book" size={24} color="white"style={{marginLeft: 15,marginRight:5}}/>
						),
				  }}
				/>
				<Tab.Screen name="Usuários" component={Usuarios}
				   initialParams={{
						usuario:this.state.usuario,
				   }}
				   options={{
						tabBarLabel: "Usuários",
						tabBarIcon:({color,size}) => (<FontAwesome name="users" color={color} size={size}/>),
						headerLeft: () => (
							<FontAwesome name="users" size={24} color="white"style={{marginLeft: 15,marginRight:5}}/>
						),
				  }}
				/>
			</Tab.Navigator>
		);
	}
}

export default InicioAdmin;
