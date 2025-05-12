var position = 0;

$('#add-btn').click(function () {
    $('#first').fadeToggle("slow");

    const btn = document.getElementById('add-btn');
    const name = btn.textContent;

    if(name == 'Скрыть'){
        btn.textContent = 'Показать';    
    }else{
        btn.textContent = 'Скрыть';
    }
});

$('#modal').click(function(){
    var jthis = $(this);

    if (jthis.width() == 900) {
        $('#image').animate({'opacity': 0},400, function (){
            $('#image').css({
                'height': 0,
                'width': 0,
                'display': 'none'
            });
        });
        jthis
        .animate({
            'height': 100,
            'width': 100,
            'left': (window.innerWidth - 400) / 2
        },1000)
        .animate({
            'left':0
        },1000);

    } else {
        jthis
        .animate({'left': (window.innerWidth - 400) / 2},1000)
        .animate({
            'height': 400, 
            'width': 900,
            'left': (window.innerWidth - 400) / 3.5
        },1000, function() {
            $('#image').css({
                'height': 350,
                'width': 850
            });
            $('#image').animate({
                'opacity': 1,
            }, 1000);
            $('#image').css('display', 'block');
        });
    } 
});

$('#menu').click(function(e) {
    e.stopPropagation();
    toggleSidebar();
});

// Закрытие при клике на оверлей
$('.overlay').click(function() {
    toggleSidebar();
});

function toggleSidebar() {
    $('#sidebar').toggleClass('open');
    $('.overlay').fadeToggle(200);
    $('body').toggleClass('sidebar-open');
    
    if ($('#sidebar').hasClass('open')) {
        $('#sidebar').animate({'left': 0}, 200);
        $('.main-content').animate({'marginLeft': '250px'}, 200);
    } else {
        $('#sidebar').animate({'left': '-250px'}, 200);
        $('.main-content').animate({'marginLeft': 0}, 200);
    }
}