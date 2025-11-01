import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TelasUsuario } from './';
import { Fila, Perfil, Principal, Lista, Tinder } from '../screens/';
import { cor_header, cor_tab, cor_letra } from '../styles/Estilos';
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
			<Tab.Navigator
				screenOptions={{
					headerStyle: { backgroundColor: cor_header },
					headerTintColor: cor_letra,

					tabBarStyle: { backgroundColor: cor_header },
					tabBarActiveTintColor: cor_tab,
					tabBarInactiveTintColor: cor_letra,
				}}
			>
				<Tab.Screen name="home" component={Principal}
				   initialParams={{
						usuario:this.state.usuario,
				   }}
				   options={{
						tabBarLabel: "Home",
						tabBarIcon:({color,size}) => (<FontAwesome name="home" color={color} size={size}/>),
					  }}
				/>

				<Tab.Screen name="lista" component={Lista}
				   initialParams={{
						usuario:this.state.usuario,
				   }}
				   options={{
						tabBarLabel: "Lista",
						tabBarIcon:({color,size}) => (<FontAwesome name="bookmark" color={color} size={size}/>),
					  }}
				/>

				<Tab.Screen name="perfil" component={Perfil}
				   initialParams={{
						usuario:this.state.usuario,
				   }}
				   options={{
						tabBarLabel: "Perfil",
						tabBarIcon:({color,size}) => (<FontAwesome name="user-circle" color={color} size={size}/>),
					  }}
				/>

				<Tab.Screen name="tinder" component={Tinder}
				   initialParams={{
						usuario:this.state.usuario,
				   }}
				   options={{
						tabBarLabel: "Tinder",
						tabBarIcon:({color,size}) => (<FontAwesome name="user-plus" color={color} size={size}/>),
					  }}
				/>
			
				<Tab.Screen name="fila" component={Fila}
				   initialParams={{
						usuario:this.state.usuario,
				   }}
				   options={{
						tabBarLabel: "Fila",
						tabBarIcon:({color,size}) => (<FontAwesome name="file-text" color={color} size={size}/>),
					  }}
				/>
				
			</Tab.Navigator>
		);
	}
}

export default Inicio;
