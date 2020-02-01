
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

$.getJSON("checklist.json", function(data){
	var $tocRegions = [];
	// for each region (eg. Kokiri Forest or Goron City)
	$.each(data.categories, function(entryIndex, entry){
		//create new table
		var $card = $( "<div class='card'></div>" );
		var $table = $("<div class='card-body'></div>");
		$card.append($table);
		//fetch and print the tables heading
		var $heading = $( "<h2></h2>" ).html( this.category );
		$heading.append ( $( "<a name='" + this.category + "'/>" ));
		//print table header row
		$table.append( $("\
					<div class='row'> \
						<div class='col '> \
							<div class='header'>Challenge</div> \
						</div> \
						<div class='col'> \
							<div class='header'>Notes</div> \
						</div> \
						<div class='col'> \
							<div class='header'>Complete</div> \
						</div> \
					</div>")
				);
		
		$tocRegions.push(this.category);
		
		//for each skulltula 'eg. 1 or 2'
		$.each(this.challenges, function() {
			var $line = $( "<div class='row'></div>" );
			$line.append( $( "<div class='col'><div class='skullName'>" + this.name + "</div></div>"));
			$line.append( $( "<div class='col'><div class='skullDesc'>" + this.desc + "</div></div>"));
			$line.append ( $("<div class='col'><div class='skullCheck'><button type='button' id='checkbox_" + this.name + "' name='checkbox_" + this.name + "' class='czechbox btn-floating btn-large waves-effect waves-light btn btn-light' onclick='ToggleCheckbox(this)');><i class='material-icons'>done</i></a></div></div>"));
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
	$.each($tocRegions, function(i, val ) {
		$ ("<li><a class='' href='#" + val + "'>" + val + "</a></li>" ).appendTo(".toc");
	});
});
