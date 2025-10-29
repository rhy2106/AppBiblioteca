import React from "react";
import { View, Text, TextInput, Button, Alert, TouchableOpacity, StyleSheet } from "react-native";
import { ip,hash } from "../model/";

class Cadastro extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			usuario: "",
			email: "",
			senha: "",
			genero: ""
		};
	}

	async gravar() {
		const { usuario, email, senha, genero } = this.state;
		if (!usuario || !email || !senha || !genero) return;

		const senha_hash = hash(senha);

		try {
			const res = await fetch(`http://${ip}/cadastrar`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ usuario, email, senha: senha_hash, genero }),
			});
			const data = await res.json();
			if(data.success)
				Alert.alert("Sucesso", "Usuário cadastrado!");
			else
				Alert.alert("Erro", data.mensagem);
		} catch (err) {
			console.error(err);
			Alert.alert("Erro", "Não foi possível conectar ao servidor");
		}
	}

	render() {
		const options = ["Homem", "Mulher"];
		return (
			<View>
				<Text>Cadastro</Text>
				<Text>Nome:</Text>
				<TextInput onChangeText={(usuario) => this.setState({ usuario })} />
				<Text>Email:</Text>
				<TextInput onChangeText={(email) => this.setState({ email })} />
				<Text>Senha:</Text>
				<TextInput onChangeText={(senha) => this.setState({ senha })} />
				{options.map((option) => {
					const isSelected = this.state.genero === option;
					return (
						<TouchableOpacity
							key={option}
							style={[styles.button, isSelected ? styles.buttonSelected : styles.buttonUnselected]}
							onPress={() => this.setState({ genero: option })}
						>
							<Text style={isSelected ? styles.textSelected : styles.textUnselected}>{option}</Text>
						</TouchableOpacity>
					);
				})}
				<Button title="Cadastrar" onPress={() => this.gravar()} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	button: {
		padding: 15,
		borderWidth: 2,
		borderRadius: 8,
		minWidth: 80,
		alignItems: "center"
	},
	buttonSelected: {
		backgroundColor: "#007bff",
		borderColor: "#007bff"
	},
	buttonUnselected: {
		backgroundColor: "#fff",
		borderColor: "#007bff"
	},
	textSelected: {
		color: "#fff",
		fontWeight: "bold"
	},
	textUnselected: {
		color: "#007bff",
		fontWeight: "bold"
	},
});

export default Cadastro;
