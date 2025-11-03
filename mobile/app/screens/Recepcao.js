import React from "react";
import { View, Text, TextInput, Button, Alert, TouchableOpacity, StyleSheet, ScrollView, Pressable} from "react-native";
import { ip } from '../model/';
import { estilos } from "../styles/RecepcaoStyles";

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
			<View style={estilos.container}>
				<View style={estilos.inline}>
					{op.map((o) => {
						const selecionado = this.state.opcao;
						return (
							<TouchableOpacity
								style={[estilos.botao2,this.state.opcao === o ? estilos.selecionado : estilos.nao_selecionado]}
								key={o}
								onPress={()=>this.setState({opcao:o})}
								activeOpacity={0.7}
							>
								<Text style={estilos.texto2}> {o} </Text>
							</TouchableOpacity>	
						);
					})}
				</View>
				<View style={estilos.box}>
				<Text style={estilos.titulo}>{this.state.opcao == "Emprestar" ? "Empréstimo" : "Devolução"}</Text>
				<View style={estilos.linha}/>
					<View style={estilos.inline2}>
						<TextInput
							style={estilos.input}
							value={this.state.UID}
							onChangeText={(UID) => this.setState({ UID })}
							placeholder="ID do Usuário" 
							placeholderTextColor="gray" 
						/>
					</View>

					<View style={estilos.inline2}>
						<TextInput
							style={estilos.input}
							value={this.state.FID}
							onChangeText={(FID) => this.setState({ FID })}
							placeholder="ID do Livro Físico" 
							placeholderTextColor="gray" 
						/>
					</View>

					<TouchableOpacity
						style={estilos.botao}
						onPress={() =>{this.state.opcao == "Emprestar" ? this.emprestar() : this.devolver()}}
						activeOpacity={0.7}
					>
						<Text style={estilos.texto3}>
							{this.state.opcao == "Emprestar" ? "Emprestar" : "Devolver"}
						</Text>
						
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

export default Recepcao;
