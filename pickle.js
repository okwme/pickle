var maxResults = 5;

var	allLoaded = 0;
var	totalLoaded = 7;

var doingStuff = false;
  function doStuff() {
    if (doingStuff) {
      $('.iosSlider').iosSlider('update');
      setTimeout(doStuff, 2000);
    }
  }

function buildSlider(callback){
	//console.log("build");
	var slider = $("<div>").addClass("iosSliderWrapper").append(
		$("<div>").addClass("iosSlider").append(
			$("<div>").addClass("slider")
			)
		);
  var hideSlider = "<div id='hideSlider'>✖</div>";
  var sliderNext = "<div id='sliderNext' class='sliderNav'>></div>";
  var sliderPrev = "<div id='sliderPrev' class='sliderNav'><</div>";

  $(slider).appendTo("body");
  $('body').append(hideSlider);
  //$('body').append(sliderNext);
 // $('body').append(sliderPrev);

  if(typeof(callback) == "function"){
  	  callback();
  }
  imageCounter = 0;
}

function killSlider(callback) {
	allLoaded = 0;
 	$('.iosSlider').iosSlider("destroy").remove();
	$("<div>").addClass("iosSliderWrapper").append(
		$("<div>").addClass("iosSlider").append(
			$("<div>").addClass("slider")
			)
	).appendTo("body");
 	//console.log("destroy");
	if(typeof(callback) == "function"){
		callback();
	}

}


$(document).ready(function(){


  $(document).on("click", "#hideSlider", null, function(){
    $('.iosSliderWrapper').slideUp('fast');
    $('#hideSlider').hide();
    $('.sliderNav').hide();
    killSlider();
  });

  $(document).on("click", "#sliderNext", null, function(){
    $('.iosSlider').iosSlider('goToNextSlide');
  });

  $(document).on("click", "#sliderPrev", null, function(){
    $('.iosSlider').iosSlider('goToPrevSlide');
  });

  $('<img>').on('load', function() {
    $(".iosSlider").iosSlider("update");
  });

  buildSlider();
  
});

var imageCounter = 0;

function convertToSlideText(jsonArray, callback) {
	$(jsonArray).each(function(){
		jsonItem = $(this);
		service = jsonItem[0].service;
		url = jsonItem[0].url;
		image = jsonItem[0].image;

		//if (imageCounter == 0) {
		if (false) {
		var newSlide = '<div class="slide"><img src="'+image+'" alt="'+service+'" class="active-image" /></div>';
		}
		else {
		var newSlide = '<div class="slide"><img src="'+image+'" alt="'+service+'" /><br><a target="_blank" href="'+url+'">'+service+'</a></div>';
		}

		//$('.iosSlider').iosSlider('addSlide', newSlide);
		$(".slider").append(newSlide);
		imageCounter++;
	});
	if(typeof(callback)=="function"){
		callback();
	}
}

function checkLoaded(){
	//console.log(allLoaded);
	//console.log(totalLoaded);
	if(allLoaded == totalLoaded){
		  $('.iosSlider').iosSlider({
		  		snapToChildren: true,
				//scrollbar: false,
				scrollbarHide: true,
				desktopClickDrag: true,
				keyboardControls: true,
				tabToAdvance:true,
				responsiveSlideContainer:true,
				autoSlide:false,
				infiniteSlider:true
		  });
    $('#hideSlider').show();
    $('.sliderNav').show();
		$(".iosSliderWrapper").fadeIn();

		$.doTimeout(2000, function(){
			$(".iosSlider").iosSlider("update");
		});
		$.doTimeout(5000, function(){
			$(".iosSlider").iosSlider("update");
		});

	}
}

