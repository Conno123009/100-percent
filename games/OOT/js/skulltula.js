$Any = $("<svg style='width:24px;height:24px' viewBox='0 0 24 24'><path fill='#000000' d='M3,12H7A5,5 0 0,1 12,7A5,5 0 0,1 17,12H21A1,1 0 0,1 22,13A1,1 0 0,1 21,14H3A1,1 0 0,1 2,13A1,1 0 0,1 3,12M5,16H19A1,1 0 0,1 20,17A1,1 0 0,1 19,18H5A1,1 0 0,1 4,17A1,1 0 0,1 5,16M17,20A1,1 0 0,1 18,21A1,1 0 0,1 17,22H7A1,1 0 0,1 6,21A1,1 0 0,1 7,20H17M15,12A3,3 0 0,0 12,9A3,3 0 0,0 9,12H15M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7Z' /></svg>");

$(".brand-logo").sideNav();

function ClearAll () {
	$('.czechbox').each(function(i, obj) {
		localStorage.removeItem(obj.id);
		SetDisabled(obj);
	});
}

function SelectAll () {
	$('.czechbox').each(function(i, obj) {
		localStorage.setItem(obj.id, 'true');
		SetActive(obj);
	});
}

//visually enable checkbox
function SetActive (obj) {
	obj.classList.remove('red');
	obj.classList.add('green');
}

//visually disable checkbox
function SetDisabled (obj) {
	obj.classList.remove('green');
	obj.classList.add('red');
}

function ToggleCheckbox (obj) {
	if (localStorage.getItem(obj.id) == 'false') {
		SetActive(obj);
		localStorage.setItem(obj.id, 'true');
	} else if (localStorage.getItem(obj.id) == 'true') {
		SetDisabled(obj);
		localStorage.setItem(obj.id, 'false');
	}
	
}

$.getJSON("skulltula.json", function(data){
	var $tocRegions = [];
	// for each region (eg. Kokiri Forest or Goron City)
	$.each(data.regions, function(entryIndex, entry){
		//create new table
		var $table = $( "<div class='card-panel " + this.color +  "'></div>" );
		//fetch and print the tables heading
		var $heading = $( "<h2></h2>" ).html( this.region );
		$heading.append ( $( "<a name='" + this.region + "'/>" ));
		//print table header row
		$table.append($("<div class='row'><div class='col s1'><div class='header'>Golden Skulltula</div></div><div class='col s1'><div class='header' style='text-align:center'>Time</div></div><div class='col s1'><div class='header' style='text-align:center'>Age</div></div><div class='col s6'><div class='header'>Notes</div></div><div class='col s2'><div class='header'>Image</div></div><div class='col s1'><div class='header'>Complete</div></div></div>"));
		
		$tocRegions.push(this.region);
		
		//for each skulltula 'eg. 1 or 2'
		$.each(this.skulltulas, function() {
			//create new table row
			var $line = $( "<div class='row'></div>" );
			
			//fetch image (full res)
			var $image;
			if (this.isPng) {
				$image = "images/Skulltula_" + this.number + ".png";
			} else {
				$image = "images/Skulltula_" + this.number + ".jpg";
			}
			//fetch image (preview)
			var $preview 
			if (this.isPng) {
				$preview = "images/Skulltula_" + this.number + "_small.png";
			} else {
				$preview = "images/Skulltula_" + this.number + "_small.jpg";
			}
			
			//add new table items for number, time, etc.
			if (this.number == 100 ) $line.append( $( "<div class='col s1'><div class='skullNumber100'>" + this.number + "</div></div>"));
			else $line.append( $( "<div class='col s1'><div class='skullNumber'>" + this.number + "</div></div>"));
			
			//create time and icon
			if (this.time == 'Any') { 
				$line.append( $( "<div class='col s1'><div class='skullTime'><img width='64px'src='images/weather-sunset.svg'/><br/>" + this.time + "</div></div>"));
			} else {
				$line.append( $( "<div class='col s1'><div class='skullTime'><img width='64px'src='images/moon.svg'/><br/>" + this.time + "</div></div>"));
			}
			//create age and icon
			if (this.age == 'Both') {
				$line.append( $( "<div class='col s1'><div class='skullAge'><img height='64px' src='images/hylian.png'/><br/>" + this.age + "</div></div>"));
			} else if (this.age == 'Child') {
				$line.append( $( "<div class='col s1'><div class='skullAge'><img height='64px' src='images/deku.png'/><br/>" + this.age + "</div></div>"));
			} else if (this.age == 'Adult') {
				$line.append( $( "<div class='col s1'><div class='skullAge'><img height='64px' src='images/mirror.png'/><br/>" + this.age + "</div></div>"));
			}
			//create description
			$line.append( $( "<div class='col s6'><div class='skullDesc'>" + this.desc + "</div></div>"));
			//create preview image which, if clicked, shows full image		
			$line.append( $( "<div class='col s2'><div class='skullImg'><a class='invis' data-featherlight='" + $image + "' href='#'><img alt='None Available' src='" + $preview + "'/></a></div></div>"));		
			//add checkbox
			$line.append ( $("<div class='col s1'><div class='skullCheck'><a id='checkbox_" + this.number + "' name='checkbox_" + this.number + "' class='czechbox btn-floating btn-large waves-effect waves-light red' onclick='ToggleCheckbox(this)');><i class='material-icons'>done</i></a></div></div>"));
			//add it all to the table
			$table.append( $line );
		});
		//add the heading and table to the document
		$heading.appendTo(".container");
		$table.appendTo(".container");
		
		//scan each checkbox and enable the necessary ones
		$('.czechbox').each(function(i, obj) {
			if (localStorage.getItem(obj.id) == 'true') {
				//found localstorage for this checkbox, enable it visually
				SetActive(obj);
			} else {
				// localstorage may or may not exist, so create it and set to false
				localStorage.setItem(obj.id, 'false');
				SetDisabled(obj);
			}
		});
		
	});
	//var $new = $( "<a></a>" );
	//var $new = $( "<ul class='collection'></ul>" );
	$.each($tocRegions, function(i, val ) {
		$ ("<li><a class='' href='#" + val + "'>" + val + "</a></li>" ).appendTo(".toc");
		//$new.append ($ ("<li class='' href='#" + val + "'>" + val + "</li>" ));
	});
	//$new.appendTo(".toc");
});
