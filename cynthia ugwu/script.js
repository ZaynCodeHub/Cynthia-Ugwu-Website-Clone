// const scroll = new LocomotiveScroll({
//     el: document.querySelector('#main'),
//     smooth: true
// });

// function firstPageAnim(){
//     var tl = gsap.timeline();
//     tl.from("#nav", {
//         y: '-10',
//         opacity: 0,
//         duration: 1.5,
//         ease: Expo.easeInOut
//     })
//     .to(".boundingelem", {
//         y: '0',
//         ease: Expo.easeInOut,
//         duration: 2,
//         stagger: 0.2,
//         delay: -1
//     })
//     .from("#homefooter", {
//         y: '-10',
//         opacity: 0,
//         duration: 1.5,
//         delay: -1,
//         ease: Expo.easeInOut
//     });
// }

// var timeout;

// function circleChaptaKaro(){
//     var xscale = 1;
//     var yscale = 1;
//     var xprev = 0;
//     var yprev = 0;

//     window.addEventListener("mousemove", function(details){
//         clearTimeout(timeout);

//         xscale = gsap.utils.clamp(0.8, 1.2, details.clientX - xprev);
//         yscale = gsap.utils.clamp(0.8, 1.2, details.clientY - yprev);

//         xprev = details.clientX;
//         yprev = details.clientY;

//         circleMouseFollower(xscale, yscale);
//         timeout = setTimeout(function () {
//             document.querySelector("#minicircle").style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(1, 1)`;
//         }, 100);
//     });
// }

// function circleMouseFollower(xscale, yscale){
//     window.addEventListener("mousemove", function(details){
//         document.querySelector("#minicircle").style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(${xscale}, ${yscale})`;
//     });
// }

// circleChaptaKaro();
// firstPageAnim();

// document.querySelectorAll(".elem").forEach(function(elem){
//     elem.addEventListener("mousemove", function(details){
//         var diff = details.clientY - elem.getBoundingClientRect().top;
//         var img = elem.querySelector("img");
        
//         // Calculate half of the image's width and height
//         var imgWidth = img.offsetWidth / 2;
//         var imgHeight = img.offsetHeight / 2;

//         gsap.to(img, {
//             opacity: 1,
//             ease: Power1,
//             top: diff - imgHeight,
//             left: details.clientX - imgWidth
//         });
//     });
// });















const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim(){
    var tl = gsap.timeline();
    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
    .to(".boundingelem", {
        y: '0',
        ease: Expo.easeInOut,
        duration: 2,
        stagger: 0.2,
        delay: -1
    })
    .from("#homefooter", {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut
    });
}

var timeout;

function circleChaptaKaro(){
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;
    window.addEventListener("mousemove", function(details){
        clearTimeout(timeout);

        xscale = gsap.utils.clamp(0.8, 1.2, details.clientX - xprev);
        yscale = gsap.utils.clamp(0.8, 1.2, details.clientY - yprev);

        xprev = details.clientX;
        yprev = details.clientY;

        circleMouseFollower(details.clientX, details.clientY, xscale, yscale);
        timeout = setTimeout(function(){
            document.querySelector("#minicircle").style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(1, 1)`;
        }, 100);
    });
}

function circleMouseFollower(x, y, xscale, yscale){
    const minicircle = document.querySelector("#minicircle");
    const rect = minicircle.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    window.addEventListener("mousemove", function(details){
        minicircle.style.transform = `translate(${x - width / 2}px, ${y - height / 2}px) scale(${xscale}, ${yscale})`;
    });
}

circleChaptaKaro();
firstPageAnim();

document.querySelectorAll(".elem").forEach(function(elem){
    const img = elem.querySelector("img");

    elem.addEventListener("mouseenter", function(){
        document.querySelectorAll(".elem img").forEach(function(otherImg){
            otherImg.style.opacity = 0;
        });
        img.style.opacity = 0; // Hide current image initially
    });

    elem.addEventListener("mousemove", function(details){
        var diffX = details.clientX - elem.getBoundingClientRect().left;
        var diffY = details.clientY - elem.getBoundingClientRect().top;

        var elemHeight = elem.offsetHeight;
        var imgHeight = img.offsetHeight;

        var overflow = imgHeight / 4;

        // Adjusted yPosition calculation to keep image visible within container
        var yPosition = Math.min(Math.max(diffY - imgHeight / 2, -overflow), elemHeight - imgHeight / 2 + overflow);

        gsap.to(img, {
            opacity: 1,
            ease: "power1.inOut",
            x: diffX - img.width / 2,
            y: yPosition,
            duration: 0.1
        });
    });

    elem.addEventListener("mouseleave", function(){
        gsap.to(img, {
            opacity: 0,
            ease: "power1.inOut",
            duration: 0.3
        });
    });
});