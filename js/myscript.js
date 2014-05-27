
//VARIABEL FOR Å SJEKKE STATSBORGERSKAP
var isForeign = false;

$(function(){
	$("#statsborgerInput").hide();

  $(".arrowWrapper").on('click', function(){  
      $(this).parent().find('.textWrapper').toggleClass('adjustHeight');
      if($(this).find('span').hasClass('glyphicon-chevron-up')){
          $(this).find('.glyphicon-chevron-up').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
      }
      else{
          $(this).find('.glyphicon-chevron-down').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up'); 
      }
  });/*ArrowWrapper click*/

  $("#is_foreign").on("click", function(){
  		if(!$(this).is(":checked")){
  			$("#statsborgerInput").hide();
      isForeign = false;
  		}
  		else{
  			$("#statsborgerInput").show();
      isForeign = true;
  		}
  });/*#statsborger*/

  //INTERAKTIVITET SLIDERE I FROM SKJEMA
  $('#amount').slider({
    formater: function(value) {
      return 'Current value: ' + value;
    }
  });
  $('#propertyvalue').slider({
    formater: function(value) {
      return 'Current value: ' + value;
    }
  });

  //SKJEMA VALIDERING
  $("#skjema").submit(function(e){
    e.preventDefault();
    validateForm();
  });

});

//SKJEMA / FORM VALIDERING
function validateForm(){
  var valid = true;
  var ssid = $("#ssid");
  var nationality = $("#nationality");
  var propertyvalue = $("#propertyvalue");
  var amount = $("#amount");

  var minRentAmount = 100000;
  var maxRentAmount = 10000000;
  var propValue = (propertyvalue.val().length > 0) ? parseInt(propertyvalue.val()) : 100000;
  var amountValue = (amount.val().length > 0) ? parseInt(amount.val()) : 100000;

  //Fødselsnummer
  if(ssid.val().length != 11){
    ssid.next().text("Feil i fødselsnummer");
    valid = false;
  }
  else{
    ssid.next().text("");
  }
  //Nationality
  if(isForeign && nationality.val().length < 4){
    nationality.next().text("Skriv inn fullstendig nasjonalitet");
    valid = false;
  }
  else{
    nationality.next().text("");
  }

  //Money amount
  if(propValue < amountValue){
    amount.parent().next().text("Du kan ikke låne mer enn boligens verdi");
    valid = false;
  }
  else if (propValue < minRentAmount || propValue > maxRentAmount || amountValue < minRentAmount || amountValue > maxRentAmount ){
    amount.parent().next().text("Ugyldig beløp");
    valid = false;
  }
  else{
    amount.parent().next().text("");
  }
  
  //IF VALID
  if(valid){
    sendFormWithAjax();
  }
}

function sendFormWithAjax(){
  alert("all is ok");
}