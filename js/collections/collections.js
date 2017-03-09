var app = app || {};

var FoodCollection = Backbone.Collection.extend({
    model: app.FoodModel,

    localStorage: new Backbone.LocalStorage('results-backbone')
});

var SearchCollection = new Bacbone.Collection.extend({
    model: app.SearchModel,
});

app.FoodCollection = new FoodCollection();
