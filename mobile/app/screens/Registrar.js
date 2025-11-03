import React from "react";
import { View, Text, TextInput, Button, Alert, TouchableOpacity, StyleSheet, ScrollView, Pressable} from "react-native";
import { ip } from '../model/';
import { estilos } from "../styles/RegistrarStyles";

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
		const op = ["Livros","Livro Físico"]
		return (
			<View style={estilos.container}>
				<View style={estilos.inline}>
					{op.map((o) => {
						const selecionado = this.state.opcao;
						return (
							<TouchableOpacity
								style={[estilos.botao2, this.state.opcao === o ? estilos.selecionado : estilos.nao_selecionado]}
								key={o}
								onPress={()=>this.setState({opcao:o})}
								activeOpacity={0.7}
							>
								<Text style={estilos.texto2}> {o} </Text>
							</TouchableOpacity>	
						);
					})}
				</View>

				{this.state.opcao == "Livros" &&
					<View style={estilos.box1}>
						<Text style={estilos.titulo}>Registrar Livro</Text>
						<View style={estilos.inline2}>
							<Text style={estilos.texto}>Nome:</Text>
							<TextInput
								style={estilos.input2}
								onChangeText={(nome) => this.setState({ nome })}
							/>
						</View>
						<View style={estilos.inline2}>
							<Text style={estilos.texto}>Autor:</Text>
							<TextInput
								style={estilos.input2}
								onChangeText={(autor) => this.setState({ autor })} />
						</View>
						<View style={estilos.inline2}>
							<Text style={estilos.texto}>Gênero:</Text>
							<TextInput
								style={estilos.input2}
								onChangeText={(genero) => this.setState({ genero })} />
						</View>
						<View style={estilos.inline2}>
							<Text style={estilos.texto}>Descrição:</Text>
							<TextInput
								style={estilos.input2}
								onChangeText={(descricao) => this.setState({ descricao })} />
						</View>
						<TouchableOpacity
							style={estilos.botao3}
						onPress={() => this.gravar_livro()}
						activeOpacity={0.7}c
						>
							<Text style={estilos.texto3}> {"Registrar"} </Text>

						</TouchableOpacity>
					</View>

				|| this.state.opcao == "Livro Físico" &&
					<View style={estilos.container3}>
						<View style={estilos.box2}>
							<Text style={estilos.titulo2}> Registrar Livro Físico </Text>
							<View style={estilos.inline}>
								<TextInput
									style={estilos.input}
									onChangeText={(pesquisa) => this.setState({ pesquisa })}
									placeholder="Livro, autor, gênero" 
									placeholderTextColor="gray" 
								/>
								<TouchableOpacity
									style={estilos.botao4}
									onPress={() => this.pesquisar()}
									activeOpacity={0.7}
								>
									<Text style={estilos.texto4}> {"Pesquisar"} </Text>
								</TouchableOpacity>
							</View>
						</View>
						{ this.state.FID &&
							<View stlye={{marginTop: 16}}>
								<Text style={estilos.texto7}> {"FID do novo Livro registrado:"} </Text>
								<Text style={estilos.texto7}> {`${this.state.FID}`} </Text>
							</View>
						}
						<ScrollView style={estilos.scroll}>
							{this.state.resultados.map((livro,index) => (
								<TouchableOpacity
									style={estilos.scroll_item}
									key={index}
									onPress={()=> this.gravar_livro_fisico(livro)}
									activeOpacity={0.7}
								>
									<View style={{flexDirection:"row"}}>
										<Text style={estilos.texto6}> Nome: </Text>
										<Text style={estilos.texto} >{livro.nome}</Text>
									</View>
									<View style={{flexDirection:"row"}}>
										<Text style={estilos.texto6}> Autor: </Text>
										<Text style={estilos.texto} >{livro.autor}</Text>
									</View>
									<View style={{flexDirection:"row"}}>
										<Text style={estilos.texto6}> Gênero: </Text>
										<Text style={estilos.texto} >{livro.genero}</Text>
									</View>
								</TouchableOpacity>
							))}
							
						</ScrollView>
					</View>
				}
			</View>
		);
	}
}

export default Registrar;
