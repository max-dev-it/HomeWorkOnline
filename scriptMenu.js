const menuItems = document.querySelectorAll('.menu-lessons-item');

    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const lessonNumber = this.getAttribute('data-lesson');
            window.location.href = `index.html?lessonNumber=${lessonNumber}&main=true`;
        });
    });