function findall(query){
  //var target = document.getElementById('spinner');
  //target.appendChild(spinner.el);

  killSlider(function(){
	  $('#hideSlider').text('✖ "'+query+'"');

		findGoogle(query, function(results){
		      convertToSlideText(results, function(){
				allLoaded++;
				checkLoaded();
				//console.log("update google");
		      });
		});
		findFotolia(query, function(results){
			convertToSlideText(results, function(){
				allLoaded++;
				checkLoaded();
				//console.log("update fotolia");
			})
		});
		findLoop(query, function(results){
			convertToSlideText(results, function(){
				allLoaded++;
				checkLoaded();
				//console.log("update loop");
			})
		});
		find500(query, function(results){
			convertToSlideText(results, function(){
				allLoaded++;
				checkLoaded();
				//console.log("update 500");
			})
		});
		findEyeEm(query, function(results){
			convertToSlideText(results, function(){
				allLoaded++;
				checkLoaded();
				//console.log("update eyeem");
			})
		});

    findInstagram(query, function(results){
        convertToSlideText(results, function(){
  			allLoaded++;
  			checkLoaded();
  			//console.log("update instagram");
        });

    });
  	findFlickr(query, function(results){
  	 
  	});

    findSoundCloud(query, function(results){
      //console.log(results);
    });
  });
}

function findGoogle(query, callback){
	var url = "https://www.googleapis.com/customsearch/v1?key=AIzaSyCkuKITHdAGKtydC02DSgGsqc9s0F81QL4&cx=016061208938817205122%3A7v5khqob-ky&q="+query+"&fileType=jpg&searchType=image&imgSize=medium&alt=json"
	$.ajax({
		type: "GET",
		url: url,
		error:function(){
      callback();
    },
    success: function(results){
			arrayOfPhotos = [];
			$(results.items).each(function(i){
				if(i>maxResults) return false;
				var photo = $(this)[0];
				arrayOfPhotos.push({service:'google',url:photo.image.contextLink, image:photo.link});
			});
			if(typeof(callback) == "function"){
				callback(arrayOfPhotos);
			}
		},
		error:function(){
			callback();
		}
	});
}
function findFotolia(query, callback){
		var url = "https://bfqhWOjaxItRIuapuXZcfZr7SeQISJgt@api.fotolia.com/Rest/1/search/getSearchResults?search_parameters%5Bwords%5d="+query;

	$.ajax({
		type: "GET",
		url: url,
		success: function(results){
			arrayOfPhotos = [];
			//results = results[0];

			if(typeof(results[0]) != "undefined"){
				arrayOfPhotos.push({service:'fotolia',image:results[0].thumbnail_400_url, url:results[0].affiliation_link});
			}			
			if(typeof(results[1]) != "undefined"){
				arrayOfPhotos.push({service:'fotolia',image:results[1].thumbnail_400_url, url:results[1].affiliation_link});
			}			
			if(typeof(results[2]) != "undefined"){
				arrayOfPhotos.push({service:'fotolia',image:results[2].thumbnail_400_url, url:results[2].affiliation_link});
			}
/*
			$(results[0]).each(function(i){
				if(i>maxResults) return false;
				var photo = results[i];
				console.log(photo);
				arrayOfPhotos.push({service:'fotolia',image:photo.thumbnail_400_width, url:photo.affiliation_link});
			});*/
			if(typeof(callback) == "function"){
				callback(arrayOfPhotos);
			}
		},
		error:function(){
			callback();
		}
	});

}
function findLoop(query, callback){
	var url = "https://api.loopc.am/v1/loops/search?q="+query;
	$.ajax({
		type: "GET",
		url: url,
		error:function(){
      callback();
    },
    success: function(results){
			arrayOfPhotos = [];
			$(results).each(function(i){
				if(i>maxResults) return false;
				var photo = $(this)[0];
				arrayOfPhotos.push({service:'loopcam',image:photo.file_url, url:"http://loopc.am/"+photo.user.username});
			});
			if(typeof(callback) == "function"){
				callback(arrayOfPhotos);
			}
		},
		error:function(){
			callback();
		}
	});
}
function find500(query, callback){
var url = "https://api.500px.com/v1/photos/search?term="+query+"&consumer_key=lXJzl12N1z76bFhSfA1c0FrkOHP61uWChL8VTqtv"
	$.ajax({
		type: "GET",
		url: url,
		error:function(){
      callback();
    },
    success: function(results){
			arrayOfPhotos = [];
			$(results.photos).each(function(i){
				if(i>maxResults) return false;
				var photo = $(this)[0];
				photo.image_url = photo.image_url.replace("/2.jpg", "/3.jpg");

				arrayOfPhotos.push({service:'fivehundred',image:photo.image_url, url:"http://500px.com/photo/"+photo.id});
			});
			if(typeof(callback) == "function"){
				callback(arrayOfPhotos);
			}
		},
		error:function(){
			callback();
		}
	});
}
function findEyeEm(query, callback){
	var url = "https://www.eyeem.com/api/v2/search?q="+query+"&includeAlbums=1&client_id=hjKhayyLeZBc3xQDHeXWZbqNTfviCFAj";
	$.ajax({
		type: "GET",
		url: url,
		error:function(){
      callback();
    },
    success: function(results){
			arrayOfPhotos = [];
			$(results.albums.items).each(function(i){
				if(i>maxResults) return false;
				var photo = $(this)[0];
				photo.thumbUrl = photo.thumbUrl.replace("sq/200/", "sq/280/");
				arrayOfPhotos.push({service:'eyeem',image:photo.thumbUrl, url:photo.webUrl});
			});
			if(typeof(callback) == "function"){
				callback(arrayOfPhotos);
			}
		},
		error:function(){
			callback();
		}
	});
}
function jsonFlickrApi(rsp){
	////console.log(rsp);
	if (rsp.stat != "ok"){
		//console.log("flickr error");
		// something broke!
		return;
	}
	arrayOfPhotos = [];
     // //console.log(toInt(results));

      $(rsp.photos.photo).each(function(i){
        if(i>maxResults) return false;
        var photo = $(this)[0];
        var photoUrl = "http://farm"+photo.farm+".staticflickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+".jpg";
       // //console.log(photoUrl);
        arrayOfPhotos.push({service:'flickr',image:photoUrl, url:"http://www.flickr.com/photos/peelsasleep/"+photo.id});
      });

	 convertToSlideText(arrayOfPhotos, function(){
  			allLoaded++;
  			checkLoaded();
  	  		//console.log("update flickr");
  	  });
}
	

