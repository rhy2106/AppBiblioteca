import React from "react";
import { View, Text, TextInput, Pressable, Alert, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { ip } from '../model/';
import { estilos } from "../styles/PerfilStyles";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

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
				<View style={estilos.box}>
					<View style={estilos.circulo}>
						<MaterialCommunityIcons 
						name={this.state.usuario.genero?.toLowerCase() === "homem" ? "face-man" : "face-woman"} 
						size={100} 
						color="#3d3737" 
						/>
					</View>
					<Text style={estilos.nome}> {this.state.usuario.usuario} </Text>
				</View>	
				<View style={estilos.linha}/>
				<View style={estilos.box2}>
					<View style={estilos.inline}>
						<Text style={estilos.texto}> {"Email"} </Text>
						<Text style={estilos.input}> {this.state.usuario.email} </Text>
					</View>	
					<View style={estilos.linha2}/>
					<View style={estilos.inline2}>
						<Text style={estilos.texto}> {"Gênero"} </Text>
						<Text style={estilos.input}> {this.state.usuario.genero} </Text>
					</View>	
				</View>
				<TouchableOpacity
						activeOpacity={0.7}
						style={estilos.botao}
						onPress={()=>this.props.navigation.navigate('historico',{usuario: this.state.usuario})}>
						<Text style={estilos.texto2}> Histórico </Text>
				</TouchableOpacity>	
			</View>
		);
	}
}

export default Perfil;
