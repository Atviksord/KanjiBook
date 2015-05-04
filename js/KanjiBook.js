(function() {
  var KanjiBook = {};
  window.KanjiBook = KanjiBook;

  var template = function(name) {
    return Mustache.compile($('#'+name+'-template').html());
  };


// Kanjibook.Word er Model sem ég er að gera hér
  KanjiBook.Word = Backbone.Model.extend({
  });

// Words er Collectionið!, er að nota local storage til að geyma orðin
  KanjiBook.Words = Backbone.Collection.extend({
    localStorage: new Store("words")
  });

// Hérna er ég með fyrsta view 
  KanjiBook.Index = Backbone.View.extend({ // Index template
    template: template('index'),
    initialize: function() {
      this.combo = new KanjiBook.Words(); // nýtt instance af Kanjibook.Words sem er collection til að geyma Orð, Combo er orð + translation 
      this.combo.on(' all',this.render, this);
      this.combo.fetch();
    },
    render: function() {
      this.$el.html(this.template(this));
      this.combo.each(this.addWord, this);
      var form = new KanjiBook.Index.Form({collection: this.combo});
      this.$el.append(form.render().el);
      return this;
    },
    addWord: function(recipe) {
      var view = new KanjiBook.Index.Word({model: recipe});
      this.$('.combo').append(view.render().el);
    },
    count: function() {
      return this.combo.length;
    }
  });

// KanjiBook Index.Word,´sem er með delete takka event, "click button " er hluturinn sem gerist og "delete" er það sem það kallar á og delete property er function sem deletar model
  KanjiBook.Index.Word = Backbone.View.extend({
    className: 'well',
    template: template('potato'), // Þetta er potato templatið, -template mun appendast á þettá í main.html
    events: {
      'click button': 'delete'
    },
    render: function() {
      this.$el.html(this.template(this));
      return this;
    },
    name:        function() { return this.model.get('name');        },
    translation: function() { return this.model.get('translation'); },
    delete: function() { // Ef ýtt er á takkann fer delete function í gang og eyðir model, yeeeeee
      
      this.model.destroy();
    }
  });
// Form VIEW með submit sem kallar á add hér að neðan SUBMIT fer í add:
  KanjiBook.Index.Form = Backbone.View.extend({
    tagName: 'form',
    className: 'form-horizontal',
    template: template('form'),
    events: {
      'submit': 'add'
    },
    render: function() { // rendering functionið
      
      this.$el.html(this.template(this));
      return this;
    },
    add: function(event) { // Ef ýtt er á submit þá fer þetta í gang
      event.preventDefault();
       
      this.collection.create({ // býr til collection
        name: this.$('#name'0).val(), // Firsti glugginn
        translation: this.$('#translation').val() // seinni
      });
      this.render();
    }
  });

  KanjiBook.Router = Backbone.Router.extend({ // routar á index
    initialize: function(options) {
      this.el = options.el
    },
    routes: {
      "": "index"
    },
    index: function() {
      var index = new KanjiBook.Index(); //nýtt instance af view KanjiBook.Index
      this.el.empty();
      this.el.append(index.render().el);
    }
  });
// Boot á Kanjibook, kalla á scriptið í main, þetta loadar container með id potato-template, í main skjalinu
  KanjiBook.boot = function(container) {

    var router = new KanjiBook.Router({el: container}) // gerir instance af router sem kallar á intialize functionið, etc.
    Backbone.history.start();
  }
})()
