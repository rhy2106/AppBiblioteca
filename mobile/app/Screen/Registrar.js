import React from "react";
import { View, Text, TextInput, Button, Alert, TouchableOpacity, StyleSheet, ScrollView, Pressable} from "react-native";
import { hash } from "../Model/Hash.js";
import { IP } from "../Model/Ip.js";

class Registrar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			...this.props.route.params,
			opcao: "Livro",
			nome: "",
			autor: "",
			genero: "",
			descricao: "",
			pesquisa: "",
			resultados: [],
		};
	}
	async gravar_livro(){
		const { nome, autor, genero, descricao } = this.state;
		if (!nome || !autor || !genero || !descricao) return;
		try {
			const res = await fetch(`http://${IP}/registrar_livro`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ nome, autor, genero, descricao}),
			});
			const data = await res.json();
			if(data.success)
				Alert.alert("Sucesso", "Livro cadastrado!");
			else
				Alert.alert("Erro", data.mensagem);
		} catch (err) {
			console.error(err);
			Alert.alert("Erro", "Não foi possível conectar ao servidor");
		}
	}

	async gravar_autor() {
		const { autor } = this.state;
		if (!autor) return;
		try {
			const res = await fetch(`http://${IP}/registrar_autor`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ autor }),
			});
			const data = await res.json();
			if(data.success)
				Alert.alert("Sucesso", "Autor cadastrado!");
			else
				Alert.alert("Erro", data.mensagem);
		} catch (err) {
			console.error(err);
			Alert.alert("Erro", "Não foi possível conectar ao servidor");
		}
	}

	async gravar_genero() {
		const { genero } = this.state;
		if (!genero) return;
		try {
			const res = await fetch(`http://${IP}/registrar_genero`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ genero }),
			});
			const data = await res.json();
			if(data.success)
				Alert.alert("Sucesso", "Genero cadastrado!");
			else
				Alert.alert("Erro", data.mensagem);
		} catch (err){
			Alert.alert("Erro", "Não foi possível conectar ao servidor");
		}
	}

	async pesquisar(){
		const {pesquisa} = this.state;
		try {
			const res = await fetch(`http://${IP}/pesquisa`,{
				method:"POST",
				headers: {"Content-Type":"application/json"},
				body:JSON.stringify({pesquisa}),
			});
			const resultados = await res.json();
			this.setState({ resultados });
		} catch(err){
			Alert.alert("Erro ao conecar com o banco de dados");
		}
	}

	async gravar_livro_fisico(livro){
		if (!livro) return;
		console.log(livro.LID);
		try {
			const res = await fetch(`http://${IP}/registrar_livro_fisico`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ livro }),
			});
			const data = await res.json();
			if(data.success){
				Alert.alert("Sucesso", "Livro Fisico cadastrado!");
				this.setState({FID: data.FID});
			}
			else
				Alert.alert("Erro", data.mensagem);
		} catch (err){
			Alert.alert("Erro", "Não foi possível conectar ao servidor");
		}
	}
	render() {
		const op = ["Livros","Autor","Genero","Livro Fisico"]
		return (
			<View>
				{op.map((o) => {
					const selecionado = this.state.opcao;
					return (
						<TouchableOpacity
							key={o}
							onPress={()=>this.setState({opcao:o})}
						>
							<Text> {o} </Text>
						</TouchableOpacity>	
					);
				})}
				{this.state.opcao == "Genero" && 
				<View>
					<Text>Registrar Genero</Text>
					<Text>Genero:</Text>
					<TextInput onChangeText={(genero) => this.setState({ genero })} />
					<Button title="Registrar" onPress={() => this.gravar_genero()} />
				</View> ||
				this.state.opcao == "Autor" && 
				<View>
					<Text>Registrar Autor</Text>
					<Text>Autor:</Text>
					<TextInput onChangeText={(autor) => this.setState({ autor })} />
					<Button title="Registrar" onPress={() => this.gravar_autor()} />
				</View> ||
				this.state.opcao == "Livros" &&
				<View>
					<Text>Registrar Livro</Text>
					<Text>Nome:</Text>
					<TextInput onChangeText={(nome) => this.setState({ nome })} />
					<Text>Autor:</Text>
					<TextInput onChangeText={(autor) => this.setState({ autor })} />
					<Text>Genero:</Text>
					<TextInput onChangeText={(genero) => this.setState({ genero })} />
					<Text>Descricao:</Text>
					<TextInput onChangeText={(descricao) => this.setState({ descricao })} />
					<Button title="Registrar" onPress={() => this.gravar_livro()} />
				</View> || 
				this.state.opcao == "Livro Fisico" &&
				<View>
					<Text> Registrar Livro Fisico </Text>
					<TextInput onChangeText={(pesquisa) => this.setState({ pesquisa })} />
					<Button title="Pesquisar" onPress={() => this.pesquisar()}/>
					{ this.state.FID &&
						<View>
							<Text> {"FID do novo livro registrado:"} </Text>
							<Text> {`${this.state.FID}`} </Text>
						</View>
					}
					<ScrollView>
						{this.state.resultados.map((livro,index) => (
							<Pressable key={index} onPress={()=> this.gravar_livro_fisico(livro)}>
								<Text> Nome: {livro.nome} </Text>
								<Text> Autor: {livro.autor} </Text>
								<Text> Genero: {livro.genero} </Text>
							</Pressable>
						))}
						
					</ScrollView>
				</View>
				}
			</View>
		);
	}
}

export default Registrar;
