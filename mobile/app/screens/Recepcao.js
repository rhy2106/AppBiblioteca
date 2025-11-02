import React from "react";
import { View, Text, TextInput, Button, Alert, TouchableOpacity, StyleSheet, ScrollView, Pressable} from "react-native";
import { ip } from '../model/';
import { estilos } from "../styles/Estilos";

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
			Alert.alert("Erro", err.message);
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
			console.log(data);
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
			<View style={estilos.container}>
				<View style={estilos.inline}>
					{op.map((o) => {
						const selecionado = this.state.opcao;
						return (
							<TouchableOpacity
								style={[estilos.botao,this.state.opcao === o ? estilos.selecionado : estilos.nao_selecionado]}
								key={o}
								onPress={()=>this.setState({opcao:o})}
							>
								<Text style={estilos.texto}> {o} </Text>
							</TouchableOpacity>	
						);
					})}
				</View>

				<View style={estilos.inline}>
					<Text style={estilos.texto}>UID</Text>
					<TextInput
						style={estilos.input}
						value={this.state.UID}
						onChangeText={(UID) => this.setState({ UID })}
					/>
				</View>

				<View style={estilos.inline}>
					<Text style={estilos.texto}>FID</Text>
					<TextInput
						style={estilos.input}
						value={this.state.FID}
						onChangeText={(FID) => this.setState({ FID })}
					/>
				</View>

				<Pressable
					style={estilos.botao}
					onPress={() =>{this.state.opcao == "Emprestar" ? this.emprestar() : this.devolver()}}
				>
					<Text style={estilos.texto}>
						{this.state.opcao == "Emprestar" ? "Emprestar" : "Devolver"}
					</Text>
					
				</Pressable>
			</View>
		);
	}
}

export default Recepcao;
