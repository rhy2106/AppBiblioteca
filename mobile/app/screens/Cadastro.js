import React from "react";
import { View, Text, TextInput, Pressable, Alert, TouchableOpacity, StyleSheet } from "react-native";
import { ip,hash } from "../model/";
import { estilos } from "../styles/Estilos";

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
			<View style={estilos.container}>
				<Text style={estilos.titulo} >Cadastro</Text>
				<View style={estilos.inline}>
					<Text style={estilos.texto}>Nome:</Text>
					<TextInput
						style={estilos.input}
						onChangeText={(usuario) => this.setState({ usuario })}
					/>
				</View>
				<View style={estilos.inline}>
					<Text style={estilos.texto}>Email:</Text>
					<TextInput
						style={estilos.input}
						onChangeText={(email) => this.setState({ email })}
					/>
					
				</View>
				<View style={estilos.inline}>
					<Text style={estilos.texto}>Senha:</Text>
					<TextInput
						style={estilos.input}
						onChangeText={(senha) => this.setState({ senha })}
					/>
				</View>
				<View style={estilos.inline}>
					{options.map((option) => {
						const isSelected = this.state.genero === option;
						return (
							<TouchableOpacity
								key={option}
								style={[estilos.botao, isSelected ? estilos.selecionado : estilos.nao_selecionado]}
								onPress={() => this.setState({ genero: option })}
							>
								<Text style={estilos.texto}>{option}</Text>
							</TouchableOpacity>
						);
					})}
				</View>
				<Pressable
					style={estilos.botao}
					onPress={()=>this.gravar()}
				>
					<Text style={estilos.texto}> {"Cadastrar"} </Text>
				</Pressable>
			</View>
		);
	}
}

export default Cadastro;
