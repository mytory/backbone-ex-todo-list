
var TODO = {
    b: {},
    data: {
        project : [],
        todo: []
    },
    save: function(){
        localStorage.todoData = JSON.stringify(TODO.data);
    },
    loadData: function(){
        TODO.data = JSON.parse(localStorage.todoData);
    },
    router: Backbone.Router.extend({
        initialize: function(){

            if(localStorage.todoData == undefined){
                TODO.save();
            }else{
                TODO.loadData();
            }

            TODO.b.content_view = new TODO.content_view();
            TODO.b.project_view = new TODO.project_view();
            TODO.b.project_view.render();
        },
        routes: {
            "": "home",
            "about": "about",
            "project/:id": "load_todos"
        },
        home: function(){
            $('.js-content').html("");
        },
        about: function(){
            TODO.b.content_view.render();
        },
        load_todos: function(id){
            alert("project " + id);
        }
    }),
    project_view: Backbone.View.extend({
        el: '.js-project-view',
        events: {
            'click .js-add-project': "add_project"
        },
        template_li: _.template($('#project-li').html()),
        add_project: function(){
            var new_project_name = prompt("프로젝트 이름을 적어 주세요.");
            if($.trim(new_project_name) != ""){
                var new_project = {
                    id: null,
                    name: new_project_name
                }

                if(TODO.data.project.length > 0){
                    var last_project = _.max(TODO.data.project, function(one_project){
                        return one_project.id;
                    });
                    new_project.id = last_project.id + 1;
                }else{
                    new_project.id = 1;
                }

                TODO.data.project.push(new_project);
                TODO.save();
                this.render();
            }
        },
        render: function(){
            var that = this;
            this.$el.find('ul').html("");
            _.forEach(TODO.data.project, function(one_project){
                that.$el.find('ul').append(that.template_li(one_project));
            });
        }

    }),
    content_view: Backbone.View.extend({
        el: '.js-content',
        initialize: function(){
            var that = this;
            $.get('about.html', function(data){
                that.template = _.template(data);
            });
        },
        template: null,
        render: function(){
            var that = this;
            TODO.util.ajax_render(this, {'date': new Date().toString()}, "template");
        }
    }),
    project_model: Backbone.Model.extend({

    }),
    todo_model: Backbone.Model.extend({

    })
}

TODO.util = {
    ajax_render: function(obj, data, template_name){
        if(obj.template == null){
            setTimeout(function(){
                obj.render();
            }, 1);
        }else{
            obj.$el.html(obj[template_name](data));
        }
    }
};

$(document).ready(function(){
    new TODO.router();
    Backbone.history.start();
});
