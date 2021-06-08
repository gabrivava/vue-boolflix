/* Milestone 2:
Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricerca dovremo prendere sia i film che corrispondono alla query, sia le serie tv, stando attenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel JSON di risposta diversi, simili ma non sempre identici)
Qui un esempio di chiamata per le serie tv:
https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT&query=scrubs
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
            
        }
    },
    mounted() {

        
    }
})