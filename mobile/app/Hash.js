export const hash = (senha) => {
	let hash = 1;
	const mod = 1000000000000000000000;
	for (let i = 0; i < senha.length; i++) {
		hash = (hash + senha.charCodeAt(i) * 1283173) % mod;
	}
	return hash.toString();
};
