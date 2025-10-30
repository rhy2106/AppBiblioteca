import React from "react";
import { View, Text, TextInput, Button, ScrollView, Alert, Pressable} from "react-native";
import { ip } from "../model/";

class Fila extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			...this.props.route.params,
			livros_reservados: [],
			livros_emprestados: [],
		}
	}
	componentDidMount(){
		const {navigation} = this.props;
		this.reservados();
		this.emprestados();
		this.unsubscribeFocus = navigation.addListener("focus", () => {
			this.reservados();
			this.emprestados();
		});
	}
	componentWillUnmount() {
		if(this.unsubscribeFocus) {
			this.unsubscribeFocus();
		}
	}

	async reservados(){
		const {UID} = this.state.usuario;
		try{
			const res = await fetch(`http://${ip}/fila`,{
				method: "POST",
				headers: {"Content-Type":"application/json"},
				body:JSON.stringify({ UID }),
			});
			const { data } = await res.json();
			console.log(data);
			this.setState({ livros_reservados: data });
		}catch(err){
			Alert.alert("Erro ao connectar com o banco de dados");
		}
	}

	async emprestados(){
		const {UID} = this.state.usuario;
		try{
			const res = await fetch(`http://${ip}/emprestados`,{
				method: "POST",
				headers: {"Content-Type":"application/json"},
				body:JSON.stringify({ UID }),
			});
			const { data } = await res.json();
			console.log(data);
			this.setState({ livros_emprestados: data });
		}catch(err){
			Alert.alert("Erro ao connectar com o banco de dados");
		}
	}

	render(){
		return(
			<View>
				<ScrollView style={{ marginTop: 10 }}>
					<Text> Livros Reservados </Text>
					{this.state.livros_reservados.map((livro,index)=>(
						<View key={index}>
							<Text> {livro.nome} </Text>
							<Text> {livro.autor} </Text>
							<Text>
								{ livro.disponiveis >= livro.posicao ? "Disponivel" : "Indisponivel"}
							</Text>
						</View>
					))}
					<Text> Livros Emprestados </Text>
					{this.state.livros_emprestados.map((livro,index)=>(
						<View key={index}>
							<Text> {livro.nome} </Text>
							<Text> {livro.autor} </Text>
							<Text> {"Emprestimo: " + new Date(livro.Emprestimo).toLocaleDateString('pt-BR')} </Text>
							<Text> {"Prazo: " + new Date(livro.Prazo).toLocaleDateString('pt-BR')} </Text>
						</View>
					))}
				</ScrollView>
			</View>	
		);
	}
}

export default Fila;

