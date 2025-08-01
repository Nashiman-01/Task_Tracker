       var taskInput = document.querySelector('.task-input');
        var addBtn = document.querySelector('.add');
        var select = document.querySelector('.select');
        var taskContainer = document.querySelector('.backgrnd');
        var clearCompletedBtn = document.querySelector('.completed');
        var spamSpans = document.querySelectorAll('.spam span');
        var filters = document.querySelectorAll('.filter button');

        var tasks = [];

        function updateCounts() {
            var total = tasks.length;
            var completedCount = 0;

            for (var i = 0; i < tasks.length; i++) {
                if (tasks[i].completed === true) {
                    completedCount = completedCount + 1;
                }
            }

            var pendingCount = total - completedCount;

            spamSpans[0].textContent = total;
            spamSpans[1].textContent = completedCount;
            spamSpans[2].textContent = pendingCount;
        }

        function createTaskElement(task) {
            var wrapper = document.createElement('div');
            wrapper.className = 'abc';

            var index = 0;
            for (var i = 0; i < tasks.length; i++) {
                if (tasks[i] === task) {
                    index = i;
                    break;
                }
            }

            wrapper.style.top = (350 + index * 80) + 'px';

            var label = document.createElement('label');
            label.className = 'ils';

            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;

            checkbox.addEventListener('change', function () {
                task.completed = checkbox.checked;
                if (task.completed) {
                    label.style.textDecoration = 'line-through';
                    label.style.color = '#999';
                } else {
                    label.style.textDecoration = 'none';
                    label.style.color = '#000';
                }
                updateCounts();
            });

            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(' ' + task.text));

            var priorityBtn = document.createElement('button');
            priorityBtn.className = 'def';
            priorityBtn.textContent = task.priority.toUpperCase();

            var time = document.createElement('p');
            time.className = 'ghi';
            time.textContent = task.time;

            var delBtn = document.createElement('button');
            delBtn.className = 'cde';
            delBtn.textContent = 'Delete';

            delBtn.addEventListener('click', function () {
                // Remove task from tasks array
                var newTasks = [];
                for (var i = 0; i < tasks.length; i++) {
                    if (tasks[i] !== task) {
                        newTasks.push(tasks[i]);
                    }
                }
                tasks = newTasks;

                renderTasks();
            });

            wrapper.appendChild(label);
            wrapper.appendChild(priorityBtn);
            wrapper.appendChild(time);
            wrapper.appendChild(delBtn);

            return wrapper;
        }

        function renderTasks(filter) {
            if (filter === undefined) {
                filter = 'All';
            }

            var existingTasks = document.querySelectorAll('.abc, .bcd');
            for (var i = 0; i < existingTasks.length; i++) {
                existingTasks[i].parentNode.removeChild(existingTasks[i]);
            }

            var positionY = 350;

            for (var i = 0; i < tasks.length; i++) {
                var task = tasks[i];
                var shouldDisplay = false;

                if (filter === 'All') {
                    shouldDisplay = true;
                } else if (filter === 'Completed' && task.completed === true) {
                    shouldDisplay = true;
                } else if (filter === 'Pending' && task.completed === false) {
                    shouldDisplay = true;
                } else if (task.priority.toLowerCase() === filter.toLowerCase()) {
                    shouldDisplay = true;
                }

                if (shouldDisplay) {
                    var taskElement = createTaskElement(task);
                    taskElement.style.top = positionY + 'px';
                    positionY = positionY + 80;
                    taskContainer.appendChild(taskElement);
                }
            }

            updateCounts();
        }

        function getCurrentTime() {
            var now = new Date();

            var hours = now.getHours();
            var ampm = 'AM';

            if (hours >= 12) {
                ampm = 'PM';
            }

            hours = hours % 12;
            if (hours === 0) {
                hours = 12;
            }

            var minutes = now.getMinutes();
            if (minutes < 10) {
                minutes = '0' + minutes;
            }

            return hours + ':' + minutes + ' ' + ampm;
        }

        addBtn.addEventListener('click', function () {
            var text = taskInput.value.trim();
            if (text === '') {
                return;
            }

            var newTask = {
                text: text,
                priority: select.value,
                time: getCurrentTime(),
                completed: false
            };

            tasks.push(newTask);

            taskInput.value = '';

            renderTasks();
        });

        clearCompletedBtn.addEventListener('click', function () {
            var newTasks = [];
            for (var i = 0; i < tasks.length; i++) {
                if (tasks[i].completed === false) {
                    newTasks.push(tasks[i]);
                }
            }
            tasks = newTasks;

            renderTasks();
        });

        for (var i = 0; i < filters.length; i++) {
            filters[i].addEventListener('click', function () {
                var filterText = this.textContent;
                renderTasks(filterText);
            });
        }

        window.addEventListener('DOMContentLoaded', function () {
            tasks = [
                {
                    text: 'Complete project presentation for client meeting',
                    priority: 'High',
                    time: '09:29 AM',
                    completed: false
                },
                {
                    text: "Finish the 'Daily Task Tracker' project today",
                    priority: 'High',
                    time: '09:29 AM',
                    completed: false
                }
            ];

            renderTasks();
        });