const previousEl = document.getElementById('previous');
const nextEl = document.getElementById('next');
const sliderEl = document.getElementById('slider');
let interval = undefined;
let timeout = undefined;

previousEl.addEventListener('click', onPreviousClick)
nextEl.addEventListener('click', onNextClick)

autoScroll();

function onPreviousClick() {
    const sliderWidth = sliderEl.offsetWidth;
    sliderEl.scrollLeft -= sliderWidth;
    handleSliderClick();
}

function onNextClick() {
    const sliderWidth = sliderEl.offsetWidth;
    sliderEl.scrollLeft += sliderWidth;
    handleSliderClick();
}

function handleSliderClick() {
    clearTimeout(timeout);
    clearInterval(interval);
    interval = undefined;
    timeout = setTimeout( () => {
        autoScroll();
    }, 30000);
}

function autoScroll() {
    if(interval) return;

    interval = setInterval( () => {
        const sliderWidth = sliderEl.offsetWidth;
        const numberOfImages = sliderEl.childElementCount;
        const selectedImage = (sliderEl.scrollLeft/sliderWidth) + 1;

        if(numberOfImages === selectedImage) {
            sliderEl.scrollLeft = 0;
            return;
        }

        sliderEl.scrollLeft += sliderWidth;
    }, 5000);
}

