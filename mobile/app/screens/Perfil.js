import React from "react";
import { View, Text, TextInput, Pressable, Alert, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { ip } from '../model/';

class Perfil extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			...this.props.route.params,
		};
	}

	

	render() {
		return (
			<View>
				<Text> {this.state.usuario.usuario} </Text>
				<Text> {this.state.usuario.email} </Text>
				<Text> {this.state.usuario.genero} </Text>
				
				<Pressable
					onPress={()=>this.erroSugestoes()}
				>
					<Text> Erro e Sugestoes </Text>	
				</Pressable>
				<Pressable
					onPress={()=>this.props.navigation.navigate('telasUsuario',{
						screen: 'historico',
							params: { usuario: this.state.usuario }
					})}
				>
					<Text> Historico </Text>
				</Pressable>
				<Pressable
					onPress={()=>this.salvar()}
				>
					<Text> Salvar </Text>	
				</Pressable>
			</View>
		);
	}
}

export default Perfil;

