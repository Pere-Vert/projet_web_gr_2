
									//Ce simulateur effectue un vrai calcul d'alcoolémie théorique à titre indicatif :)



let btn = document.getElementById('btn'); 
btn.addEventListener('click', function(e){  //Quand le bouton sera clicker, les instruction ci-dessous seront effectuées
	
	


	let p ;
	let input;
	let label ;
	let i = 1;
	let nbVerres = document.getElementById("verre").value; //récuparation du nombre de verre indiqué par l'utilisateur
	while(i < parseInt(nbVerres)+1){ /*la boucle while permet que pour chaque verre indiqué, un nouveau label et 
										l'input associé ainsi que leurs attributs*/
		p = document.createElement('p')
		input = document.createElement('input'); 
		label = document.createElement('label');
		input.setAttribute('type', 'number');
		input.setAttribute('id', 'time'+i);
		input.setAttribute('class', 'time');
		input.setAttribute('min', '0');
		input.setAttribute('placeholder', "ex: 45");
		label.setAttribute('for', 'time'+i);
		label.innerHTML = 'A combien de temps remonte votre verre n° ' + i + ' ? (en min)';
		p.appendChild(label);
		p.appendChild(input);
		document.form.insertBefore(p, document.getElementById('action'));
		i++;
	}



	let calculer = document.getElementById('calcul');
	calculer.addEventListener('click', function(e){
		e.preventDefault();
		let prenom = document.getElementById("prenom").value;
		let poids = document.getElementById("poids").value;
		let nbVerres = document.getElementById("verre").value;
		let probatoire = document.getElementsByName('probatoire');
		let genre = document.getElementsByName('sexe');
		let i = 1;
		let stockRes = [];
		let getTime;
		let allTime = [];
		let tauxAlcool = 0 ;
		let indice = 0;
		

		


		while(i < parseInt(nbVerres) + 1){
			getTime = document.getElementById('time' + i).value;   //pour chaque verre bû, la variable getTime permet de récupèrer l'intervale entre les différents verres
			allTime.push(getTime); 								   // allTime est un tableau qui stocke chaque information récupérer par getTime
			i++;
		};
		
		
		
		//le calcul de l'alcoolémie est différent en fonction du sexe
		if(document.getElementById('masculin').checked){
			while(indice < allTime.length){
				stockRes.push(alcoolémie(parseInt(poids), 0.7, 0.125, allTime[indice])) //stockRes est un tableau qui stock le résultat du calcul d'alcoolémie après chaque verre
				indice++;
			}
		}else if (document.getElementById('feminin').checked) {
			while(indice < allTime.length){
				stockRes.push(alcoolémie(parseInt(poids), 0.6, 0.0925, allTime[indice]))
				indice++;
			};
		};



		
		while(stockRes.length != 0){  //cette boucle while permet d'additioner toutes les valeurs de stockRes 
			tauxAlcool = tauxAlcool + stockRes.pop(); 
		};
		
		tauxAlcool = arrondir(tauxAlcool);
	
		script(tauxAlcool, prenom );


	});




});




// La fonction alcoolémie permet le calcul du taux d'alcoolémie après un verre
function alcoolémie( poids, coeffElimination, tauxElimination, temps){

	let tauxAlcool = 0;
	let elimAlcool;
	
	
	tauxAlcool = tauxAlcool + 10 / (poids * coeffElimination);	
	elimAlcool = (tauxElimination/60) * temps;
	tauxAlcool = tauxAlcool - elimAlcool;
	if (tauxAlcool<0) {
		tauxAlcool = 0;
	};
	return tauxAlcool;
}




//La fonction arrondir permet d'arrondir un nombre décimal car il n'existe pas de fonction prédéfinie le permettant à notre connaissance
function arrondir(nombreDécimale){
	nombreDécimale = Math.round(nombreDécimale*100)/100;
	return nombreDécimale;
}







//C'est la fonction qui donne à l'utilisateur son résultat
function script(tauxAlcool, prenom ){
	let p = document.createElement('p')
	if(tauxAlcool < 0.5 && tauxAlcool > 0.2){

		if (document.getElementById('notProbatoire').checked) {
			p.innerHTML =  prenom + ", votre taux d'alcool est estimé à environ " + arrondir(tauxAlcool) 
		+ " g/L de sang, soit " + arrondir(tauxAlcool)/2 + " mg/L d'air expiré. En théorie, vous pouvez conduire.";
		}

		else if (document.getElementById('probatoire').checked) {
			p.innerHTML =  prenom + ", votre taux d'alcool est estimé à environ " + arrondir(tauxAlcool) 
		+ " g/L de sang, soit " + arrondir(tauxAlcool)/2 + " mg/L d'air expiré. En théorie, vous ne devez pas conduire.";
		}
	}

	else if (tauxAlcool > 0.5) {
		p.innerHTML =  prenom + ", votre taux d'alcool est estimé à environ " + arrondir(tauxAlcool) 
		+ " g/L de sang, soit " + arrondir(tauxAlcool)/2 + " mg/L d'air expiré. En théorie, vous ne devez pas conduire.";
	}

	else if (tauxAlcool < 0.2) {
		p.innerHTML =  prenom + ", votre taux d'alcool est estimé à environ " + arrondir(tauxAlcool) 
		+ " g/L de sang, soit " + arrondir(tauxAlcool)/2 + " mg/L d'air expiré. En théorie, vous pouvez conduire.";
	}
	document.form.appendChild(p)
}
















