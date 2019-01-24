$(document).ready(function(){
    
    $.get("search.php?json=", function(result){
        document.getElementById("firstpage").disabled = true;
        document.getElementById("prevpage").disabled = true;
        buildtable(result);
    });
    
    function pagenav(page){
        var searchQuery = 'search.php?json={"id":"' + $('#json').val()+'","page":"'+ page + '","pagesize":"'+ $('#pagesize').val() + '"}';
       alert(searchQuery);
        $.get(searchQuery, function(result){
           buildtable(result);
       });
    };
    
    function buildtable(data){
    
        var a = jQuery.parseJSON(data);
        var row;
                
        $("#tbl").empty();
                
        row="<tr>";
        row+="<th>#</th>";
        row+="<th>ID</th>";
        row+="<th>First Name</th>";
        row+="<th>Last Name</th>";
        row+="<th>Position</th>";
        row+="</tr>";
        $("#tbl").append(row);
                                
        for(i=0;i<a.length;++i)
            {
                row="<tr>";
                row+="<td>"+a[i]['Num']+"</td>";
                row+="<td>"+a[i]['_id']["$oid"]+"</td>";
                row+="<td>"+a[i]['First Name']+"</td>";
                row+="<td>"+a[i]['Last Name']+"</td>";
                row+="<td>"+a[i]['Position']+"</td>";
                row+="</tr>";
                $("#tbl").append(row);
            }

    };        
            
    $('#json').keyup(function(){
        var searchQuery = 'search.php?json={"id":"' + $('#json').val()+'","page":"'+ $('#newIndex').val() + '","pagesize":"'+ $('#pagesize').val() + '"}';
       //alert(searchQuery);
       $.get(searchQuery, function(result){
           buildtable(result);
       });
    });  
            
    function search_table(value){
        $('#tbl tr:not(:first-child)').each(function(){
            var found = 'false';
            $(this).each(function(){
                if($(this).text().toLowerCase().indexOf(value.toLowerCase()) >= 0)
                    {
                        found='true';
                    }
            });

            if(found == 'true')
                {
                    $(this).show();
                }
            else{
                $(this).hide();
            }
        });
    };
        
    $("#subbtn").click(function(){
        //alert($("#firstname").val());
        var newUser = {};
        newUser["First Name"] = $("#firstname").val();
        newUser["Last Name"] = $("#lastname").val();
        newUser["Position"] = $("#position").val();
        alert(JSON.stringify(newUser));
        $.get("search.php?ID="+JSON.stringify(newUser), function(result){
            buildtable(result);
        });    
    });
    
    //click handler for first page
    $("#firstpage").click(function(){
       var page = $('#newindex').val();
        if(page == 0)
        {
            document.getElementById("lastpage").disabled = false;
            document.getElementById("nextpage").disabled = false;
        }
        else 
        {
            page = 0;
            $('#newindex').val(page);
            pagenav(page);
            document.getElementById("firstpage").disabled = true;
            document.getElementById("prevpage").disabled = true;
        }
    });
    
     //click handler for prev page    
     $("#prevpage").click(function(){
      var page = $('#newindex').val();
         page--;
         $('#newindex').val(page);
         document.getElementById("lastpage").disabled = false;
         document.getElementById("nextpage").disabled = false;
        
         if(page == 0)
         {                
             document.getElementById("prevpage").disabled = true;   
             document.getElementById("firstpage").disabled = true;
             pagenav(page);
             $('#newindex').val(page);
         }
         else
         {
             document.getElementById("lastpage").disabled = false;
             document.getElementById("nextpage").disabled = false; 
             pagenav(page);
             $('#newindex').val(page);             
         }
       });
    
     //click handler for next page
     $("#nextpage").click(function(){
         var page = $('#newindex').val();
         var pagesize = $('#pagesize').val();
         page++;
         
         document.getElementById("firstpage").disabled = false;
         document.getElementById("prevpage").disabled = false; 
         
         if(pagesize != i)
         {
             document.getElementById("lastpage").disabled = true;
             document.getElementById("nextpage").disabled = true; 
         }
         else
         {  
             pagenav(page);
             $('#newindex').val(page);
         }
    });
    
     $("#lastpage").click(function(){
         var page = $('#newindex').val();
         var pagesize = $('#pagesize').val();
         page = "last";
         pagenav(page);
         $('#newindex').val(page);
    });
    
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
