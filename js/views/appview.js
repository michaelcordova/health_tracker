var app = app || {};

app.AppView = Backbone.View.extend({
    el: '#search',
    model: null,

    events: {
        'click #search-button': function(e) {
            this.getJson(e);
            this.display(e);
        },
        'keyup #search-text': 'keyPress'
    },

    keyPress: function() {
        if(event.keyCode == 13) {
            this.getJson();
            this.display();
        }
    },

    display: function() {
        $('#search-result').show();
    },

    // Function to get API from Nutritionix.
    getJson: function(){
        var keyword = $('#search-text').val(),
            urlAPI = 'https://api.nutritionix.com/v1_1/search/'+ keyword + '?results=0:20&fields=item_name,brand_name,item_id,nf_calories&appId=86f00edf&appKey=9e93f37e7cc3aa46136af23af7a34e3d';

        $.ajax({
            type: 'GET',
            url: urlAPI,
            dataType: 'json',
            success: function(data) {
                // Empty previous search view in the DOM.
                $("table tr:gt(0)").remove();

                dataReceived = data.hits;
                var searchModel;
                dataReceived.forEach(function(i, index) {
                    console.log(i);
                    srBrand = i.fields.brand_name;
                    srName = i.fields.item_name;
                    srCalories = i.fields.nf_calories;
                    srIndex = i.fields.item_id;
                    searchModel = new app.SearchModel({
                        brand: srBrand,
                        name: srName,
                        calories: srCalories,
                        index: srIndex
                    });

                    searchView = new app.SearchView ({
                        model: searchModel
                    });
                });
            },
            error: function() {
                var errorMessageDiv = '<div class="alert alert-danger">Could not get data from server.</div>';
                $('#app-info').append(errorMessageDiv);
            }
        });
    },

    render: function () {

    },

});

app.SearchView = Backbone.View.extend({
    el: $('tbody'),

    template: _.template( $('#tpte-search-results').html()),

    events: {
        'click #add-btn': 'itemSelected'
    },

    render: function(){
        var html = this.template(this.model.toJSON());
        var id = this.model.toJSON().index;
        $(html).appendTo(this.$el);
        $('#add-btn').last().attr('data-id', id);
        console.log(id);
        return this;
    },

    initialize: function() {
        this.render();
    },

    itemSelected: function(e) {
        e.preventDefault();
        var id = $(e.currentTarget).data("id");
        // var item = this.model.get(id);
        // var name = item.get("name");
        console.log("Se selecciono este item" + id);
    }
});
