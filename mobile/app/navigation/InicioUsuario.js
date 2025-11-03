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
					headerStyle: { backgroundColor: "#e38652" },
					headerTintColor: "white",
					tabBarStyle: { backgroundColor: "white" },
					tabBarActiveTintColor: cor_tab,
					tabBarInactiveTintColor: cor_letra,
				}}
			>
				<Tab.Screen name="Home" component={Principal} 
				   initialParams={{
						usuario:this.state.usuario,
				   }}
				   options={{
						tabBarLabel: "Home",
						tabBarIcon:({color,size}) => (<FontAwesome name="home" color={color} size={size}/>),
						headerLeft: () => (
							<FontAwesome name="home" size={24} color="white"style={{marginLeft: 15,marginRight:5}}/>
						),
					  }}
				/>

				<Tab.Screen name="Lista" component={Lista}
				   initialParams={{
						usuario:this.state.usuario,
				   }}
				   options={{
						tabBarLabel: "Lista",
						tabBarIcon:({color,size}) => (<FontAwesome name="bookmark" color={color} size={size}/>),
						headerLeft: () => (
							<FontAwesome name="bookmark" color="white" size={24} style={{marginLeft: 15,marginRight:5}}/>
						),
					  }}
				/>

				<Tab.Screen name="Perfil" component={Perfil}
				   initialParams={{
						usuario:this.state.usuario,
				   }}
				   options={{
						tabBarLabel: "Perfil",
						tabBarIcon:({color,size}) => (<FontAwesome name="user-circle" color={color} size={size}/>),
						headerLeft: () => (
							<FontAwesome name="user-circle" color="white" size={24} style={{marginLeft: 15,marginRight:5}}/>
						),
					  }}
				/>

				<Tab.Screen name="Tinder" component={Tinder}
				   initialParams={{
						usuario:this.state.usuario,
				   }}
				   options={{
						tabBarLabel: "Tinder",
						tabBarIcon:({color,size}) => (<FontAwesome name="user-plus" color={color} size={size}/>),
						headerLeft: () => (
							<FontAwesome name="user-plus" color="white" size={24} style={{marginLeft: 15,marginRight:5}}/>
						),
					  }}
				/>
			
				<Tab.Screen name="Fila" component={Fila}
				   initialParams={{
						usuario:this.state.usuario,
				   }}
				   options={{
						tabBarLabel: "Fila",
						tabBarIcon:({color,size}) => (<FontAwesome name="file-text" color={color} size={size}/>),
						headerLeft: () => (
							<FontAwesome name="file-text" color="white" size={24} style={{marginLeft: 15,marginRight:5}}/>
						),
					  }}
				/>
				
			</Tab.Navigator>
		);
	}
}

export default Inicio;
