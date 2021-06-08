/* Milestone 1:
Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il  bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato: 
Titolo
Titolo Originale
Lingua
Voto */
const app = new Vue({
    el: '#root',

    data: {
        apiKey: '96d54495d5f18cd6e4430c6adc673560',
        esChiamata: 'https://api.themoviedb.org/3/search/movie?api_key=e99307154c6dfb0b4750f6603256716d&query=ritorno+al+futuro',
        films: [],
        search: '',
        apiCall: '',
    },
    methods: {
        findFilms() {
            this.apiCall = 
            'https://api.themoviedb.org/3/search/movie?api_key=' + this.apiKey + '&query=' + this.search.split(' ').join('+');
            //console.log(this.apiCall);
            axios
            .get(this.apiCall)
            .then(risp => {
                this.films = risp.data.results;
                console.log(this.films);
            });

            
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
            } else {
                return "https://www.countryflags.io/" + this.films[i].original_language + "/flat/64.png"
            }
        }
    },
    mounted() {
        /* axios
        .get(this.apiCall)
        .then(risp => {
            console.log(risp.results);
        }) */
        
    }
})