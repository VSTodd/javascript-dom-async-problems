document.addEventListener("DOMContentLoaded", () => {
  let post = {
    title: "Lorem ipsum dolor sit amet",
    published: 'April 1, 2015',
    body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.'
  };

  post.body = '<p>' + post.body + '</p>';
  post.tags = ['Guacamole', 'Tacos', 'Chips'];

  let posts = [post];
  posts.push({
    title: "The Lion King",
    published: "June 15, 1994",
    body: 'Five stars!'
  });

  console.log(posts)

  Handlebars.registerPartial('tag', $('#tag').html());

  let template = Handlebars.compile(document.getElementById('posts').innerHTML);
  $('body').append(template({posts: posts }));


});