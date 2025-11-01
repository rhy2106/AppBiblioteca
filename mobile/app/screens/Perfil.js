import React from "react";
import { View, Text, TextInput, Pressable, Alert, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { ip } from '../model/';
import { estilos } from "../styles/Estilos";

class Perfil extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			...this.props.route.params,
		};
	}

	render() {
		return (
			<View style={estilos.container2}>
				<View style={estilos.inline}>
					<Text style={estilos.texto}> {"Usuario: "} </Text>
					<Text style={estilos.input}> {this.state.usuario.usuario} </Text>
				</View>	
				<View style={estilos.inline}>
					<Text style={estilos.texto}> {"Email: "} </Text>
					<Text style={estilos.input}> {this.state.usuario.email} </Text>
				</View>	
				<View style={estilos.inline}>
					<Text style={estilos.texto}> {"Genero: "} </Text>
					<Text style={estilos.input}> {this.state.usuario.genero} </Text>
				</View>	
				<Pressable
					style={estilos.botao}
					onPress={()=>this.props.navigation.navigate('historico',{usuario: this.state.usuario})}
				>
					<Text style={estilos.texto}> Historico </Text>
				</Pressable>
			</View>
		);
	}
}

export default Perfil;

