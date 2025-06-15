$(document).ready(function() {
    // Carousel functionality
    const carousel = $('.carousel-items');
    const carouselFoodCards = carousel.find('.food-card');
    const itemsWrapper = $('.carousel-items-wrapper');
    const totalItems = carouselFoodCards.length;
    let currentIndex = 0;
    let visibleItems = 3; 

    function updateVisibleItemsAndWrapper() {
        const cardWidth = 275; 
        const gap = 24;       

        if (window.innerWidth <= 768) {
            visibleItems = 1;
        } else if (window.innerWidth <= 992) {
            visibleItems = 2;
        } else {
            visibleItems = 3;
        }
        
        const wrapperWidth = (visibleItems * cardWidth) + (Math.max(0, visibleItems - 1) * gap);
        itemsWrapper.css('width', wrapperWidth + 'px');

        if (currentIndex > totalItems - visibleItems) {
            currentIndex = Math.max(0, totalItems - visibleItems);
        }
    }
    

    $('.next-arrow').click(function() {
        if (currentIndex < totalItems - visibleItems) {
            currentIndex++;
            slideCarousel();
        }
    });
    
    $('.prev-arrow').click(function() {
        if (currentIndex > 0) {
            currentIndex--;
            slideCarousel();
        }
    });
    
    function slideCarousel() {
        const cardWidthOnly = 275; // Base card width from CSS
        const gap = 24;           // Gap from CSS
        const stepWidth = cardWidthOnly + gap; 
        
        const offset = -currentIndex * stepWidth;
        carousel.css('transform', `translateX(${offset}px)`);
        updateActiveStates();
    }
    
    function updateActiveStates() {
        carouselFoodCards.removeClass('active');
        
        let middleCardInViewIndex = currentIndex;
        if (visibleItems === 3) {
            middleCardInViewIndex = currentIndex + 1;
        } // For 2 or 1 visible items, the first one (currentIndex) can be 'active'

        if(middleCardInViewIndex < totalItems && middleCardInViewIndex >= currentIndex && middleCardInViewIndex < currentIndex + visibleItems) {
             carouselFoodCards.eq(middleCardInViewIndex).addClass('active');
        } else if (totalItems > 0 && currentIndex < totalItems) { 
            carouselFoodCards.eq(currentIndex).addClass('active');
        }
        
        // Manage 'active' class on arrows for enabled/disabled visual state
        $('.prev-arrow').toggleClass('active', currentIndex > 0);
        $('.next-arrow').toggleClass('active', currentIndex < totalItems - visibleItems);
    }
    
    // Initialize
    updateVisibleItemsAndWrapper(); 
    slideCarousel();                
    
    $(window).resize(function() {
        updateVisibleItemsAndWrapper();
        slideCarousel(); 
    });
    
    carouselFoodCards.hover(
        function() { 
            carouselFoodCards.removeClass('active'); 
            $(this).addClass('active');      
        },
        function() { 
            updateActiveStates(); 
        }
    );
        
    // Video functionality
    const videoPlayBtn = $('.video-play-btn');
    const video = $('.service-video')[0];
    const playIcon = $('.play-icon');
    const pauseIcon = $('.pause-icon');
    
    $(video).on('loadedmetadata', function() {
        videoPlayBtn.removeClass('hidden');
    });
    
    videoPlayBtn.click(function() {
        if (video.paused) {
            video.play();
            playIcon.addClass('hidden');
            pauseIcon.removeClass('hidden');
            setTimeout(() => { videoPlayBtn.addClass('hidden'); }, 500);
        } else {
            video.pause();
            pauseIcon.addClass('hidden');
            playIcon.removeClass('hidden');
            videoPlayBtn.removeClass('hidden');
        }
    });
    
    $('.service-video').click(function() {
        if (video.paused) {
            video.play();
            playIcon.addClass('hidden');
            pauseIcon.removeClass('hidden');
            setTimeout(() => { videoPlayBtn.addClass('hidden'); }, 500);
        } else {
            video.pause();
            pauseIcon.addClass('hidden');
            playIcon.removeClass('hidden');
            videoPlayBtn.removeClass('hidden');
        }
    });
    
    $('.service-card').hover(
        function() { if (!video.paused) { videoPlayBtn.removeClass('hidden'); } },
        function() { if (!video.paused) { videoPlayBtn.addClass('hidden'); } }
    );
    
    $(video).on('ended', function() {
        pauseIcon.addClass('hidden');
        playIcon.removeClass('hidden');
        videoPlayBtn.removeClass('hidden');
    });
    
    // Quantity control
    $('.quantity-btn.plus').click(function() {
        const quantityEl = $(this).siblings('.quantity');
        let quantity = parseInt(quantityEl.text());
        quantityEl.text(quantity + 1);
    });
    
    $('.quantity-btn.minus').click(function() {
        const quantityEl = $(this).siblings('.quantity');
        let quantity = parseInt(quantityEl.text());
        if (quantity > 1) { quantityEl.text(quantity - 1); }
    });
    
    // Modal functionality
    const modal = $('#requestDishModal');
    $('.request-dish-btn').click(function() {
        modal.addClass('show');
        $('body').css('overflow', 'hidden'); 
    });
    $('.close-modal, .cancel-btn').click(function() {
        modal.removeClass('show');
        $('body').css('overflow', 'auto'); 
    });
    $(window).click(function(event) {
        if ($(event.target).is(modal)) {
            modal.removeClass('show');
            $('body').css('overflow', 'auto');
        }
    });
    
    $('.contact-form, #requestDishForm').submit(function(e) {
        e.preventDefault();
        alert('Form submitted successfully!');
        if ($(this).attr('id') === 'requestDishForm') {
            modal.removeClass('show');
            $('body').css('overflow', 'auto');
        }
        $(this)[0].reset(); 
    });
    
    $('.add-to-cart').click(function() { 
        $(this).addClass('clicked');
        setTimeout(() => {
            $(this).removeClass('clicked');
        }, 300);
    });
        
    $('img').on('error', function() {
        const imgSrc = $(this).attr('src');
        const altText = $(this).attr('alt') || 'Image';
        const placeholderBase = 'https://via.placeholder.com/';
        
        if (imgSrc.includes('.svg')) {
            $(this).attr('src', 'data:image/svg+xml;charset=UTF-8,%3csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"%3e%3cpath fill="%23ccc" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/%3e%3c/svg%3e');
        } 
        else if (imgSrc.includes('pizza') || imgSrc.includes('carousel') || imgSrc.includes('service-bg')) {
            $(this).attr('src', `${placeholderBase}275x250/f0f0f0/999999?text=${encodeURIComponent(altText)}`);
        }
        else { 
            $(this).attr('src', `${placeholderBase}500x400/f0f0f0/999999?text=${encodeURIComponent(altText)}`);
        }
    });
});