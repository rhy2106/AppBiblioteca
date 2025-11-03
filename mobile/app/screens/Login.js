import React from "react";
import { View, Text, TextInput, Pressable, Alert, TouchableOpacity } from "react-native";
import { ip, hash } from "../model/";
import { estilos } from "../styles/LoginStyles";
import { StyleSheet } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
class Login extends React.Component {
	constructor(props) {
		super(props);
			this.state = { email: "", senha: "" };
			console.log(ip);
		}

	async logar() {
		const { email, senha } = this.state;
		const hash_senha = hash(senha);
		try {
			const res = await fetch(`http://${ip}/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, senha: hash_senha }),
			});
			const {data} = await res.json(); // ajuste conforme backend
			if (res.status === 401) {
				Alert.alert("Email ou senha inválido!");
			} else {
				if(data.adm){
					this.props.navigation.navigate("inicioAdm",{
						usuario: data.usuario,
						email: data.email,
						genero: data.genero,
						pontuacao: data.pontuacao,
						UID: data.UID,
					});
				}
				else {
					this.props.navigation.navigate("inicioUser", {
						usuario: data.usuario,
						email: data.email,
						genero: data.genero,
						pontuacao: data.pontuacao,
						UID: data.UID,
					});
				}
			}
		} catch (err) {
			Alert.alert("Erro ao conectar com o banco de dados " + err);
		}
	}

	render() {
		return (
			<View style={estilos.container}>
				<View style={estilos.caixaLogin}>
					<Text style={estilos.titulo} > {"Login"}</Text>
					<View style={estilos.inline} >
						<View style={estilos.linha}>
							<Entypo style={estilos.icon} name="email" size={15} color="white" />
							<Text style={estilos.texto} > {"Email:"} </Text>
						</View>
						<TextInput
							style={estilos.input}
							onChangeText={(email) => this.setState({ email })}
						/>
					</View>
					<View style={estilos.inline} >
						<View style={estilos.linha}>
							<Entypo style={estilos.icon} name="lock" size={15} color="white" />
							<Text style={estilos.texto} > {"Senha:"} </Text>
						</View>
						<TextInput
							style={estilos.input}
							onChangeText={(senha) => this.setState({ senha })}
							secureTextEntry={true}
						/>
					</View>
					<TouchableOpacity 
						style={estilos.botao}
						onPress={()=>this.logar()}
						activeOpacity={0.7}
					>
						<Text style={estilos.texto2} > {"Entrar"} </Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

export default Login;
