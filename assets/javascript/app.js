var topics = ['kpop', 'SNSD', 'SHINee', 'EXO', 'BTS', 'BigBang', 'BlackPink']

$(document).ready(function () {
    for (i = 0; i < topics.length; i++) {
        var buttons = $('<button/>', { text: topics[i], id: topics[i], class: "gifbutton"});
        $("#buttons").append(buttons);
    }
});


const getGif = kpop => {
    document.querySelector('#gifDiv').innerHTML = ''
    fetch(`https://api.giphy.com/v1/gifs/search?q=${kpop}&api_key=840hMZAIoaJdJXty2r7tql39zcn7DhX0&limit=10`)
        .then(r => r.json())
        .then(gifs => {
            gifs.data.forEach(gif => {
                let gifElem = document.createElement('img');

                gifElem.setAttribute('src', gif.images.fixed_height_still.url);
                gifElem.setAttribute('data-state', "still");
                gifElem.setAttribute('data-still', gif.images.fixed_height_still.url);
                gifElem.setAttribute('data-animate', gif.images.fixed_height.url);
                gifElem.setAttribute('class', "gifClick");

                document.querySelector('#gifDiv').append(gifElem);
                console.log(gifs.data);
            })
        })
        .catch(e => console.error(e))
}



$(document).ready(function() {
    // Grabs whole document, looks for gifbutton class, calls getGif function
    $(document).on("click",  ".gifbutton", function() {
        getGif(this.id);
    });

    // change to still/animated
    $(document).on("click", ".gifClick", function() {
        if (this.dataset.state === "still") {
            this.setAttribute('src', this.dataset.animate);
            this.setAttribute('data-state', "animate");
        }
        else if (this.dataset.state === "animate") {
            this.setAttribute('src', this.dataset.still);
            this.setAttribute('data-state', "still");
        }
    })

});



document.addEventListener('click', e => {
    if (e.target.className === 'kpop') {
        let kpop = e.target.dataset.kpop
    }
});