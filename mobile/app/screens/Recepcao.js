import React from "react";
import { View, Text, TextInput, Button, Alert, TouchableOpacity, StyleSheet, ScrollView, Pressable} from "react-native";
import { ip } from '../model/';

class Recepcao extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			...this.props.route.params,
			resultados: [],
			opcao: "Emprestar",
			UID: "",
			FID: "",
		};
	}

	async emprestar(){
		const {UID, FID} = this.state;
		if(!UID || !FID) return;
		try{
			const res = await fetch(`http://${ip}/emprestar`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ UID, FID }),
			});
			const data = await res.json();
			if(data.success){
				Alert.alert("Sucesso", "Livro emprestado");
			} else
				Alert.alert("Erro", data.mensagem);
		} catch(err){
			Alert.alert("Erro", "Não foi possível conectar ao servidor");
		}
	}

	async devolver(){
		const {UID, FID} = this.state;
		if(!UID || !FID) return;
		try{
			const res = await fetch(`http://${ip}/devolver`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ UID, FID }),
			});
			const data = await res.json();
			if(data.success){
				Alert.alert("Sucesso", data.mensagem);
			}else
				Alert.alert("Erro", data.mensagem);
		} catch(err){
			Alert.alert("Erro", "Não foi possível conectar ao servidor");
		}
	}

	render() {
		const op = ["Emprestar","Devolver"]
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
				<Text>UID</Text>
				<TextInput
					value={this.state.UID}
					onChangeText={(UID) => this.setState({ UID })}
				/>
				<Text>FID</Text>
				<TextInput
					value={this.state.FID}
					onChangeText={(FID) => this.setState({ FID })}
				/>
				<Button
					title={this.state.opcao == "Emprestar" ? "Emprestar" : "Devolver"}
					onPress={() =>{this.state.opcao == "Emprestar" ? this.emprestar() : this.devolver()}}
				/>
				
				<ScrollView>
					{this.state.resultados.map((livro,id)=>(
						<View key={id}>
							<Text> livro.nome </Text>
							<Text> livro.autor </Text>
							<Text> 
								{ livro.disponiveis >= livro.posicao ? "Disponivel" : "Indisponivel"}
							</Text>
						
						</View>	
					))}
				</ScrollView>
			</View>
		);
	}
}

export default Recepcao;
