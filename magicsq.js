function new_grid(){
	var t = new Array(3);
	for(var i = 0;i < 3;i++){
		t[i] = new Array(3);
		for(var j=0;j<3;j++){
			t[i][j] = -1;
		}
	}
	return t;
}

function check(t){

	var image = document.getElementById('image');
	var image2 = document.getElementById('image2');

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
			image.style.display = 'none';
			image2.style.display = 'block';
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
			image.style.display = 'none';
			image2.style.display = 'block';
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
				image.style.display = 'none';
				image2.style.display = 'block';
				alert("Error! Number "+t[i][j]+" is out of the range 1 - "+n*n);
				return "fail";
			}
			cnt[t[i][j]]++;
		}
	}
	for(var i=1;i<=n*n;i++){
		if(cnt[i] != 1){
			image.style.display = 'none';
			image2.style.display = 'block';
			alert("Error Numbers in the square are not unique");
			return 0;
		}
	}

	var aux = 0;
	for(var i=0;i<n;i++){
		aux += t[i][i];
	}
	if(aux != sum){
		image.style.display = 'none';
		image2.style.display = 'block';
		console.log("Error! sum expected "+sum+" but principal diagonal has sum "+aux);
		alert("This Square is Not Magic!");
		return "fail";
	}
	aux = 0;
	for(var i=0;i<n;i++){
		aux += t[i][n-i-1];
	}
	if(aux != sum){
		console.log("Error! sum expected "+sum+" but secondary diagonal has sum "+aux);
		image.style.display = 'none';
		image2.style.display = 'block';
		alert("This Square is Not Magic!");
		return "fail";
	}

	image.style.display = 'block';
	image2.style.display = 'none';
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

function solve(){
	var n = 3;
	if(n%2 == 0){
		alert("Solver not yet implemented for even tables");
		return 0;
	}

	var t = new_grid();
	for(var i=0;i<n;i++){
		for(var j=0;j<n;j++){
			t[i][j] = Number(-1);
		}
	}

	var i = 0, j =	Math.floor(n/2);
	var ni = i, nj = j;

	var cnt = 1;
	console.log("cell "+(n*i+j)+" "+(cnt-1));
	while(cnt <= n*n){
		if(t[ni][nj] != -1){
			ni = (i+1)%n;
			nj = j;
		}
		i = ni;
		j = nj;
		if(t[i][j] != -1){
			console.log("Overwriting cell "+i+" "+j+" with "+cnt);
		}
		t[i][j] = cnt;
		document.getElementById("cell-"+(n*i+j)).value = cnt++;
		console.log("i "+i+" j "+j+" cell "+(n*i+j)+" "+(cnt-1));
		ni = (i+n-1)%n;
		nj = (j+1)%n;

		//When the next number position is outside both a row and a column, place the number directly beneath the previous number.
		if(ni == n-1 && nj == 0){ 
			ni = i+1;
			nj = j;
		}
	}
	alert("Solved!");
	return 1;
}

check_button = document.getElementById("check");
check_button.addEventListener("click", read);
solve_button = document.getElementById("solve");
solve_button.addEventListener("click", solve);
