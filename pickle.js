
function buildSlider(callback){
	//console.log("build");
  var slider = $("<iframe>").addClass("leoiFrame");
  var hideSlider = "<div id='hideSlider'>✖</div>";
  $(slider).appendTo("body");
  $('body').append(hideSlider);
  if(typeof(callback) == "function"){
  	  callback();
  }
}
function killSlider(callback) {
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
function findall(query){
  killSlider(function(){
	  $('#hideSlider').text('✖ "'+query+'"').css("display", "block");
	  var url = "https://dict.leo.org/ende/?lang=en&search="+query;
	  $(".leoiFrame").attr("src", url).slideDown();
  });
}