// Models
window.Book = Backbone.Model.extend();

window.BookCollection = Backbone.Collection.extend({
    model:Book,
    url:"./books"
});


// Views
window.BookListView = Backbone.View.extend({

    tagName:'ul',

    initialize:function () {
        this.model.bind("reset", this.render, this);
    },

    render:function (eventName) {
        _.each(this.model.models, function (book) {
            $(this.el).append(new BookListItemView({model:book}).render().el);
        }, this);
        return this;
    }

});

window.BookListItemView = Backbone.View.extend({

    tagName:"li",

    template:_.template($('#tpl-book-list-item').html()),

    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});

window.BookView = Backbone.View.extend({

    template:_.template($('#tpl-book-details').html()),

    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});


// Router
var AppRouter = Backbone.Router.extend({

    routes:{
        "":"list",
        "books/:id":"bookDetails"
    },

    list:function () {	
        this.bookList = new BookCollection();
        this.bookListView = new BookListView({model:this.bookList});
        this.bookList.fetch();		
		$('#content').hide();
        $('#sidebar').show().html(this.bookListView.render().el);		
    },

    bookDetails:function (id) {			
        this.book = this.bookList.get(id);
        this.bookView = new BookView({model:this.book});	
		$('#sidebar').hide();		
        $('#content').show().html(this.bookView.render().el);		
    }
});

var app = new AppRouter();
Backbone.history.start();