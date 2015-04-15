(function() {
  var KanjiBook = {};
  window.KanjiBook = KanjiBook;

  var template = function(name) {
    return Mustache.compile($('#'+name+'-template').html());
  };


  KanjiBook.Word = Backbone.Model.extend({
  });

  KanjiBook.Words = Backbone.Collection.extend({
    localStorage: new Store("words")
  });

// Hérna er ég með fyrsta view s.s index
  KanjiBook.Index = Backbone.View.extend({
    template: template('index'),
    initialize: function() {
      this.recipes = new KanjiBook.Words();
      this.recipes.on('all', this.render, this);
      this.recipes.fetch();
    },
    render: function() {
      this.$el.html(this.template(this));
      this.recipes.each(this.addWord, this);
      var form = new KanjiBook.Index.Form({collection: this.recipes});
      this.$el.append(form.render().el);
      return this;
    },
    addWord: function(recipe) {
      var view = new KanjiBook.Index.Word({model: recipe});
      this.$('.recipes').append(view.render().el);
    },
    count: function() {
      return this.recipes.length;
    }
  });

// KanjiBook Index.Word,´sem er með delete takka event, "click button " er hluturinn sem gerist og "delete" er það sem það kallar á og delete property er function sem deletar model
  KanjiBook.Index.Word = Backbone.View.extend({
    className: 'well',
    template: template('recipe'),
    events: {
      'click button': 'delete'
    },
    render: function() {
      this.$el.html(this.template(this));
      return this;
    },
    name:        function() { return this.model.get('name');        },
    ingredients: function() { return this.model.get('ingredients'); },
    delete: function() { // Ef ýtt er á takkann fer delete function í gang og eyðir model, yeeeeee
      this.model.destroy();
    }
  });

  KanjiBook.Index.Form = Backbone.View.extend({
    tagName: 'form',
    className: 'form-horizontal',
    template: template('form'),
    events: {
      'submit': 'add'
    },
    render: function() {
      this.$el.html(this.template(this));
      return this;
    },
    add: function(event) {
      event.preventDefault();
      this.collection.create({
        name: this.$('#name').val(),
        ingredients: this.$('#ingredients').val()
      });
      this.render();
    }
  });

  KanjiBook.Router = Backbone.Router.extend({
    initialize: function(options) {
      this.el = options.el
    },
    routes: {
      "": "index"
    },
    index: function() {
      var index = new KanjiBook.Index();
      this.el.empty();
      this.el.append(index.render().el);
    }
  });

  KanjiBook.boot = function(container) {

    var router = new KanjiBook.Router({el: container})
    Backbone.history.start();
  }
})()
