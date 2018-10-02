const user_input_submit = document.querySelector(".user-name input[type='submit']");
const user_input_submit2 = document.querySelector(".user-weight input#next");
const user_input_weight = document.querySelector(".user-weight input[type='number']");
const user_input_name = document.querySelector(".user-name input[type='text']");
const user_input_back = document.querySelector(".inputs-group #back");
const inputs = document.querySelector(".inputs-group");
const user_name = document.querySelectorAll(".u_name");

function setName(name){
	const name_user = name;
	user_name.forEach( name => {
		name.innerHTML = name_user;
	});
	return name_user;
}
	
function nextStepEnterName(e){
	const key = e.which || e.keyCode;
	if(this.value == '' && key === 13){
		e.preventDefault();
		alert("Please, tell me your name :)");
	} 
	else if(this.value !== '' && key === 13){
		e.preventDefault();
		setName(this.value);
		nextStep();
	}
}

function nextStepButtonName(e){
	user_input_name.value ? nextStep() : false;
	setName(user_input_name.value);
	e.preventDefault();
}

function nextStepEnterWeight(e){
	const key = e.which || e.keyCode;
	if(this.value == '' && key === 13){
		e.preventDefault();
		alert("Please, tell me your weight");
	} 
	else if(this.value !== '' && key === 13){
		e.preventDefault();
		showApp(user_input_weight);
	}
}

function nextStepButtonWeight(e){
	user_input_weight.value ? showApp(user_input_weight) : false;
	e.preventDefault();
}

function showApp(weight){
	document.querySelector(".left").classList.add('expand');
	const u_weight = weight.value;
	handleWeight(u_weight);
	return u_weight;
}

function nextStep(){
	inputs.classList.add("next-step");
}

function previousStep(e){
	e.preventDefault();
	inputs.classList.remove("next-step");
}


user_input_submit.addEventListener("click", nextStepButtonName);
user_input_name.addEventListener("keypress", nextStepEnterName);
user_input_back.addEventListener("click", previousStep);

user_input_submit2.addEventListener("click", nextStepButtonWeight);
user_input_weight.addEventListener("keypress", nextStepEnterWeight);

