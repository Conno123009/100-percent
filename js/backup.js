<script>
		$.getJSON("skulltulas.json", function(data){
			// for each region (eg. Kokiri Forest or Goron City)
			$.each(data.regions, function(entryIndex, entry){
				//create new table
				var $table = $( "<div class='card-panel green lighten-2'><table class='highlight'></table></div>" );
				//fetch and print the tables heading
				var $heading = $( "<h2></h2>" ).html( this.region );
				//print table header row
				$table.append( $("<tr><th>Gold Skulltula</th><th>Time</th><th>Age</th><th>Notes</th><th>Image</th><th>Check</th></tr>"));
				//for each skulltula 'eg. 1 or 2'
				$.each(this.skulltulas, function() {
					//create new table row
					var $line = $( "<tr></tr>" );
					//fetch image (full res)
					var $image = "images/Skulltula_" + this.number + ".jpg";
					//fetch image (preview)
					var $preview = "images/Skulltula_" + this.number + "s.jpg";
				
					//add new table items for number, time, etc.
					$line.append( $( "<td class='skullNumber'></td>" ).html( this.number ) );
					$line.append( $( "<td class='skullTime'></td>" ).html( this.time ) );
					$line.append( $( "<td class='skullAge'></td>" ).html( this.age ) );
					$line.append( $( "<td class='skullDesc'></td>" ).html( this.desc ) );
					//create preview image which, if clicked, shows full image		
					$line.append( $( "<td class='skullImg'><a data-featherlight='" + $image + "' href='#' ><img alt='None Available' src='" + $preview + "'/></a></td>" ) );			
					//add checkbox
					$line.append ( $("<td class='skullCheck'><input class='skullCheck' type='checkbox' name='" + this.number + "' id='checkbox" + this.number + "' /><label for='checkbox" + this.number +"'>Completed</label></td>" ) );
					//add it all to the table
					$table.append( $line );
				});
				//add the heading and table to the document
				$heading.appendTo(document.body);
				$table.appendTo(document.body);
			});
		});
	</script>
	
	
		<h2>Kokiri Forest</h2>
	<div class='card-panel green lighten-2'>
		<div class="row">
		  <div class="col s1">
			<div class="header">Golden Skulltula</div>
		  </div>
		  <div class="col s1">
			<div class="header">Time</div>
		  </div>
		  <div class="col s1">
		   <div class="header">Age</div>
		  </div>
		  <div class="col s6">
		   <div class="header">Notes</div>
		  </div>
		  <div class="col s2">
		   <div class="header">Image</div>
		  </div>
		  <div class="col s1">
		   <div class="header">Complete</div>
		  </div>
		</div>
		<div class="row">
		  <div class="col s1">
			<div class="skullNumber">1</div>
		  </div>
		  <div class="col s1">
			<div>Night</div>
		  </div>
		  <div class="col s1">
		   <div>Child</div>
		  </div>
		  <div class="col s6">
		   <div>A Gold Skulltula can be found on the back of the Know-It-All Brothers' house. Use your sword to kill it and then backflip or jump attack into the token.</div>
		  </div>
		  <div class="col s2">
		   <div class='skullImg'><a data-featherlight='images/Skulltula_1.jpg' href='#' ><img alt='None Available' src='images/Skulltula_1s.jpg'/></a></div>
		  </div>
		  <div class="col s1">
		   <div class='skullCheck'><input class='skullCheck' type='checkbox' name='1' id='checkbox' /><label for='checkbox'>Completed</label></td></div>
		  </div>
		</div>
	</div>
	

	
					/*$table.append( $("\
					<div class='row'> \
						<div class='col s1'> \
							<div class='header'>Golden Skulltula</div> \
						</div> \
						<div class='col s1'> \
							<div class='header'>Time</div> \
						</div> \
						<div class='col s1'> \
							<div class='header'>Age</div> \
						</div> \
						<div class='col s6'> \
							<div class='header'>Notes</div> \
						</div> \
						<div class='col s2'> \
							<div class='header'>Image</div> \
						</div> \
						<div class='col s1'> \
							<div class='header'>Complete</div> \
						</div> \
					</div>")
				);*/
	
	
	