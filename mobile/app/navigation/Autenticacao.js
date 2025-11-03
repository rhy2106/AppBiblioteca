import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Login, Cadastro } from '../screens';
import { cor_header, cor_letra, cor_tab } from '../styles/Estilos';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';


const Tab = createBottomTabNavigator();

class Autenticacao extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<Tab.Navigator
				screenOptions={{
					headerShown: false,
					headerStyle: { backgroundColor: cor_header },
					headerTintColor: cor_letra,

					tabBarStyle: { backgroundColor: cor_header },
					tabBarActiveTintColor: "#e38652",
					tabBarInactiveTintColor: "#4d4a49",
				}}
			>
                 <Tab.Screen name="login" component={Login}
					options={{
 						tabBarLabel: "Login",
 						tabBarIcon:({color,size}) => (<FontAwesome6 name="right-to-bracket" color={color} size={size}/>)
 						}}
					/>
				<Tab.Screen name="cadastro" component={Cadastro}
					options={{
					tabBarLabel: "Cadastro",
					tabBarIcon:({color,size}) => (<FontAwesome name="sign-in" color={color} size={size}/>) 
					}}
				/>
			</Tab.Navigator>
		);
	}
}

export default Autenticacao;
