// declare var
const button = document.querySelector('button');
const user_request = document.querySelector("#user-request");
const user_percent = document.querySelector("#user-percent");
const weight_input = document.querySelector('.user-weight input[type="number"]');
const bootles = document.querySelectorAll(".water-bottles input[type='checkbox']");
const waves = document.querySelectorAll(".wave1, .wave2");
const wave_percent = document.querySelector(".wave-percent");


// how much water user need in ml
let request_water;
// how many percent of daily water request user did 
let percent = 0;
// set interval for counter global
let timer;



// calculate how much water person need based on his weight
function handleWeight(w){
	//reset 
	bootles.forEach( bottle => { bottle.checked = false; });
	user_percent.innerHTML = "0 %";
	percent = 0;
	waves.forEach( wave => {
		wave.style.top = "50%";
	});
	wave_percent.innerHTML = "0 %";
	// get user weight
	const user_weight = w;
	// convert string (weight) to number
	const weight_input = parseInt(user_weight);
	//  multiply weight with 30ml for 1kg
	const needed_water = weight_input * 30;
	// convert needed water in ml to liters and round it
	const user_request_water = (needed_water / 1000).toFixed(1);
	// show needed water in html tag if user enter second number of weight
	user_request.innerHTML = user_request_water + " L";
	// inicialize and return how much water user need during the day 
	request_water = needed_water;
	return needed_water;
}

// add bottle of water
function addBottle(e){
	// get value of added water
	const bottle = e.target.value;
	// calculate percent of daily request
	const percent_of_all = parseInt(((bottle / request_water) * 100).toFixed(1));
	// started position for counter
	let before_percent = percent;
	// check if checked
	if(e.target.checked){
		// add to global request of water
		percent+=percent_of_all;
		// if get max
		if(percent >= 100) {
			// animation
			waves.forEach( wave => {
				wave.style.top = -52 + "%";
			});
		}
		// add counter
		clearInterval(timer);
		animateValueIncrease("wave-percent", before_percent, percent, 5000);
	} 
	// if unchecked
	else if(!e.target.checked){
		// check if there is there anything to subtract from
		if(percent){
			// remove from global request of water
			percent-=percent_of_all;
			// add counter
			clearInterval(timer);
			animateValueDecrease("wave-percent", before_percent, percent, 5000);
		}
	}
	user_percent.innerHTML = percent;
	// animation
	waves.forEach( wave => {
		wave.style.top = (50 - percent);
	});
}	


// counter animation
function animateValueDecrease(id, start, end, duration) {
    var range = end - start;
    var current = start;
    var increment = end > start? 1 : -1;
    var stepTime = Math.abs(Math.floor(duration / range));
    var obj = document.querySelector('.'+id);
    timer = setInterval(function() {
        current += increment;
        obj.innerHTML = current + " %";
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}

function animateValueIncrease(id, start, end, duration) {
    var range = end - start;
    var current = start;
    var increment = end > start? -1 : 1;
    var stepTime = Math.abs(Math.floor(duration / range));
    var obj = document.querySelector('.'+id);
    timer = setInterval(function() {
        current -= increment;
        obj.innerHTML = current + " %";
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}
// animateValue("value", 100, 25, 5000);



// water animation
waves.forEach( wave => {
	wave.style.top = "50%";
});


//attach events
//weight_input.addEventListener("keyup", handleWeight);
bootles.forEach( bottle => {
	addEventListener("change", addBottle);
});

