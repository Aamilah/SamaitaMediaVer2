document.addEventListener('scroll', function () {
    const paths = [
        document.getElementById('timelinePath1'),
        document.getElementById('timelinePath2'),
        document.getElementById('timelinePath3'),
        document.getElementById('timelinePath4'),
        document.getElementById('timelinePath5')
    ];

    const circles = [
        document.getElementById('scrollCircle1'),
        document.getElementById('scrollCircle2'),
        document.getElementById('scrollCircle3'),
        document.getElementById('scrollCircle4'),
        document.getElementById('scrollCircle5')
    ];

    const serviceItems = document.querySelectorAll('.services-item-1');

    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;
    const scrollPercentage = scrollPosition / totalHeight;

    paths.forEach((path, index) => {
        const pathLength = path.getTotalLength();
        const point = path.getPointAtLength(scrollPercentage * pathLength);
        circles[index].setAttribute('cx', point.x);
        circles[index].setAttribute('cy', point.y);

        const serviceItem = serviceItems[index];
        const background = serviceItem.querySelector('.image-background');
        const image = serviceItem.querySelector('.services-item-icon img');

        
        const itemTop = serviceItem.offsetTop; 
        const itemHeight = serviceItem.offsetHeight; 

        // Check if at least half the service item is visible
        const isHalfVisible = scrollPosition + window.innerHeight >= itemTop + itemHeight / 2;

        if (isHalfVisible) {
            image.classList.add('active');
            background.classList.add('active'); 
        } else {
            image.classList.remove('active');
            background.classList.remove('active'); 
        }
    });
});

const textPath = document.querySelector('textPath');
let offset = 0;

function animateText() {
    offset = (offset + 0.2) % 100;
    textPath.setAttribute('startOffset', `${offset}%`);
    requestAnimationFrame(animateText); 
}

animateText();

