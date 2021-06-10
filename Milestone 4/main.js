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
        apiCallFilm: '',
        apiCallSerie: '',
        hover: false,
    },
    methods: {
        findFilms() {
            this.apiCallFilm = 
            'https://api.themoviedb.org/3/search/movie?api_key=' + this.apiKey + '&query=' + this.search.split(' ').join('+');
            //console.log(this.apiCallFilm);
            axios
            .get(this.apiCallFilm)
            .then(risp => {
                this.films = risp.data.results;
                console.log(this.films);
            });
        },
        findSeries() {
            this.apiCallSerie = 
            'https://api.themoviedb.org/3/search/tv?api_key=' + this.apiKey + '&query=' + this.search.split(' ').join('+');
            //console.log(this.apiCallSerie);
            axios
            .get(this.apiCallSerie)
            .then(risp => {
                this.series = risp.data.results;
                console.log(this.series);
            });
        },
        find() {
            this.findFilms();
            this.findSeries();
        },

        percorsoImg(i) {
            //console.log(this.films[i].original_language);
            if (this.films[i].original_language === 'en') {
                return "https://www.countryflags.io/" + 'US' + "/flat/64.png"
            } else if (this.films[i].original_language === 'zh') {
                return "https://www.countryflags.io/" + 'CN' + "/flat/64.png"
            } else if (this.films[i].original_language === 'hi' || this.films[i].original_language === 'te') {
                return "https://www.countryflags.io/" + 'IN' + "/flat/64.png"
            } else if (this.films[i].original_language === 'ja') {
                return "https://www.countryflags.io/" + 'JP' + "/flat/64.png"
            } else if (this.films[i].original_language === 'ko') {
                return "https://www.countryflags.io/" + 'KR' + "/flat/64.png"
            } else if (this.films[i].original_language === 'cs') {
                return "https://www.countryflags.io/" + 'CZ' + "/flat/64.png"
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
            if(this.films[i].poster_path === null) {
                return 'https://image.tmdb.org/t/p/w342/wwemzKWzjKYJFfCeiB57q3r4Bcm.png'
            } else {
                return 'https://image.tmdb.org/t/p/w342' + this.films[i].poster_path;
            }
        },
        
        posterSerie(i) {
            if(this.series[i].poster_path === null) {
                return 'https://image.tmdb.org/t/p/w342/wwemzKWzjKYJFfCeiB57q3r4Bcm.png'
            } else {
                return 'https://image.tmdb.org/t/p/w342' + this.series[i].poster_path;
            }
        },

        //info film all'hover
        
    },
    mounted() {

        
    }
});