 $(function(){
     var jokesbutton = $('#make-laugh-button');
     var jokeResetButton = $('#reset');
     var jokesList = $('#jokes-list');
     var jokeLoader = $('#loading')
     var fetchLoader = $('#fetch');
     var count = 0;
     var maxJoke = 5;
 
 
    jokeLoader.hide();
    jokeResetButton.hide();


    jokesbutton.on('click',function(e){
        makeJoke();
    });

    jokeResetButton.on('click',function(){
        removeAllJoke();
    });

    async function makeJoke(){
        try{
            jokesbuttonDisabled(true);
            var randomJoke = await getRandomJoke();
            
            await makeJokeLists(randomJoke);

            jokeLoader.hide();

            if(randomJoke != null){
            count++;
            }
            if(count != 5){
                jokesbuttonDisabled(false);
            }
            if(count == 5){
                jokesbuttonDisabled(true);
                check();
            }
      console.log(count);  
        } catch(err){
            alert(err);
            jokesbuttonDisabled(false);
            jokeLoader(hide);
        }
    }

    function jokesbuttonDisabled(val){
        jokesbutton.attr("disabled",val);
    }

    function getRandomJoke(){
        return JOKE_SERVICE.get();
    }

    function makeJokeLists(joke){
        var list = `<li>
                    <p>${joke}</p>
                    </li>`;
                jokesList.append(list);
    }

    function check(){

        jokesResetButton.show();
        jokesbutton.text(maxJokeMessage);
    }

    function removeAllJoke(){
        count = 0;
        jokesbutton.text(resetJoke);
        jokesbuttonDisabled(false);
        jokesList(empty);
        jokesResetButton.hide();
    }
 })   