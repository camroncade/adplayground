Array.prototype.uniqueMerge = function( a ) {
    for ( var nonDuplicates = [], i = 0, l = a.length; i<l; ++i ) {
        if ( this.indexOf( a[i] ) === -1 ) {
            nonDuplicates.push( a[i] );
        }
    }
    return this.concat( nonDuplicates )
};

var app = new Vue({
    el: '#app',
    data: {
        headline1: 'New York Budget Hotel',
        headline2: 'Best NY Hotel Rates in Seconds',
        url: 'http://NewYorkHotel.com/Deals',
        description: 'Experience all the comforts of home. Save with multi-day booking. Reserve now!',
        ads: [],
        edit: true,
        adFilter: null,
    },
    computed: {
        'tags': function () {
            tags = [];
            for (i = 0; i < this.ads.length; i++) {
                adTags = this.ads[i].tags;
                if (adTags.length) {
                    adTags = adTags.split(',');
                    tags = tags.uniqueMerge(adTags);
               }
            }
            return tags;
        },
        adsToShow: function () {
            if (this.adFilter == null) {
                return this.ads;
            } else {
                return this.ads.filter(function (ad, id) {
                    return ad.tags.indexOf(this.adFilter) !== -1;
                }.bind(this));
            }
        },
        newAdTag: function () {
            if (this.adFilter == null)
                return '';
            else
                return this.adFilter;
        }
    },
    methods: {
        addToList: function () {
            this.ads.unshift({
                headline1: this.headline1,
                headline2: this.headline2,
                url: this.url,
                description: this.description,
                id: this.ads.length,
                edit: false,
                editTags: false,
                tags: this.newAdTag,
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
        this.ads.map(function(ad, id) {
            ad.edit = false;
            ad.editTags = false;
        });
    }
})
