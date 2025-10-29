import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Telas } from './';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

class Inicio extends React.Component{
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
						tabBarLabel: "Home",
						tabBarIcon:({color,size}) => (<FontAwesome name="home" color={color} size={size}/>)
					  }}
				/>
			</Tab.Navigator>
		);
	}
}

export default Inicio;