function findFlickr(query, callback){
  var url="http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=87995aba0e38571d287a61f44516e8ae&format=json&text="+query+"&safe_search=0&per_page="+maxResults;


  $.ajax({
    type: "GET",
    url: url,
    error:function(){
      callback();
    },
    success: function(results){

    	callback(results);
      
	  },
	  error:function(){
	  	callback();
	  }
	});

}

function findInstagram(query, callback){
  var url="https://api.instagram.com/v1/tags/"+query+"/media/recent?access_token=260258430.f59def8.1b871f05a82f4d7a8ec51120bb035074";
  $.ajax({
    type: "GET",
    url: url,
    error:function(){
      callback();
    },
    success: function(results){
      arrayOfPhotos = [];
      $(results.data).each(function(i){
        if(i>maxResults) return false;
        var photo = $(this)[0];
        arrayOfPhotos.push({service:'instagram',image:photo.images.standard_resolution.url, url:photo.images.standard_resolution.url});
      });
      if(typeof(callback) == "function"){
        callback(arrayOfPhotos);
      }
    },
    error:function(){
    	callback();
    }
  });
}

function findSoundCloud(query, callback){
  SC.initialize({
    client_id: 'b1081b69fb45f9afe276b89ae47154f0'
  });

  scEmbeds = [];
  embedId = "";
  i = 0;

  SC.get('/tracks', { q: query, license: 'cc-by-sa' }, function(tracks) {
    $(tracks).each(function(){
      if (i>maxResults) return false;
      embedId = $(this)[0].id;
      embedUrl = embed = '<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F'+embedId+'&amp;color=ff6600&amp;auto_play=false&amp;show_artwork=true"></iframe>'; 
      scEmbeds.push({service: 'sc', embed:embedId})

      i++;
    });
  });
}

$(window).load(function(){
  doStuff();
});
