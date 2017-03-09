

var app = app || {};

app.FoodModel = Backbone.Model.extend({
    // Default attributes

    defaults: {
        name: '',
        brand: '',
        calories: 0,
        index: 1
    }
});

app.SearchModel = Backbone.Model.extend({
    defaults: {
        brand: '',
        name: '',
        calories: '',
    },

    initialize: function() {

    }

});
