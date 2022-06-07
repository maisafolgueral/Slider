const previousEl = document.getElementById('previous');
const nextEl = document.getElementById('next');
const sliderEl = document.getElementById('slider');
let interval = undefined;
let timeout = undefined;
let selectedImIndex = 0;

previousEl.addEventListener('click', onPreviousClick)
nextEl.addEventListener('click', onNextClick)

autoScroll();

function onPreviousClick() {
    const sliderWidth = sliderEl.offsetWidth;
    sliderEl.scrollLeft -= sliderWidth;
    --selectedImIndex;
    handleActiveDot()
    handleSliderClick();
}

function onNextClick() {
    const sliderWidth = sliderEl.offsetWidth;
    sliderEl.scrollLeft += sliderWidth;
    ++selectedImIndex;
    handleActiveDot()
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

function handleActiveDot() {
    const list = Array.from(document.getElementsByClassName('dot'));

    if(selectedImIndex < 0) selectedImIndex = 0;
    if(selectedImIndex > list.length) selectedImIndex = list.length - 1;

    list.forEach(el => el.classList.remove('active'));
    list[selectedImIndex].classList.add('active');
}

function autoScroll() {
    if(interval) return;

    interval = setInterval( () => {
        const sliderWidth = sliderEl.offsetWidth;
        const numberOfImages = sliderEl.childElementCount;
        const selectedImage = (sliderEl.scrollLeft/sliderWidth) + 1;

        if(numberOfImages === selectedImage) {
            sliderEl.scrollLeft = 0;
            selectedImIndex = 0;
            handleActiveDot()
            return;
        }

        sliderEl.scrollLeft += sliderWidth;
        ++selectedImIndex;
        handleActiveDot()
    }, 5000);
}

