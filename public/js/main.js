$(document).ready(function(){
  $('.delete-article').on('click', function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');

    $.ajax({
      type: 'DELETE',
      url: '/users/'+id,
      success: function (response){
        alert('Usuario eliminado');
        window.location.href='/';
      },
      error: function(err){
        console.error(err);
      }
    });
  });
});