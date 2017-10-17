var app = new Vue({
    el: '#app',
    data: {
        headline1: 'New York Budget Hotel',
        headline2: 'Best NY Hotel Rates in Seconds',
        url: 'http://NewYorkHotel.com/Deals',
        description: 'Experience all the comforts of home. Save with multi-day booking. Reserve now!',
        ads: [],
    },
    methods: {
        addToList: function () {
            this.ads.unshift({
                headline1: this.headline1,
                headline2: this.headline2,
                url: this.url,
                description: this.description,
                id: this.ads.length,
            })

            this.headline1 = 'Example Ad';
            this.headline2 = 'Check it out';
            this.url = 'www.example.com';
            this.description = 'Add a description too!';

            this.save();
        },
        save: function () {
            window.localStorage.setItem('ipx-addraft-items', JSON.stringify(this.ads));
        },
        removeAd: function (index) {
            this.$delete(this.ads, index)
            this.save();
        }
    },
    created: function () {
        this.ads = JSON.parse(window.localStorage.getItem('ipx-addraft-items')) || [];
    }
})
