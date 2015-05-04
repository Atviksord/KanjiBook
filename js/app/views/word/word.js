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