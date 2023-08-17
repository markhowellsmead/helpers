const blocks = document.querySelectorAll('.wp-block-video');

if (blocks.length) {
    blocks.forEach(block => {
        block.classList.add('is--activated');
        block.querySelector('video').removeAttribute('controls');
        block.querySelector('video').addEventListener('click', event => {
            event.target.closest('.wp-block-video').classList.add('is--playing');
            event.target.setAttribute('controls', 'true');

        if ((block.dataset.height || 0) > (block.dataset.width || 0)) {
            block.classList.add('is--vertical');

            const video = block.querySelector('video');
            video.setAttribute('class', 'wp-block-video__video--original');

            const video_clone = video.cloneNode(true);
            video_clone.setAttribute('class', 'wp-block-video__video--clone');
            block.appendChild(video_clone);

            const original = block.querySelector('.wp-block-video__video--original'),
                clone = block.querySelector('.wp-block-video__video--clone');

            // when original starts/stops playing, start/stop the clone too
            original.addEventListener('play', () => {
                clone.play();
            });

            original.addEventListener('pause', () => {
                clone.pause();
            });

            block.addEventListener('click', () => {
                original.play();
                original.setAttribute('controls', 'true');
            });
        }

        block.addEventListener('click', event => {
            event.currentTarget.classList.add('is--playing');
        });
    });
}
