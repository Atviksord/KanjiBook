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