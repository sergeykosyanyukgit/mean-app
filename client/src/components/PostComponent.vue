<template>
  <div class="container">
    <div class="container-daily">
      <div class="daily-post"
          v-for="(post, index) in dailyTasks"
          v-bind:item="post"
          v-bind:index="index"
          v-bind:key="post.id"
        >
        <div class="esp-post">
          <div class="head-text">
            <span class="prior-text">{{ post.prior }}</span>
            <span class="time-text">{{ post.time }}</span>
          </div>
          <h1 class="text">{{ post.textTask }}</h1>
          <span class="sensor-text">{{ post.sensorValue }}</span>
          <div class="buttons-text">
            <button>Выполнить</button>
            <button>Позже</button>
          </div>
        </div>
      </div>
    </div>
    <div class="container-user">
      <div class="user-post">item1</div>
      <div class="user-post">item2</div>
      <div class="user-post">item3</div>
      <div class="user-post">item4</div>
      <div class="user-post">item5</div>
      <div class="user-post">item6</div>
    </div>
  </div>
    <!--<h1>Latest Posts</h1>
    
          v-bind:class="{ red: post.prior == 'important' }"
    <div class="create-post">
      <label for="create-post">Say Something...</label>
      <input type="text" id="create-post" v-model="text" placeholder="Create a post">
      <button v-on:click="createPost">Post!</button>
    </div>
    <hr>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="posts-container">
      <div class="post"
        v-for="(post, index) in posts"
        v-bind:item="post"
        v-bind:index="index"
        v-bind:key="post._id"
        v-on:click="deletePost(post._id)"
      >
        {{ `${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}` }}
        <p class="text">{{ post.text }}</p>
      </div>
    </div>

    <div class="posts-container-esp">
      <div class="esp-post"
        v-for="(post, index) in espRes"
        v-bind:item="post"
        v-bind:index="index"
        v-bind:key="post._id"
        v-bind:class="{ red: post.type == 'danger' }"
      >
        <p class="text-esp">{{ post.text }}</p>
      </div>
    </div>
-->

</template>

<script>
import PostService from '../PostService';
//important - важно 
//fine - нормально
//weakly - слабо
export default {
  name: 'PostComponent',
  data() {
    return {
      dailyTasks: [
        { 
          id: 0,
          prior: 'important',
          time: '10:50 10.03.2019',
          textTask: 'Полить помидоры',
          sensorValue: 'Влажность: 28%'
        },
        { 
          id: 1,
          prior: 'fine',
          time: '10:50 10.03.2019',
          textTask: 'Полить помидоры',
          sensorValue: 'Влажность: 28%'
        },
        { 
          id: 2,
          prior: 'weakly',
          time: '10:50 10.03.2019',
          textTask: 'Полить помидоры',
          sensorValue: 'Влажность: 28%'
        },
        { 
          id: 3,
          prior: 'important',
          time: '10:50 10.03.2019',
          textTask: 'Полить помидоры',
          sensorValue: 'Влажность: 28%'
        },
        { 
          id: 4,
          prior: 'fine',
          time: '10:50 10.03.2019',
          textTask: 'Полить помидоры',
          sensorValue: 'Влажность: 28%'
        },
        { 
          id: 5,
          prior: 'weakly',
          time: '10:50 10.03.2019',
          textTask: 'Полить помидоры',
          sensorValue: 'Влажность: 28%'
        }
      ],
      posts: [],
      error: '',
      text: '',
      espRes: []
    }
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
      this.espRes = await PostService.getPostsEsp();
    } catch(err) {
      this.error = err.message;
    }
  },
  methods: {
    async createPost() {
      await PostService.insertPost(this.text);
      this.posts = await PostService.getPosts();
    },
    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
}
.container-daily {
  width: 72%;
   display: flex;
   flex-direction: row;
   justify-content: space-around;
   align-items: flex-start;
   flex-wrap: wrap;
}
.container-daily > div {
  display: flex;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  width: 240px;
  height: 240px;
  border-radius: 8px;
  margin: 10px;
  padding: 10px;
}
.container-daily > div:hover {
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.3);
}
.daily-post {

}


.container-user {
  width: 25%;
  display: flex;
  flex-direction: column;
}
.container-user > div {
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  width: 100%;
  height: 100px;
  border-radius: 8px;
  margin: 10px;
}
.container-user > div:hover {
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.4);
}

.prior-text {
  background-color: #FF515D;
  color: white;
  font-size: 19px;
  border-radius: 2px;
  padding: 3px;
  margin-right: 3px;
  text-align: left;
}
.time-text {
  background-color: #4D47FF;
  color: white;
  font-size: 19px;
  border-radius: 2px;
  padding: 3px;
}
.esp-post h1 {
  text-align: left;
  padding-top: 20px;
}
.sensor-text {
  background-color: #B4FF99;
  color: white;
  font-size: 19px;
  border-radius: 2px;
  padding: 3px;
  margin-right: 3px;
  float: left;
  color:darkslategrey;
}
.head-text {
  float: left;
}
.buttons-text {
  margin-top: 85px;
}
.buttons-text button {
  border: 1px solid #267F00;
  border-radius: 8px;
  background-color: #54FF21;
  color:darkslategrey;
  cursor: pointer;
  padding: 7px;
  font-size: 20px;
  margin-right: 10px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.buttons-text button:hover {
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.4);
}
/*
  div.container {
    max-width: 800px;
    margin: 0 auto;
  }
  p.error {
    border: 1px solid #ff5b5f;
    background-color: #ffc5c1;
    padding: 10px;
    margin-bottom: 15px;
  }
  div.post {
    position: relative;
    border: 1px solid #5bd658;
    background-color: #bcffb8;
    padding: 10px 10px 30px 10px;
    margin-bottom: 15px;
  }
  div.created-at {
    position: absolute;
    top: 0;
    left: 0;
    padding: 5px 15px 5px 15px;
    background-color: darkgreen;
    color: white;
    font-style: 13px;
  }
  p.text {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 0;
  }

  .posts-container {
    width: 60%;
    display: inline-block;
    float: right;
  }


  .posts-container-esp {
    width: 30%;
    display: inline-block;
    float: left;
  }
  .esp-post {
    position: relative;
    padding: 5px 5px 20px 5px;
    margin-bottom: 15px;
    border-radius: 20px;
  }
  .red {
    background-color: red;
    border: 1px solid #ff5b5f;
  }
  p.text-esp {
    font-size: 16px;
    color: black;
    margin-bottom: 0;
  }*/
   .red {
    background-color: red;
    border: 1px solid #ff5b5f;
  }
</style>
