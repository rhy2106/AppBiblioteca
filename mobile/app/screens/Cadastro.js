import React from "react";
import { View, Text, TextInput, Pressable, Alert, TouchableOpacity, StyleSheet } from "react-native";
import { ip,hash } from "../model/";
import { estilos } from "../styles/CadastroStyles";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';

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
				<View style={estilos.caixa}>
					<Text style={estilos.titulo} >Cadastro</Text>
					<View style={estilos.inline}>
						<View style={estilos.linha}>
							<FontAwesome style={estilos.icon} name="user" size={15} color="white" />
							<Text style={estilos.texto}>Nome:</Text>
						</View>
						<TextInput
							style={estilos.input}
							onChangeText={(usuario) => this.setState({ usuario })}
						/>
					</View>
					<View style={estilos.inline}>
						<View style={estilos.linha}>
							<Entypo style={estilos.icon} name="email" size={15} color="white" />
							<Text style={estilos.texto}>Email:</Text>
						</View>
						<TextInput
							style={estilos.input}
							onChangeText={(email) => this.setState({ email })}
						/>
						
					</View>
					<View style={estilos.inline}>
						<View style={estilos.linha}>
							<Entypo style={estilos.icon} name="lock" size={15} color="white" />
							<Text style={estilos.texto}>Senha:</Text>
						</View>
						<TextInput secureTextEntry={true}
							style={estilos.input}
							onChangeText={(senha) => this.setState({ senha }) }
						/>
					</View>
					<View style={estilos.inline2}>
						{options.map((option) => {
							const isSelected = this.state.genero === option;
							return (
								<TouchableOpacity 
									key={option}
									style={[estilos.botao3, isSelected ? estilos.selecionado : estilos.nao_selecionado]}
									onPress={() => this.setState({ genero: option })}
									activeOpacity={0.7}
								>
									 <Text style={[estilos.texto2, isSelected ? { color: "white" } : { color: "#ac5f32ff" }]}>
										{option}
									</Text>
								</TouchableOpacity>
							);
						})}
					</View>
					<TouchableOpacity 
						style={estilos.botao}
						onPress={()=>this.gravar()}
						activeOpacity={0.7}
					>
						<Text style={estilos.texto3}> {"Cadastrar"} </Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

export default Cadastro;
