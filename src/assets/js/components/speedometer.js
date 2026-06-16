const speedometer = document.querySelector('.speedometer');

if (speedometer) {
    const speedometerImg = speedometer.querySelector('.speedometer__img');
    const speedometerSpeed = speedometer.querySelector('.speedometer__num');
    const speedometerValues = speedometer.querySelectorAll('.speedometer__text');
    const speedometerTrigger = document.querySelector('#speedometer__trigger');
    const isDesktop = window.innerWidth > 767;
    const arrowLeft = speedometer.querySelector('.speedometer__arrow--left');
    const arrowRight = speedometer.querySelector('.speedometer__arrow--right');

    let prevTop = speedometerTrigger.getBoundingClientRect().top;
    let scrollIsDisabled = false;
    let functionIsPaused = false;
    let currentStep = 0;
    let touchStartY = 0;

    // const customRootMargin = '0px 0px -100% 0px';
    // Отслеживание на появление блока
    // const observer = new IntersectionObserver(([entry]) => {
    //     if (entry.isIntersecting && isDesktop) {
    //         disableScrolling();
    //         console.log('trigger');
    //     }
    // }, {
    //     rootMargin: customRootMargin
    // });
    // observer.observe(speedometerTrigger);
                
                
                
    refreshInfo();

    if (isDesktop) {
        window.addEventListener('scroll', watchTrigger, {
            passive: true
        });
    }

    
    function watchTrigger() {
        const currentTop = speedometerTrigger.getBoundingClientRect().top;
        
        if (prevTop > 0 && currentTop <= 0) {
            disableScrolling('down');
        }

        if (prevTop < 0 && currentTop >= 0) {
            disableScrolling('up');
        }

        prevTop = currentTop;
    }

    window.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    });

    speedometer.addEventListener('click', (e) => {
        const target = e.target;
        if (target.closest('.speedometer__arrows')) {
            if (target.closest('.speedometer__arrow--left')) {
                previousStep();
            } else if (target.closest('.speedometer__arrow--right')) {
                nextStep();
            }
            refreshInfo();
            checkArrows();
        }
    })

    function checkArrows() {
        currentStep == 0 ? arrowLeft.classList.add('disabled') : arrowLeft.classList.remove('disabled');
        currentStep == 6 ? arrowRight.classList.add('disabled') : arrowRight.classList.remove('disabled');
    }

    function disableScrolling(direction) {
        if ((direction == 'down' && currentStep == 6) || (direction == 'up' && currentStep == 0)) { return };

        document.documentElement.classList.add('hidden');
        scrollIsDisabled = true;

        setTimeout(() => {
            // window.scrollTo(0, speedometerTrigger.getBoundingClientRect().top + window.scrollY);

            window.scrollTo({
                top: speedometerTrigger.getBoundingClientRect().top + window.scrollY,
                left: 0,
                behavior: "smooth",
            });


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

        if (currentStep == 6 && isDesktop) {
            enableScrolling();
        }
        
        if (currentStep < 6) {
            speedometerImg.classList.add('next');
            functionIsPaused = true;
            currentStep++;

            if (currentStep == 6 && isDesktop) {
                enableScrolling();
            }

            setTimeout(() => {
                speedometerImg.classList.remove('next');
                functionIsPaused = false;
            }, 520);

        } 
    }

    function previousStep() {

        if (currentStep == 0 && isDesktop) {
            enableScrolling();
        }

        if (currentStep > 0) {
            speedometerImg.classList.add('previous');
            functionIsPaused = true;
            currentStep--;

            if (currentStep == 0 && isDesktop) {
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