var postData = [];
var maxPosts = 15;

$(document).ready(function() {
	populatePosts();
	populateSinglePost();

	$('#btnAddPost').on('click', addNewPost);
});

function populatePosts() {
	var postsContent = '';

	$.getJSON('/posts', function (data) {

		postData = data;
		var count = 0;

		$.each(data, function () {
			count += 1;
			postsContent += addPostContent(this);
			if (count >= maxPosts)
				return false;
		});

		$('#postList').html(postsContent);

		$('.post').each(function() {
			$(this).wrap("<a href = /post/" + $(this).attr("id") + "></href>");
		});
	});
}

function populateSinglePost() {
	var postContent = '';

	// only load if single post view - change later
	var cur = document.URL.split("/");
	if (cur.length <= 2)
		return false;

	var post_id = cur[cur.length - 1];

	$.getJSON('/posts/' + post_id, function (data) {
		postContent += addPostContent(data);
		$('#singlePost').html(postContent);
		$('.post').wrap("<a href = /post/" + $('.post').attr("id") + "></href>");
	});
}

function addPostContent(data) {
	var postContent = "";
	postContent += '<div class = "post" id = "' + data._id + '">';
	postContent += '<h2>' + data.title + '</h2>';
	postContent += '<p>' + data.content + '</p>';
	postContent += '<p>' + data.timestamp + '</p>';
	postContent += '</div>';
	postContent += '<br> <br>';
	return postContent;
}

function addNewPost(event) {
	event.preventDefault();

	var newTitle = $('#newPostTitle').val();
	var newContent = $('#newPostContent').val();

	if (newTitle.length == 0 && newTitle != ' ') {
		alert("enter a title");
		return false;
	}

	else {
		var newPost = {
			'title': newTitle,
			'content': newContent
		};

		$.post('/posts', newPost, function (data) {
			// console.log("Success!");
			// console.log(data);
			$('#postForm fieldset input').val('');
			$('#postForm fieldset textarea').val('');
			populatePosts();
		}, 'json');
	}

}