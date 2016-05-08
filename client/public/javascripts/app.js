$(document).ready(function(e) {
  $.ajax('/api/v1/todos').done(rebuild_to_be_done);
	$('#add-todo').button({
		icons: { primary: "ui-icon-circle-plus" }}).click(
			function() {
				$('#task').val('');
				$('#new-todo').dialog('open');
			});

  function rebuild_to_be_done(data){
    console.log(data)
    $('#todo-list').empty();
    $('#completed-list').empty();
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
	$('#new-todo').dialog({
		modal : true, autoOpen : false,
		buttons : {
			"Add task" : function () {
        $.ajax({'url':'/api/v1/todos', 'type':'put', 'data':{'text':$('#task').val()}}).success(rebuild_to_be_done);
        $(this).dialog('close');
			},
			"Cancel" : function () { $(this).dialog('close'); }
		}
	});
	$('#todo-list').on('click', '.done', function() {
		var $taskItem = $(this).parent('li');
		$.ajax({'url':'/api/v1/todos/' + $taskItem.attr('todo_id'), 'type':'post', 'data':{'complete':true, 'text':$taskItem.attr('text')}}).success(rebuild_to_be_done);
	});

  /*
  $.ajax({
    'url':'/api/v1/todos/' + $taskItem.attr('todo_id'),
    'type':'post',
    'data':{
      'complete':true,
      'text':$taskItem.attr('text')}
    })
    .success(rebuild_to_be_done);
*/
	$('#todo-list').sortable({
		connectWith : $('#completed-list').sortable(),
		cursor : 'pointer',
		placeholder : 'ui-state-highlight',
		cancel : '.delete,.done'
	});
	var conf;

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

  $('#todo-list').on('sortreceive',function(event,ui) {
    var $taskItem = ui.item;
    $.ajax({'url':'/api/v1/todos', 'type':'put', 'data':{'text':$('#task').val()}}).success(rebuild_to_be_done);
  })

	$('#todo-list').on('click','.delete',function() {
		$('#confirm').dialog('open');
		conf = $(this);

	});

	$('#completed-list').on('click','.delete',function() {
		$('#confirm').dialog('open');
		conf = $(this);
	});

	$('#confirm').dialog({
		modal : true, autoOpen : false,
		buttons : {
			"Yes" : function () {
        $.ajax({'url':'/api/v1/todos/' + conf.attr('todo_id'), 'type':'delete'}).success(rebuild_to_be_done);
        $(this).dialog('close');
			},
			"No" : function () {
				$(this).dialog('close');
			}
		}
	});
});
