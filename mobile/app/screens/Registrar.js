import React from "react";
import { View, Text, TextInput, Button, Alert, TouchableOpacity, StyleSheet, ScrollView, Pressable} from "react-native";
import { ip } from '../model/';
import { estilos } from "../styles/Estilos";

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
			const res = await fetch(`http://${ip}/registrar_livro`, {
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
			const res = await fetch(`http://${ip}/registrar_autor`, {
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
			const res = await fetch(`http://${ip}/registrar_genero`, {
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
			const res = await fetch(`http://${ip}/pesquisa`,{
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
			const res = await fetch(`http://${ip}/registrar_livro_fisico`, {
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
			<View style={estilos.container}>
				<View style={estilos.inline}>
					{op.map((o) => {
						const selecionado = this.state.opcao;
						return (
							<TouchableOpacity
								style={[estilos.botao, this.state.opcao === o ? estilos.selecionado : estilos.nao_selecionado]}
								key={o}
								onPress={()=>this.setState({opcao:o})}
							>
								<Text style={estilos.texto}> {o} </Text>
							</TouchableOpacity>	
						);
					})}
				</View>

				{this.state.opcao == "Genero" && 
					<View>
						<Text style={estilos.titulo}>Registrar Genero</Text>
						<View style={estilos.inline}>
							<Text style={estilos.texto}>Genero:</Text>
							<TextInput
								style={estilos.input}
								value={this.state.genero}
								onChangeText={(genero) => this.setState({ genero })}
							/>
						</View>
						<Pressable
							onPress={() => this.gravar_genero()}
							style={estilos.botao}
						>
							<Text style={estilos.texto}> {"Registrar"} </Text>
						</Pressable>	
					</View>

				|| this.state.opcao == "Autor" && 
					<View>
						<Text style={estilos.titulo}>Registrar Autor</Text>
						<View style={estilos.inline}>
							<Text style={estilos.texto}>Autor:</Text>
							<TextInput
								style={estilos.input}
								value={this.state.autor}
								onChangeText={(autor) => this.setState({ autor })}
							/>
							
						</View>
						<Pressable
							onPress={() => this.gravar_autor()}
							style={estilos.botao}
						>
							<Text style={estilos.texto}> {"Registrar"} </Text>
						</Pressable>	
					</View>

				|| this.state.opcao == "Livros" &&
					<View>
						<Text style={estilos.titulo}>Registrar Livro</Text>
						<View style={estilos.inline}>
							<Text style={estilos.texto}>Nome:</Text>
							<TextInput
								style={estilos.input}
								onChangeText={(nome) => this.setState({ nome })}
							/>
						</View>
						<View style={estilos.inline}>
							<Text style={estilos.texto}>Autor:</Text>
							<TextInput
								style={estilos.input}
								onChangeText={(autor) => this.setState({ autor })} />
						</View>
						<View style={estilos.inline}>
							<Text style={estilos.texto}>Genero:</Text>
							<TextInput
								style={estilos.input}
								onChangeText={(genero) => this.setState({ genero })} />
						</View>
						<View style={estilos.inline}>
							<Text style={estilos.texto}>Descricao:</Text>
							<TextInput
								style={estilos.input}
								onChangeText={(descricao) => this.setState({ descricao })} />
						</View>
						<Pressable
							style={estilos.botao}
						onPress={() => this.gravar_livro()}
						>
							<Text style={estilos.texto}> {"Registrar"} </Text>

						</Pressable>
					</View>

				|| this.state.opcao == "Livro Fisico" &&
					<View style={estilos.container3}>
						<Text style={estilos.titulo}> Registrar Livro Fisico </Text>
						<View style={estilos.inline}>
							<TextInput
								style={estilos.input}
								onChangeText={(pesquisa) => this.setState({ pesquisa })}
							/>
							<Pressable
								style={estilos.botao}
								onPress={() => this.pesquisar()}
							>
								<Text style={estilos.texto}> {"Pesquisar"} </Text>
							</Pressable>
						</View>
						{ this.state.FID &&
							<View>
								<Text style={estilos.texto}> {"FID do novo livro registrado:"} </Text>
								<Text style={estilos.texto}> {`${this.state.FID}`} </Text>
							</View>
						}
						<ScrollView style={estilos.scroll}>
							{this.state.resultados.map((livro,index) => (
								<Pressable
									style={estilos.scroll_item}
									key={index}
									onPress={()=> this.gravar_livro_fisico(livro)}
								>
									<Text style={estilos.texto}> Nome: {livro.nome} </Text>
									<Text style={estilos.texto}> Autor: {livro.autor} </Text>
									<Text style={estilos.texto}> Genero: {livro.genero} </Text>
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
