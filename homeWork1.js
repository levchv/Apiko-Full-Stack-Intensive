(function(){
	if (!location.search) {
		fetchPosts();
		return;
	}
	
	const params = location.search.slice(1).split('&').map(i => i.split('=')).reduce((res, i) => Object.assign(res, { [i[0]]: i[1] }), {});
	if (!params || params.length === 0) {
		fetchPosts();
		return;
	}
	const paramInfo= [{key: 'postId', func: fetchPost}, {key: 'userId', func: fetchUserPosts}].find(i => params[i.key]);
	if (!paramInfo) {
		fetchPosts();
		return;
	}
	
	const {key, func} = paramInfo;	
	func(params[key]);
	
	function fetchPost(postId) {
		fetchFromJsonPlaceHolder(`/comments?postId=${postId}`);
	}
	
	function fetchUserPosts(userId) {
		fetchPosts(`userId=${userId}`);
	}
	
	function fetchPosts(filters) {
		fetchFromJsonPlaceHolder(filters ? `/posts?${filters}` : '/posts');
	}
	
	function fetchFromJsonPlaceHolder(path) {		
		fetch(`https://jsonplaceholder.typicode.com${path}`)
			.then(response => response.json())
			.then(json => console.log(json));
	}
	
})();