const url = "https://pixabay.com/api/?image_type=photo&orientation=horizontal";
const apiKey = '18694203-d22239baec913b213273a87a8';



export default {
    inputQuery: '',
    page: 1,
    fetchImages() {
    return fetch(`${url}&q=${this.query}&page=1&per_page=12&key=${apiKey}&page=${this.page}`)
        .then(res => res.json())
        .then(({ hits }) => {
            this.page += 1;
            return hits;
        })
        .catch(error => console.log(error));
    },
    resetPage() {
        this.page = 1;
    },
    get query() {
        return this.inputQuery;
    },
    set query(value) {
        this.inputQuery = value;
    }
}