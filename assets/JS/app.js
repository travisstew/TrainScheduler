  var fire = firebase.database();

  $('#submit').on('click', function(e){
    e.preventDefault();
    var name = $('#name').val().trim();
    var dest = $('#destination').val().trim();
    var firstTrain = $('#first-train').val().trim();
    var frequency = $('#frequency').val().trim();


    fire.ref().push({
      Name: name,
      Destination: dest,
      First_Train: firstTrain,
      Frequency: frequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP

      });
    });

fire.ref().on('child_added', function(e){
  
  var startTime = e.val().First_Train;
   var freq = parseInt(e.val().Frequency);
   var timeNow = moment();
  console.log(freq);
  console.log(startTime);
  
  
   var diffInTime = moment(startTime,"hh:mm ").diff(timeNow,'m');
   var freqTimeDiff;
   var trainNewTime;
   var minsBeforeTrain;
   console.log(diffInTime);

   //if the diffInTime is positive , (it means the start time is ahead of the current time)
   if(diffInTime > 0){
     freqTimeDiff = diffInTime / freq;
    var c = Math.floor(freqTimeDiff);
    var d = c * freq;
    console.log(moment(startTime,"hh:mm").subtract(d,'m').format('LT'));
     trainNewTime = moment(startTime,"hh:mm").subtract(d,'m');
   }else{
     freqTimeDiff = diffInTime / freq;
     var c = Math.floor(freqTimeDiff);
     var d = (c * freq) * -1;
     console.log(c);
     console.log(moment(startTime,"hh:mm").add(d,'m').format('LT'));
     trainNewTime =  moment(startTime,"hh:mm").add(d,'m');    
   }
 
   minsBeforeTrain =  trainNewTime.diff(moment(),'m');
    
  var tr = $('<tr>');
  var td1 = $('<td>');
  var td2 = $('<td>');
  var td3 = $('<td>');
  var td4 = $('<td>');
  var td5 = $('<td>');

   td1.html(e.val().Name);
   td2.html(e.val().Destination);
   td3.html(e.val().Frequency);  
   td4.html(trainNewTime.format("LT"));
   td5.html(minsBeforeTrain);

      tr.append(td1,td2,td3,td4,td5)
   $('tbody').append(tr)


   console.log( e.val().First_Train );

   console.log(moment(e.val().First_Train,"hh:mm"));
   console.log( parseInt(e.val().Frequency));

  });