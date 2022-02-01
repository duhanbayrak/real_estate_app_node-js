const navbar = document.querySelector(".nav-container");
const head = document.querySelector(".head-container");

function animation(){

    var controller = new ScrollMagic.Controller();

    const t1 = gsap.timeline({defaults:{ease:Expo.inOut}});

    t1.fromTo(head, 1, {y:"-10rem"}, {y:0});
    t1.fromTo(navbar, 1, {x:"-100rem"}, {x:0});
    t1.fromTo(".content", 0.5, {x:"-2rem", opacity:0}, {x:0, opacity:1});



    const t2 = gsap.timeline({defaults:{ease:Expo.inOut}});

    t2.fromTo("#services", 0.5, {x:"-10rem", opacity:0}, {x:0, opacity:1});
    t2.fromTo("#search-area", 0.5, {x:"20rem", opacity:0}, {x:0, opacity:1});

    new ScrollMagic.Scene({
        triggerElement:"#search-area",
        triggerHook:0.5,
        reverse:false
    })
    .setTween(t2)
    .addTo(controller);

    const t3 = gsap.timeline({defaults:{ease:Expo.inOut}});

    t3.fromTo(".info", 0.5, {x:"-10rem", opacity:0}, {x:0, opacity:1});
    t3.fromTo(".pages", 0.5, {y:"-10rem", opacity:0}, {y:0, opacity:1});
    t3.fromTo(".contact-area", 0.5, {x:"10rem", opacity:0}, {x:0, opacity:1});

    new ScrollMagic.Scene({
        triggerElement:".rent",
        triggerHook:0.1,
        reverse:false
    })
    .setTween(t3)
    .addTo(controller);
}

animation();