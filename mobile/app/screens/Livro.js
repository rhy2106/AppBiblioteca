import React from "react";
import { View, Text, TextInput, Button, Alert, TouchableOpacity, StyleSheet, ScrollView, Pressable } from "react-native";
import { ip } from '../model/';
import { estilos } from '../styles/Estilos';

class Livro extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			...this.props.route.params,
			avaliacoes: [],
			comentario: "",
			nota: 0,
		};
	}

	componentDidMount(){
		const {navigation} = this.props;
		this.carregarAvaliacoes();
		this.unsubscribeFocus = navigation.addListener("focus", () => {
			this.carregarAvaliacoes()
		});
	}

	componentWillUnmount() {
		if(this.unsubscribeFocus) {
			this.unsubscribeFocus();
		}
	}

	async adicionarLista(){
		const {LID} = this.state.livro;
		const {UID} = this.state.usuario;
		console.log(this.state);
		try{
			const res = await fetch(`http://${ip}/add_lista`,{
				method:"POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ UID, LID }),
			});
			const data = await res.json();
			if(data.success)
					Alert.alert("Sucesso","Livro Adicionado a lista");
			else
				Alert.alert("Erro", data.mensagem);
		}catch(err){
			Alert.alert("Erro ao conectar com o banco de dados",err);
		}
	}

	async carregarAvaliacoes(){
		const {LID} = this.state.livro;
		try{
			const res = await fetch(`http://${ip}/avaliacoes`,{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({LID}),
			});
			const data = await res.json();
			this.setState({avaliacoes: data.result});
		} catch(err){
			Alert.alert("Erro ao conectar com o banco de dados",err);
		}
		
	}
	
	async comentar(){
		const {LID} = this.state.livro;
		const {UID} = this.state.usuario;
		const {comentario, nota} = this.state;
		if(comentario == "" || nota == 0) return;
		try{
			const res = await fetch(`http://${ip}/comentar`,{
				method:"POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({LID, UID, comentario, nota}),
			});
			const data = await res.json();
			if(data.success){
				Alert.alert("Sucesso","Comentario enviado");
				this.setState({comentario:"",nota:0});
				this.carregarAvaliacoes();
			}
			else
				Alert.alert("Erro", data.mensagem);
		} catch(err){
			Alert.alert("erro ao conectar com o banco de dados",err);
		}
	}

	async reservar(){
		const {LID} = this.state.livro;
		const {UID} = this.state.usuario;
		try{
			const res = await fetch(`http://${ip}/reservar`,{
				method:"POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({LID, UID}),
			});
			const data = await res.json();
			if(data.success){
					Alert.alert("Sucesso","Livro Reservado");
			}
			else
				Alert.alert("Erro", data.mensagem);
		} catch(err){
			Alert.alert("erro ao conectar com o banco de dados",err);
		}
	}

	render() {
		const nota = [1,2,3,4,5];
		return (
			<View style={estilos.container}>
				<Text style={estilos.titulo}> {this.state.livro.nome} </Text>
				<View>
					<Text style={estilos.texto}> {"Autor: " + this.state.livro.autor} </Text>
					<Text style={estilos.texto}> {"Genero: " + this.state.livro.genero} </Text>
					<Text style={estilos.texto}> {"Avalição: " + this.state.livro.nota} </Text>
				</View>
				<Text style={estilos.texto}> {"Descricao:"} </Text>
				<Text style={estilos.texto}> {this.state.livro.descricao} </Text>

				<Pressable
					style={estilos.botao}
					onPress={()=>this.adicionarLista()}
				>
					<Text style={estilos.texto}> Adicionar a Lista </Text>
				</Pressable>
				<Pressable
					style={estilos.botao}	
					onPress={() => this.reservar()}
				>
					<Text style={estilos.texto}> {"Reservar"} </Text>
				</Pressable>	
					
				<ScrollView style={estilos.scroll} >
					<Text style={estilos.titulo}> Comentarios </Text>
					<View style={estilos.scroll_item}>
						<View style={estilos.inline}>
							<TextInput
								multiline
								style={estilos.comentario}
								value={this.state.comentario}
								onChangeText={(comentario)=>{this.setState({comentario})}}
							/>
						</View>
						<View style={estilos.inline}>
							{nota.map((o)=>{
								return (
									<TouchableOpacity
										style={[estilos.botao,this.state.nota >= o ? estilos.selecionado : estilos.nao_selecionado]}
										key={o}
										onPress={()=>this.setState({nota:o})}
									>
										<Text style={estilos.texto}> {o} </Text>
									</TouchableOpacity>
								)
							})}
							<Pressable
								style={estilos.botao}
								onPress={()=>this.comentar()}
							>
								<Text style={estilos.texto}> {"Comentar"} </Text>
							</Pressable>
						</View>
					</View>
					{this.state.avaliacoes.map((comentario,index) => (
						<View style={estilos.scroll_item} key={index}>
							<Text style={estilos.texto} > {comentario.usuario + " nota: " + comentario.nota} </Text>
							<Text style={estilos.texto} > {comentario.descricao} </Text>
						</View>
					))}
				</ScrollView>
			</View>
		);
	}
}

export default Livro;
