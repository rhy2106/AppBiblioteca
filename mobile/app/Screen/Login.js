import React from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { hash } from "../Model/Hash.js";
import { IP } from "../Model/Ip.js";

class Login extends React.Component {
	constructor(props) {
		super(props);
			this.state = { email: "", senha: "" };
		}

	async logar() {
		const { email, senha } = this.state;
		const hash_senha = hash(senha);
		try {
			const res = await fetch(`http://${IP}/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, senha: hash_senha }),
			});
			const {data} = await res.json(); // ajuste conforme backend
			if (res.status === 401) {
				Alert.alert("Erro: Email ou Senha Errados");
			} else {
				if(data.adm){
					this.props.navigation.navigate("nav3",{
						usuario: data.usuario,
						email: data.email,
						genero: data.genero,
						pontuacao: data.pontuacao,
						UID: data.UID,
					});
				}
				else {
					this.props.navigation.navigate("nav2", {
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
			<View>
				<Text>Login</Text>
				<Text>Email:</Text>
				<TextInput onChangeText={(email) => this.setState({ email })} />
				<Text>Senha:</Text>
				<TextInput onChangeText={(senha) => this.setState({ senha })} />
				<Button title="Login" onPress={() => this.logar()} />
			</View>
		);
	}
}

export default Login;
