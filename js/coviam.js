var boxAreadyOpenedId = "";
var colorDisplayed = "";
var Counter = 0;
var colorFoundTotal = 0;
var positivePoints = 0;
var negativePoints = 0;
var numberOfClicks = 0;
var Source = "#boxContainer";
var colorCodeArray = ["OLIVE","TEAL","PURPLE","NAVY","AQUA","MAROON","SILVER ","LIME"];



/**
* This section is used to populate the entire grid with initial
* background color of white 
*
* A hidden attribute (originalColor) is also populated with contains the 
* specified color which is retrieved later.
 */


$(function() {


for (var x = 1; x < 3 ; x++) {
  $.each(colorCodeArray, function(i, val) {
    $(Source).append("<div id=box" + x + i + " style='background-color:#FFF;margin:5px;' originalColor ='"+val+"'>");
  });
}
  $(Source + " div").click(startGame);
  shuffleColorCodeBlocks();
});






/**
*  This API is used to return a unique value which is required to splice the 
* required element from colorArrayNew and put in for display
*/
function randomFunction(MaxValue, MinValue) {
    return Math.round(Math.random() * (MaxValue - MinValue) + MinValue);
  }


/**
* This Api is used to do the shuffling of the obtained division
*
*/
function shuffleColorCodeBlocks() {
  var colorContainer = $(Source).children();
  var colorBoxDivContainer = $(Source + " div:first-child");
  var colorArrayNew = new Array();

  for (var i = 0; i < colorContainer.length; i++) {
    colorArrayNew[i] = $("#" + colorBoxDivContainer.attr("id")).attr("originalColor");
    colorBoxDivContainer = colorBoxDivContainer.next();
  }
  
    colorBoxDivContainer = $(Source + " div:first-child");
  
  for (var j = 0; j < colorContainer.length; j++) {
  var randomNumber = randomFunction(0, colorArrayNew.length - 1);

    $("#" + colorBoxDivContainer.attr("id")).attr("originalColor", colorArrayNew[randomNumber]);
    colorArrayNew.splice(randomNumber, 1);
    colorBoxDivContainer = colorBoxDivContainer.next();
  }
}


/*************************************************************  Color Display Logic Section   ******************************************************/


/**
* The idea is to set the specified id and the color of the box in the
* variables boxAreadyOpened and colorDisplayed respectively on first click on a box to obtain at a later point of time.
*
*
* Again on second click we fetch the corresponding id and color of the box 
* and do the comparision of the current and the previous values which was set global scope.
*
*
*/



function startGame() {

  var totalScore;
  var id = $(this).attr("id");
  var originalColor = $(this).attr("originalColor");

    $('#' + id).css('background',originalColor);
    $(Source + " div").unbind("click", startGame);
    $("#" + id).slideDown('fast');


    if (colorDisplayed == "")

     {
            boxAreadyOpenedId = id;
            colorDisplayed = $(this).attr("originalColor");
            setTimeout(function() {
              $(Source + " div").bind("click", startGame)
            }, 300);
      } 
      else 
     {

            latestColorDisplayed = $(this).attr("originalColor");

            if ((colorDisplayed == latestColorDisplayed) && (id !== boxAreadyOpenedId))
            {

              setTimeout(function() {
                 $("#" + id).css("visibility", "hidden");
                 $("#" + boxAreadyOpenedId ).css("visibility", "hidden");
                boxAreadyOpenedId = "";
                colorDisplayed = "";
               
                }, 400);

               positivePoints++;
               colorFoundTotal++;

            } 
            else 

            {

               setTimeout(function() {
                $("#" + id).css('background','#FFF');
                $("#" + boxAreadyOpenedId ).css('background','#FFF');
                boxAreadyOpenedId = "";
                colorDisplayed = "";
              }, 400);

              negativePoints++;
              numberOfClicks++;
              console.log(numberOfClicks);
            }
            
            setTimeout(function() {
              $(Source + " div").bind("click", startGame)
            }, 400);
            $("#displayScoreSection").empty();
              totalScore = totalScoreCalc(positivePoints,negativePoints)
            $("#displayScoreSection").prepend('<span id="score" style=""> Score - '+ totalScore +' </span>');
    }






    if (colorFoundTotal == colorCodeArray.length) 
    {
     //deduct score for two invalid try
      var scoreToBeDeducted = Math.floor(numberOfClicks*2);
      totalScore = totalScore - scoreToBeDeducted;
      $('#label').hide();
      
      $("#displayScoreSection").empty();
        $("#displayClickSection").empty();
      $("#scoreSection").hide();

      $("#refreshMsgSec").show();
      $("#refreshMsgSec").prepend('<span id="display:block;">Refresh To Start Again </span>');
      $("#displayFinalScore").css('display','block');
      $("#warning").css('display','none');
      $("#displayFinalScore").append('<span id=""> TOTAL SCORE "'+ totalScore +'" </span>');
     
    }


}

/*************************************************** End Of Color Display Logic Section   ******************************************************/

  




    /**
    *
    * This function is used to calculate the total score 
    * based on the total number of match
    * a 10 points is given for every correct match
    * 
    */

    function totalScoreCalc(positivePoints,negativePoints)
    {
  
      var totalScore=(positivePoints*10);
      return totalScore;
    }

