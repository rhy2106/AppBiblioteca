import React from "react";
import { View, Text, TextInput, Button, Alert, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { hash } from "../Model/Hash.js";
import { IP } from "../Model/Ip.js";

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
		this.carregarAvaliacoes();
	}

	async carregarAvaliacoes(){
		const {LID} = this.state.livro;
		try{
			const res = await fetch(`http://${IP}/avaliacoes`,{
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
			const res = await fetch(`http://${IP}/comentar`,{
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
	}

	render() {
		const nota = [1,2,3,4,5];
		return (
			<View>
				<Text> {this.state.livro.nome} </Text>
				<Text> {this.state.livro.autor} </Text>
				<Text> {this.state.livro.genero} </Text>
				<Text> {this.state.livro.descricao} </Text>
				<Button title="Reservar" onPress={() => this.reservar()} />
				<ScrollView>
					<View>
						<Text> Comentarios </Text>
						<TextInput value={this.state.comentario} onChangeText={(comentario)=>{this.setState({comentario})}}/>
						{nota.map((o)=>{
							return (
								<TouchableOpacity
									key={o}
									onPress={()=>this.setState({nota:o})}
								>
									<Text> {o} </Text>
								</TouchableOpacity>
							)
						})}
						<Button title={"Comentar"} onPress={()=>this.comentar()}/>

					</View>
					{this.state.avaliacoes.map((comentario,index) => (
						<View key={index}>
							<Text> {comentario.usuario + " nota: " + comentario.nota} </Text>
							<Text> {comentario.descricao} </Text>
						</View>
					))}
				</ScrollView>
			</View>
		);
	}
}

export default Livro;
