$(document).ready(function(e) {
  $.ajax('/api/v1/todos').done(rebuild_to_be_done);
	$('#add-todo').button({
		icons: { primary: "ui-icon-circle-plus" }}).click(
			function() {
				$('#task').val('');
				$('#new-todo').dialog('open');
			});

  // Function to rebuild the elements on the page
  function rebuild_to_be_done(data){
    $('#todo-list').empty();
    $('#completed-list').empty();
    // loops throught data to rebuild the todo-list and or completed-list
    for(item in data){
      var taskName = data[item]["text"];
      var taskHTML = '<li todo_id=' + data[item]['id']+ ' text=' + data[item]["text"] +'><span class="done">%</span>';
      taskHTML += '<span class="delete" todo_id='+ data[item]['id'] +'>x</span>';
      taskHTML += '<span class="task"></span></li>';
      var $newTask = $(taskHTML);
      $newTask.find('.task').text(taskName);
      $newTask.hide();
      if (data[item]['complete'] == false){
        // todo item
        $('#todo-list').prepend($newTask);
        $newTask.show('clip',250).effect('highlight',1000);
      } else {
        // build complete items
        $('#completed-list').prepend($newTask);
        $newTask.show('clip',250).effect('highlight',1000);
      }
    }
  }

  /* Creates new todo with a ajax call which does a Put against the API,
   inserts the data into the database and rbuilds th page */
	$('#new-todo').dialog({
		modal : true, autoOpen : false,
		buttons : {
			"Add task" : function () {
        $.ajax({'url':'/api/v1/todos',
          'type':'put',
          'data':{'text':$('#task').val()}
        })
        .success(rebuild_to_be_done);
      $(this).dialog('close');
			},
			"Cancel" : function () { $(this).dialog('close'); }
		}
	});

  /* Moves a todo to the completed-list with a ajax call which does a Post against the API,
   updates the data in the database and rbuilds th page */
	$('#todo-list').on('click', '.done', function() {
		var $taskItem = $(this).parent('li');
		$.ajax({
      'url':'/api/v1/todos/' + $taskItem.attr('todo_id'),
      'type':'post',
      'data':{'complete':true, 'text':$taskItem.attr('text')}
    })
    .success(rebuild_to_be_done);
	});

  /* Creates a two sortable objects (todo-list and completed-list) and
  links them togther */
	$('#todo-list').sortable({
		connectWith : $('#completed-list').sortable(),
		cursor : 'pointer',
		placeholder : 'ui-state-highlight',
		cancel : '.delete,.done'
	});
	var conf;

  /* On recieval of a an object the completed-list will Post against the API,
   updates the data in the database and rbuilds th page  */
  $('#completed-list').on('sortreceive',function(event,ui) {
    var $taskItem = ui.item;
    $.ajax({
      'url':'/api/v1/todos/' + $taskItem.attr('todo_id'),
      'type':'post',
      'data':{
        'complete':true,
        'text':$taskItem.attr('text')}
      })
      .success(rebuild_to_be_done);
  })

  // Defines the delete method for todo-list
	$('#todo-list').on('click','.delete',function() {
		$('#confirm').dialog('open');
		conf = $(this);
	});

  // Defines the delete method for completed-list
	$('#completed-list').on('click','.delete',function() {
		$('#confirm').dialog('open');
		conf = $(this);
	});

  // confirmation diolog box of deletion from either completed-list or todo-list
	$('#confirm').dialog({
		modal : true, autoOpen : false,
		buttons : {
			"Yes" : function () {
        $.ajax({
          'url':'/api/v1/todos/' + conf.attr('todo_id'),
          'type':'delete'
        })
        .success(rebuild_to_be_done);
        $(this).dialog('close');
			},
			"No" : function () {
				$(this).dialog('close');
			}
		}
	});
});
