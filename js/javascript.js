$(document).ready(function(){
    $('#search').click(function(){
        var test = $('#json').val();
        $.get('search.php?json='+test,function(data){
             $('#result').html(data);
        });
    });
    
      $('#create').click(function(){
        var test = $('#json').val();
        $.get('create.php?json='+test,function(data){
             $('#result').html(data);
        });
    });
    
     $('#update').click(function(){
        var test = $('#json').val();
        $.get('update.php?json='+test,function(data){
             $('#result').html(data);
        });
    });
    
     $('#delete').click(function(){
        var test = $('#json').val();
        $.get('delete.php?json='+test,function(data){
             $('#result').html(data);
        });
    });
    
});
