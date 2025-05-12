loadTasks();
    
$('#task-form').on('submit', function(e) {
    e.preventDefault();
    const taskText = $('#task-input').val().trim();
    if (taskText) {
        if(taskText.length > 100){
            $('#error').css({
                'display': 'block',
                'opacity': 1
            })
        }else{
            addTask(taskText, false);
            $('#task-input').val('');
            saveTasks();
        }
    }
});
    
$('#sort-select').on('change', filterTasks);
    
$('#task-list')
    .on('change', '.task-checkbox', function() {
        $(this).closest('.task-item').toggleClass('completed');
        saveTasks();
    })
    .on('click', '.delete-btn', function() {
        $(this).closest('.task-item').remove();
        saveTasks();
    });
    
function addTask(text, completed, save = true) {
    const taskItem = $(
        `<li class="task-item ${completed ? 'completed' : ''}">
            <input type="checkbox" class="task-checkbox" ${completed ? 'checked' : ''}>
            <span class="task-text">${text}</span>
            <button class="delete-btn">Удалить</button>
        </li>`
    );
        
    $('#task-list').append(taskItem);
    if (save) filterTasks();
}
    
function saveTasks() {
    const tasks = [];
    $('.task-item').each(function() {
        tasks.push({
            text: $(this).find('.task-text').text(),
            completed: $(this).hasClass('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    filterTasks();
}
    
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        JSON.parse(savedTasks).forEach(function(task) {
            addTask(task.text, task.completed, false);
        });
    }
    filterTasks();
}
    
function filterTasks() {
    const filter = $('#sort-select').val();
    $('.task-item').each(function() {
        const isCompleted = $(this).hasClass('completed');
        $(this).css('display', 
            filter === 'all' ? 'flex' :
            filter === 'active' && !isCompleted ? 'flex' :
            filter === 'completed' && isCompleted ? 'flex' : 'none'
        );
    });
}