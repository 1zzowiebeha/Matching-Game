window.setupGame = function() {
    let container = document.getElementsByClassName('container-ez')[0];
    let buttons = container.getElementsByTagName('button');
    
    for (let button of buttons) {
        // Remove matched/selected class from buttons if
        //  present from a previous game:
        button.classList.remove('matched');
        button.classList.remove('selected');
        
        // remove animation class to avoid it playing again once the transform is removed.
        // why does it play again though?
        // default animation takes over once select one is removed
        button.classList.add('intro-animation');
        setTimeout(function () {
            button.classList.remove('intro-animation');
        }, 1500);
    }
    
    return 0;
};


// https://github.com/dotnet/aspnetcore/issues/52212#issuecomment-1819620777
// Element events won't work within a DOMContentLoaded event, as
// "the element [is] detached from the DOM as part of the (re)rendering process ... [which] results in the event listener being lost."
//  - glen-84
// Add event listeners:
(function () {
    let container = document.getElementsByClassName('container-ez')[0];
    let buttons = container.getElementsByTagName('button');
    let lastButtonClicked = null;
    
    // Remove intro-animation when page is ready
    // remove animation class to avoid it playing again once the transform is removed.
    // why does it play again though?
    // default animation takes over once select one is removed
    for (let button of buttons) {
        setTimeout(function () {
            button.classList.remove('intro-animation');
        }, 1500);
    }
    
    container.addEventListener('mousedown', function(e) {
        if (e.target.tagName != "BUTTON") {
            return;
        }

        let buttonClicked = e.target;
        
        // Has some unneeded selector checks & removals, but it works! :)
        
        // User has made their first selection.
        if (lastButtonClicked === null
            && !buttonClicked.classList.contains('selected')
            && !buttonClicked.classList.contains('matched')
        ) {
            
            lastButtonClicked = buttonClicked;
            buttonClicked.classList.add('selected');
        }
        // Animal passed matches with the last animal clicked. Clear selection & match the two.
        else if (lastButtonClicked !== buttonClicked
                && lastButtonClicked.textContent === buttonClicked.textContent
                && !buttonClicked.classList.contains('matched')
                && !lastButtonClicked.classList.contains('matched')
        ) {
            
            lastButtonClicked.classList.add('matched');
            buttonClicked.classList.add('matched');
          
            lastButtonClicked.classList.remove('selected');
            buttonClicked.classList.remove('selected');
            lastButtonClicked = null;
        }
        // Animal passed not the same as last animal clicked. Clear selection.
        else {
            lastButtonClicked.classList.remove('selected');
            buttonClicked.classList.remove('selected');
            lastButtonClicked = null;
        }
    });
})();