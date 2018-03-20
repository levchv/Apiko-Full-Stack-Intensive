(function(){
	if (!location.search) {
		defaultFetch();
		return;
	}
	
	const params = location.search.slice(1).split('&').map(i => i.split('=')).reduce((res, i) => Object.assign(res, { [i[0]]: i[1] }), {});
	if (!params || params.length === 0) {
		defaultFetch();
		return;
	}

	const paramInfo= [{key: 'postId', func: fetchComments}, {key: 'userId', func: fetchUserPosts}].find(i => params[i.key]);
	if (!paramInfo) {
		defaultFetch();
		return;
	}
	
	const {key, func} = paramInfo;	
	func(params[key]);
	
	function defaultFetch() {
		return fetchUsers().then(_ => fetchPosts());
	}

	function fetchUserPosts(userId) {
		return fetchPosts(`userId=${userId}`);
	}
	
	function fetchPosts(filters) {
		return fetchEntities('posts', filters, showPosts);
	}
	
	function fetchUsers(filters) {
		return fetchEntities('users', filters, showUsers);
	}
	
	function fetchComments(postId) {
		return fetchEntities('comments', `postId=${postId}`, showComments);
	}
	
	function fetchEntities(name, filters, handler) {
		return fetchFromJsonPlaceHolder(`/${name}${filters ? `?${filters}` : ''}`, handler);
	}
	
	function fetchFromJsonPlaceHolder(path, handlerFn) {		
		return fetch(`https://jsonplaceholder.typicode.com${path}`)
			.then(response => response.json())
			.then(result => { handlerFn(result); return result; });
	}

	function showPosts(posts){
		showElements('Posts', posts, createPostElement);
	}

	function showUsers(users){
		showElements('Users', users, createUserElement);
	}

	function showComments(comments){
		showElements('Comments', comments, createCommentElement);
	}

	function showElements(header, elements, createElementFn){
		const container = document.getElementById('content');
		const h1 = document.createElement('h1');
		h1.appendChild(document.createTextNode(header));
		container.appendChild(h1);
		elements.forEach(i => container.appendChild(createElementFn(i)));
	}

	function createPostElement(post){
		const p = document.createElement('p');
		const h2 = document.createElement('h2');
		const a = document.createElement('a');
		a.href = `?postId=${post.id}`;
		a.appendChild(document.createTextNode(`${post.title}`));
		h2.appendChild(a);
		p.appendChild(h2);
		const pre = document.createElement('pre');
		pre.appendChild(document.createTextNode(`${post.body}`));
		p.appendChild(pre)
		return p;
	}

	function createUserElement(user){
		const p = document.createElement('p');
		const h2 = document.createElement('h2');
		const a = document.createElement('a');
		a.href = `?userId=${user.id}`;
		a.appendChild(document.createTextNode(`${user.name}`));
		h2.appendChild(a);
		p.appendChild(h2);
		return p;
	}

	function createCommentElement(comment){
		const p = document.createElement('p');
		const h2 = document.createElement('h2');
		h2.appendChild(document.createTextNode(`${comment.name}`));
		p.appendChild(h2);
		const pre = document.createElement('pre');
		pre.appendChild(document.createTextNode(`${comment.body}`));
		p.appendChild(pre)
		return p;
	}
	
})();