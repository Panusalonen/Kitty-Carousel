(function() {
    var kitties = document.getElementsByClassName("kitty");
    var button = document.getElementsByClassName("button");

    var cur = 0;
    var max = kitties.length;
    var timer;

    var isTransitioning;

    function moveKitties(next) {

        isTransitioning = true;

        //next here is way to interrupt the cur it should be, and make it equal to next, the argument we want it to be next
        kitties[cur].classList.remove("onscreen");
        kitties[cur].classList.add("exit");
        button[cur].classList.remove("active");

        if (typeof next == "undefined") {
            cur++;
            if (cur >= max) {
                cur = 0;
            }
        } else {
            cur = next;
        }
        button[cur].classList.add("active");
        kitties[cur].classList.add("onscreen");
    }

    document.addEventListener("transitionend", function(e) {
        if (e.target.classList.contains("exit")) {
            isTransitioning = false;
            e.target.classList.remove("exit");
            timer = setTimeout(moveKitties, 2500);
        }
    });

    document.addEventListener("click", function(e) {
        if (!e.target.classList.contains("button")) {
            return;
        }
        if (isTransitioning) {
            return;
        }

        console.log("hi");
        for (var next = 0; next < kitties.length; next++) {
            if (button[next] === e.target) {
                clearTimeout(timer);
                moveKitties(next);
                return;
            }
        }
    });
    setTimeout(moveKitties, 2500);
})();
