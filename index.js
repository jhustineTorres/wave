var tblUsers = document.getElementById('tbl_users_list');
  var databaseRef = firebase.database().ref('users/');
  
  databaseRef.once('value', function(snapshot){
    snapshot.forEach(function(childSnapshot){
      var childData = childSnapshot.val();

      var row = tblUsers.insertRow();
      cellName.appendChild(document.createTextNode(childData.name));
    });
  });
  
  databaseRef.on('child_added', function(snapshot) {
    var childData = snapshot.val();
    var row = tblUsers.insertRow();

    var cellName = row.insertCell(0);
    cellName.appendChild(document.createTextNode(childData.name));
  });
   
  function save_user(){
   var user_name = document.getElementById('user_name').value;
    firebase.database().ref().child('users').push({name: user_name});
  }
  ////////////////////////////////////////////////////////////////////
  var tblUsersg = document.getElementById('tbl_user_list_for_group');
  var databaseRefc = firebase.database().ref('users/');
  
  databaseRefc.once('value', function(snapshot){
    snapshot.forEach(function(childSnapshot){
      var childData = childSnapshot.val();

      var row = tblUsersb.insertRow();
      cellName.appendChild(document.createTextNode(childData.name));
    });
  });
  databaseRefc.on('child_added', function(snapshot) {
    var childData = snapshot.val();
    var row = tblUsersb.insertRow();

    var cellName = row.insertCell(0);
    cellName.appendChild(document.createTextNode(childData.name));
  });
   
  function save_user(){
   var user_name = document.getElementById('user_name').value;
    firebase.database().ref().child('users').push({name: user_name});
  }
  ////////////////////////////////////////////////////////////////////
$(".messages").animate({ scrollTop: $(document).height() }, "fast");
  var user_id;
  function newMessage() {
    
    message = $(".message-input input").val();
    if($.trim(message) == '') {
      return false;
    }
    writeUserData(message);
  };
  $('.submit').click(function() {
    newMessage();
  });
  $(window).on('keydown', function(e) {
    if (e.which == 13) {
      newMessage();
      return false;
    }
  });
  var id = ''
   var db_ref = firebase.database().ref().child('messages').child(id).child('conversation');
  db_ref.on('child_added', function (data) {
    var type;
    if(data.val().user_id == user_id){
      type="sent";
    }
    else{
      type="replies";
    }
    $('<li class="'+type+'"><p>' + data.val().message + '</p></li>').appendTo($('.messages ul'));
    $('.message-input input').val(null);
    $('.contact.active .preview').html('<span>You: </span>' + data.val().message);
      $(".messages").animate({ scrollTop: $(".messages")[0].scrollHeight }, 0);
  });
  function writeUserData(message) {
      db_ref.push({
          user_id: user_id,
          message: message
      });
  }
