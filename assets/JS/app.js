  var fire = firebase.database();
  var d = 1569210248676;
  var date = new Date();
  var timeNow = date.getTime();



  function toString(m){
    return moment(m).toString();
  }
  function toISO(m){
    return moment(m).toISOString();
  }


  $('#submit').on('click', function(e){
    e.preventDefault();
    var name = $('#name').val();
    var dest = $('#destination').val();
    var firstTrain = $('#first-train').val();
    var frequency = $('#frequency').val();
    

    fire.ref().push({
      Name: name,
      Destination: dest,
      First_Train: firstTrain,
      Frequency: frequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP

      });
    });

fire.ref().on('child_added', function(e){
  
  $('tbody').append(
    `<tr>
      <td>${e.val().Name}</td>
      <td>${e.val().Destination}</td>
      <td>${e.val().First_Train}</td>
      <td>${e.val().Frequency}</td>
      
    </tr>`

  );
  
  });