import React from "react";
import { View, Text, TextInput, Button, ScrollView, Alert, Pressable} from "react-native";
import { ip } from "../model/";

class Historico extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			...this.props.route.params,
			historico: [],
		}
		console.log(this.state);
	}
	componentDidMount(){
		const {navigation} = this.props;
		this.hist();
		this.unsubscribeFocus = navigation.addListener("focus", () => {
			this.hist()
		});
	}
	componentWillUnmount() {
		if(this.unsubscribeFocus) {
			this.unsubscribeFocus();
		}
	}

	async hist(){
		const {UID} = this.state.usuario;
		try{
			const res = await fetch(`http://${ip}/historico`,{
				method: "POST",
				headers: {"Content-Type":"application/json"},
				body:JSON.stringify({ UID }),
			});
			const { data } = await res.json();
			this.setState({ historico: data });
		}catch(err){
			Alert.alert("Erro ao connectar com o banco de dados");
		}
	}

	render(){
		return(
			<View>
				<ScrollView style={{ marginTop: 10 }}>
					<Text> Historico </Text>
					{this.state.historico.map((livro,index)=>(
						<View key={index}>
							<Text> {livro.nome} </Text>
							<Text> {livro.autor} </Text>
							<Text> {"Emprestimo: " + new Date(livro.Emprestimo).toLocaleDateString('pt-BR')} </Text>
							<Text> {"Prazo: " + new Date(livro.Prazo).toLocaleDateString('pt-BR')} </Text>
							<Text> {"Devolucao: " +
								( new Date(livro.Devolucao).toLocaleDateString('pt-BR') === '31/12/1999' ?
									"Não foi devolvido ainda" :
									new Date(livro.Devolucao).toLocaleDateString('pt-BR') )
							} </Text>
						</View>
					))}
				</ScrollView>
			</View>	
		);
	}
}

export default Historico;
