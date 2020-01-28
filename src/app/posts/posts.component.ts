import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  
  posts: [any];
  constructor() { 

  	http.get("https://jsonplaceholder.typicode.com/posts")
  		.subscribe(response=> {
  			this.posts = <[any]>response;
  		})
  }

  createPost(input: HTMLInputElement){
  	const post = { title: input.value }

  	this.http.post(this.url,JSON.stringify(post))
  		.subscribe(response=> {
  			input.value = '';
  			post['id'] = response['id'];
  			this.posts.splice(0, 0, post)
  			console.log(response);
  		})
  }

  updatePost(post){
  	post.title = 'updated';
  	// this.http.put(this.url + '/' + post.id, JSON.stringify(post))
  	// 	.subscribe(response => {
  	// 		console.log(response);
  	// 	})

  	this.http.patch(this.url + '/' + post.id, JSON.stringify({title: 'updated'}))
	  	.subscribe(response => {
	  		console.log(response);
	  	})
  }

  deletePost(post){
  	this.http.delete(this.url + '/' + post.id)
		.subscribe(response => {
 	  		let index = this.posts.indexOf(post);
	  		this.posts.splice(index,1)
	  	})
  }

}





















