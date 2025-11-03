import React from "react";
import { View, Text, TextInput, Button, ScrollView, Alert, StyleSheet} from "react-native";
import { ip } from "../model/";
import { estilos } from "../styles/HistoricoStyles";

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
			<View style={estilos.container}>
				<ScrollView style={estilos.scroll}>
					<Text style={estilos.titulo}> Histórico </Text>
					<View style={estilos.linha}/>

					{/* <View style={estilos.scroll_item}>
							<View style={{flexDirection: "row"}}>
								<Text style={estilos.texto2} > {"livro nomenome"} </Text>
								<Text style={estilos.texto} > {"(" + "livro.autor" + ")"} </Text> Eu testei por aqui, n coloquei nada no historico pra ver se ia!!
							</View>
							<View style={estilos.linha2}/>
							<View style={{flexDirection: "row"}}>
								<Text style={estilos.texto} > {"Emprestimo: "} </Text>
								<Text style={estilos.texto3}>{"1/4/4/43"}</Text>
							</View>
							<View style={{flexDirection: "row"}}>
								<Text style={estilos.texto} > {"Prazo: "} </Text>
								<Text style={estilos.texto3}>{"12/12/4/12"}</Text>
							</View>
							<View style={{flexDirection: "row"}}>
								<Text style={estilos.texto} > {"Devoliucao: "} </Text>
								<Text style={estilos.texto3}>{"blablabla"}</Text>
							</View>
					</View> */}
					{this.state.historico.map((livro,index)=>(
						<View style={estilos.scroll_item} key={index}>
							<View style={{flexDirection: "row"}}>
								<Text style={estilos.texto} > {livro.nome} </Text>
								<Text style={estilos.texto} > {"(" + livro.autor + ")"} </Text>
							</View>
							<View style={estilos.linha2}/>
							<View style={{flexDirection: "row"}}>
								<Text style={estilos.texto} > {"Empréstimo: "} </Text>
								<Text style={estilos.texto3}>{new Date(livro.Emprestimo).toLocaleDateString('pt-BR')}</Text>
							</View>
							<View style={{flexDirection: "row"}}>
								<Text style={estilos.texto} > {"Prazo: "} </Text>
								<Text style={estilos.texto3} > {new Date(livro.Prazo).toLocaleDateString('pt-BR')} </Text>
							</View>
							<View style={{flexDirection: "row"}}>
								<Text style={estilos.texto} > {"Devolução: "} </Text>
								<Text style={estilos.texto3} > {
								( new Date(livro.Devolucao).toLocaleDateString('pt-BR') === '31/12/1999' ?
									"Não foi devolvido ainda" :
									new Date(livro.Devolucao).toLocaleDateString('pt-BR') )
								}</Text>
							</View>
						</View>
					))}
				</ScrollView>
			</View>	
		);
	}
}

export default Historico;
