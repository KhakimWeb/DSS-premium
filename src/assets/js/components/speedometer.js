const speedometer = document.querySelector('.speedometer');
const headerHeight = document.querySelector('header').clientHeight;

if (speedometer) {
    const speedometerImg = speedometer.querySelector('.speedometer__img');
    const speedometerSpeed = speedometer.querySelector('.speedometer__num');
    const speedometerValues = speedometer.querySelectorAll('.speedometer__text');
    const speedometerTrigger = document.querySelector('#speedometer__trigger');

    let scrollIsDisabled = false;
    let functionIsPaused = false;
    let currentStep = 0;
    let touchStartY = 0;

    customRootMargin = (window.innerWidth < 767) ? '0px 0px -50% 0px' : '0px 0px -90% 0px';


    refreshInfo();

    // Отслеживание на появление блока
    const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            disableScrolling();
        }
    }, {
        rootMargin: customRootMargin
    });
    observer.observe(speedometerTrigger);



    window.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    });



    function disableScrolling() {
        document.documentElement.classList.add('hidden');
        scrollIsDisabled = true;

        setTimeout(() => {
            if (window.innerWidth < 767) {
                speedometer.scrollIntoView({
                    block: 'center'
                })
            } else {
                window.scrollTo(0, speedometer.getBoundingClientRect().top + window.scrollY - headerHeight);
            }
            window.addEventListener('wheel', manageScrollForDesktop);
            window.addEventListener('touchmove', manageScrollForMobile);
        }, 100);

    }

    function enableScrolling() {
        document.documentElement.classList.remove('hidden');
        scrollIsDisabled = false;
        window.removeEventListener('wheel', manageScrollForDesktop);
        window.removeEventListener('touchmove', manageScrollForMobile);
    }

    function manageScrollForDesktop(e) {
        if (functionIsPaused) return;

        const scrollDown = e.deltaY > 0;
        scrollDown ? nextStep() : previousStep();
        refreshInfo();
    }

    function manageScrollForMobile(e) {
        if (functionIsPaused) return;
        const touchY = e.touches[0].clientY;

        // палец вверх = страница вниз
        const scrollDown = touchY < touchStartY;
        scrollDown ? nextStep() : previousStep();
        refreshInfo();
        touchStartY = touchY;
    }

    function nextStep() {
        
        if (currentStep < 6) {
            speedometerImg.classList.add('next');
            functionIsPaused = true;
            currentStep++;

            if (currentStep == 6) {
                enableScrolling();
            }

            setTimeout(() => {
                speedometerImg.classList.remove('next');
                functionIsPaused = false;
            }, 520);

        } 
    }

    function previousStep() {

        if (currentStep == 0) {
            enableScrolling();
        }

        if (currentStep > 0) {
            speedometerImg.classList.add('previous');
            functionIsPaused = true;
            currentStep--;

            if (currentStep == 0) {
                enableScrolling();
            }

            setTimeout(() => {
                speedometerImg.classList.remove('previous');
                functionIsPaused = false;
            }, 520);
        }
    }

    function refreshInfo() {
        speedometerSpeed.innerHTML = `${currentStep * 40}`;
        speedometerValues.forEach(item => item.style.display = 'none');
        show(speedometerValues[currentStep]);
    }
}