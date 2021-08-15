/*Milestone 3:In questa milestone come prima cosa aggiungiamo la copertina del film o della serieal nostro elenco. 
Ci viene passata dall’API solo la parte finale dell’URL, questoperché poi potremo generare da quella porzione di URL tante dimensioni diverse.
Dovremo prendere quindi l’URL base delle immagini di TMDB:https://image.tmdb.org/t/p/​ per poi aggiungere la dimensione che vogliamo generare(troviamo tutte le dimensioni possibili a questo link:https://www.themoviedb.org/talk/53c11d4ec3a3684cf4006400​) per poi aggiungere laparte finale dell’URL passata dall’API.
Esempio di URL:https://image.tmdb.org/t/p/w342/wwemzKWzjKYJFfCeiB57q3r4Bcm.png
*/
const app = new Vue({
    el: '#root',

    data: {
        apiKey: '96d54495d5f18cd6e4430c6adc673560',
        series: [],
        films: [],
        search: '', 
        bandiere: ['it', 'en', 'fr', 'ja', 'es'],
        cast: []
    },
    methods: {

        // preforming multiple requests
        getFilms() {
            const filmsApiCall = 
            'https://api.themoviedb.org/3/search/movie?api_key=' + this.apiKey + '&query=' + this.search.split(' ').join('+');
            return axios.get(filmsApiCall);
        },

        getSeries() {
            const seriesApiCall = 'https://api.themoviedb.org/3/search/tv?api_key=' + this.apiKey + '&query=' + this.search.split(' ').join('+');
            return axios.get(seriesApiCall);
        },

        find() {
            Promise.all([this.getFilms(), this.getSeries()])
                .then( risp => {
                const films = risp[0].data.results;
                this.films = films;
                //console.log(films);
                const series = risp[1].data.results;
                this.series = series;
                // this.castCall();
            });

                
        },

        castCall() {
            this.clearCast();
            for (let i = 0; i < this.films.length; i++) {
                const element = this.films[i];
                const castCall = 'https://api.themoviedb.org/3/movie/' + element.id + '/credits?api_key=' + this.apiKey;
            
                axios.get(castCall)
                .then( risp => {
                    // console.log(risp.data.cast);
                    // console.log(risp.data.cast);
                    var cast = [];
                    cast = risp.data.cast;
                    // console.log(cast);
                    this.casts.push(cast);
                })
            }
        },

        castCallOne(id) {
            // console.log(id);
            const castCall = 'https://api.themoviedb.org/3/movie/' + id + '/credits?api_key=' + this.apiKey;
        
            axios.get(castCall)
            .then( risp => {
                // console.log(risp.data.cast);
                // console.log(risp.data.cast);
                var cast = [];
                cast = risp.data.cast;
                // console.log(cast);
                this.cast = cast;
            })
            
        },

        clearCast() {
            this.casts = [];
        },

        percorsoImg(i) {
            //console.log(this.films[i].original_language);
            if (this.films[i].original_language === 'en') {
                return "https://www.countryflags.io/" + 'US' + "/flat/64.png"
            } else if (this.films[i].original_language === 'ja') {
                return "https://www.countryflags.io/" + 'JP' + "/flat/64.png"
            } else {
                return "https://www.countryflags.io/" + this.films[i].original_language + "/flat/64.png"
            }
        },

        imgSerie(i) {
            if (this.series[i].origin_country.length === 1) {
                return "https://www.countryflags.io/" + this.series[i].origin_country + "/flat/64.png"
            } else {
                return 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/EarthFlag1.svg/350px-EarthFlag1.svg.png'
            }
            
        },

        //poster Img
        poster(i) {
            if(i.poster_path === null) {
                return 'https://image.tmdb.org/t/p/w342/wwemzKWzjKYJFfCeiB57q3r4Bcm.png'
            } else {
                return 'https://image.tmdb.org/t/p/w342' + i.poster_path;
            }
        },  
        
    },
    mounted() {

        
    }
});