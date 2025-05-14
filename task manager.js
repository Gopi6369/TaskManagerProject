$(document).ready(function() {
    // Load tasks from localStorage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            $('#tasklist').append(`
                <li>
                    <span class="tasktext ${task.completed ? 'completed' : ''}">${task.text}</span>
                    <span class="editbutton">edit</span>
                    <span class="removebutton">remove</span>
                </li>
            `);
        });
    };

    // Save tasks to localStorage
    const saveTasks = () => {
        const tasks = [];
        $('#tasklist li').each(function() {
            const taskText = $(this).find('.tasktext').text();
            const isCompleted = $(this).find('.tasktext').hasClass('completed');
            tasks.push({ text: taskText, completed: isCompleted });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Add task to the list
    $('#addtask').click(function() {
        const task = $('#taskinput').val().trim();
        if (task) {
            $('#tasklist').append(`<li><span class="tasktext">${task}</span>
                <span class="editbutton">edit</span>
                <span class="removebutton">remove</span></li>`);
            $('#taskinput').val(''); // Clear input field
            saveTasks(); // Save updated tasks to localStorage
        }
    });

    // Allow adding task with Enter key
    $('#taskinput').keypress(function(e) {
        if (e.which === 13) { // Enter key
            $('#addtask').click();
        }
    });

    // // Highlight input field on focus
    // $('#taskinput').focus(function() {
    //     $(this).addClass('highlight');
    // });

    // // Remove highlight input field on blur
    // $('#taskinput').blur(function() {
    //     $(this).removeClass('highlight');
    // });

    // // Mark task as completed
    // $('#tasklist').on('click', '.tasktext', function() {
    //     $(this).toggleClass('completed');
    //     saveTasks(); // Update the task state in localStorage
    // });

    // Remove task from the list
    $('#tasklist').on('click', '.removebutton', function() {
        $(this).parent().remove();
        saveTasks(); // Save updated tasks to localStorage
    });

    // Edit task text
    $('#tasklist').on('click', '.editbutton', function() {
        const $tasktext = $(this).siblings('.tasktext');
        const currenttext = $tasktext.text();
        const newtext = prompt('Edit task:', currenttext);
        if (newtext) {
            $tasktext.text(newtext);
            saveTasks(); // Save updated tasks to localStorage
        }
    });

    // Mouseenter effect for task text
    $('#tasklist').on('mouseenter', '.tasktext', function() {
        $(this).css('cursor', 'pointer');
    });

    // Initial load of tasks
    loadTasks();
});
