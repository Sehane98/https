import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service'


@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  
  posts: [any];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  	this.postService.getPosts()
  		.subscribe(response=> {
  			this.posts = <[any]>response;
  		})
  }  

  createPost(input: HTMLInputElement){
  	const post = { title: input.value }

    this.postService.createPost(JSON.stringify(post))
   		.subscribe(response=> {
  			input.value = '';
  			post['id'] = response['id'];
  			this.posts.splice(0, 0, post)
   		})
  }

  updatePost(post){
  	post.title = 'updated';
    this.postService.updatePost(post)
   		.subscribe(response => {
  			console.log(response);
  		})

  	// this.http.patch(this.url + '/' + post.id, JSON.stringify({title: 'updated'}))
	  // 	.subscribe(response => {
	  // 		console.log(response);
	  // 	})
  }

  deletePost(post){
    this.postService.deletePost(post) 
 		.subscribe(response => {
 	  		let index = this.posts.indexOf(post);
	  		this.posts.splice(index,1)
	  	})
  }

}





















