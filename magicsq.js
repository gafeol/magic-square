function new_grid(){
	var t = new Array(3);
	for(var i = 0;i < 3;i++)
		t[i] = new Array(3);
	return t;
}

function check(t){
	var sum = 0;
	for(var j=0;j<3;j++){
		sum += t[0][j];
	}
	console.log("soma "+sum);
	for(var i=0;i<3;i++){
		var aux = 0;
		for(var j=0;j<3;j++){
			aux += t[i][j];
		}
		if(aux != sum){
			console.log("Error! sum expected "+sum+" but line "+i+" has sum "+aux);
			alert("This Square is Not Magic!");
			return "fail";
		}
	}
	for(var j=0;j<3;j++){
		var aux = 0;
		for(var i=0;i<3;i++){
			aux += t[i][j];
		}
		if(aux != sum){
			console.log("Error! sum expected "+sum+" but column "+i+" has sum "+aux);
			alert("This Square is Not Magic!");
			return "fail";
		}
	}

	var n = 3;
	var cnt = new Array(n*n + 1);
	for(var i=0;i<=n*n;i++)
		cnt[i] = 0;
	for(var i=0;i<n;i++){ 
		for(var j=0;j<n;j++){
			if(t[i][j] < 1 || t[i][j] > n*n){
				alert("Error! Number "+t[i][j]+" is out of the range 1 - "+n*n);
				return "fail";
			}
			cnt[t[i][j]]++;
		}
	}
	for(var i=1;i<=n*n;i++){
		if(cnt[i] != 1){
			alert("Error Numbers in the square are not unique");
			return 0;
		}
	}
	alert("Magic!");
}

function convert(input_grid) {
	var grid = new_grid();
	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 3;j++){
			grid[i][j] = Number(input_grid[i][j].value);
			console.log("i "+i+" j "+j+" "+grid[i][j]);
		}
	}
	console.log("converted");
	return grid;
}

function read(){
	var input_grid = new_grid();
	console.log("grid criado");
	for(var i=0;i<3;i++){
		for(var j=0;j<3;j++){	
			input_grid[i][j] = document.getElementById("cell-"+String(3*i+j));
		}
	}
	console.log("comecando a checagem");
	var t = convert(input_grid);
	check(t);
}

check_button = document.getElementById("check");
check_button.addEventListener("click", read);
