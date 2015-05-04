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