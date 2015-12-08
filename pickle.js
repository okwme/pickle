var maxResults = 5;

var	allLoaded = 0;
var	totalLoaded = 7;


function buildSlider(callback){
	//console.log("build");
var slider = $("<iframe>").addClass("leoiFrame");
  var hideSlider = "<div id='hideSlider'>✖</div>";
 

  $(slider).appendTo("body");
  $('body').append(hideSlider);
  //$('body').append(sliderNext);
 // $('body').append(sliderPrev);

  if(typeof(callback) == "function"){
  	  callback();
  }
}

function killSlider(callback) {
	allLoaded = 0;
 	$('.leoiFrame').remove();
	$("#hideSlider").remove();
	buildSlider(function(){
		if(typeof(callback) == "function"){
			callback();
		}	
	})
 	//console.log("destroy");


}


$(document).ready(function(){


  $(document).on("click", "#hideSlider", null, function(){
    $('#hideSlider').hide();
    $('.leoiFrame').slideUp('slow', function(){
	    killSlider();
    });

  });


  buildSlider();
  
});

var imageCounter = 0;


function findall(query){
  //var target = document.getElementById('spinner');
  //target.appendChild(spinner.el);

  killSlider(function(){
	  $('#hideSlider').text('✖ "'+query+'"').css("display", "block");
	  var url = "https://dict.leo.org/ende/?lang=en&search="+query;
	  $(".leoiFrame").attr("src", url).slideDown();

  });
}

/*
function findLeo(query, callback){
var url = "https://dict.leo.org/ende/?lang=en&search="+query;
callback(url);

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
}*/


