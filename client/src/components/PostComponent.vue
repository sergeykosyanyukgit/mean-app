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
            <span 
              class="prior-text"
              v-bind:class="{ red: post.prior == 'important', yellow: post.prior == 'fine', green: post.prior == 'weakly'}"
            >{{ post.prior }}</span>
            <span class="time-text">{{ post.time }}</span>
          </div>
          <div class="port">
            <span>SensorPort: {{ post.sensor }}</span>
            <span> MotorPort: {{ post.motor }}</span>
          </div>
          <h1 class="text">{{ post.textTask }}</h1>
          <span class="sensor-text">Влажность {{ post.sensorValue }}%</span>
          <div class="buttons-text">
            <button @click="useNow(post._id)">Старт</button>
            <button @click="useLater(post._id)">Стоп</button>
          </div>
        </div>
      </div>
    </div>
    <div class="container-user">
      <div class="inputs">
        <div class="radio-buttons">
          <label for="important">Important</label>
          <input type="radio" name="prior" id="important" value="important" v-model="bufferTask.prior">
          <label for="fine">fine</label>
          <input type="radio" name="prior" id="fine" value="fine" v-model="bufferTask.prior">
          <label for="weakly">weakly</label>
          <input type="radio" name="prior" id="weakly" value="weakly" v-model="bufferTask.prior">
        </div>
        <input type="time" v-model="bufferTask.time">
        <input type="date" v-model="bufferTask.date">
        <input type="text" placeholder="Text from task"  v-model="bufferTask.textTask">
        <input type="number" placeholder="Port sensor"  v-model="bufferTask.sensor">
        <input type="number" placeholder="Port motor"  v-model="bufferTask.motor">
        <button @click="addTask">Confirm</button>
      </div>
    </div>
  </div>
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
      bufferTask: {
        prior: '',
        time: '',
        date: '',
        textTask: '',
        sensor: null,
        motor: null,
        poliv: ''
      },
      dailyTasks: [],
      posts: [],
      error: '',
      text: '',
      espRes: []
    }
  },
  async created() {
    try {
      setTimeout(()=>{
        this.getPosts();
      },1000);
    } catch(err) {
      this.error = err.message;
    }
  },
  methods: {
    async getPosts() {
      this.dailyTasks = await PostService.getPosts();
      setTimeout(()=>{
        this.getPosts();
      },1000);
    },
    async addTask() {
      if(this.bufferTask.prior != '' && this.bufferTask.time != '' && this.bufferTask.date != '' && this.bufferTask.textTask != '') {
        await PostService.insertPost(this.bufferTask);
        this.dailyTasks = await PostService.getPosts();
      }
    },
    async useNow(id) {
      await PostService.usePoliv(id, 'poliv');
    },
    async useLater(id) {
      await PostService.usePoliv(id, '');
    },
    /*async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    }*/
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.port {
  display: inline;
  float: left;
  margin-top: 30px;
  padding: 2px;
  background-color: tomato;
}
.radio-buttons {
  width: 100%;
}
.radio-buttons > input {
  
}
.container-user {
  width: 25%;
  display: flex;
  flex-direction: column;
}
.container-user > div {
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  width: 100%;
  min-height: 100px;
  border-radius: 8px;
  margin: 10px;
}
.container-user > div:hover {
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.4);
}


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
  min-height: 240px;
  border-radius: 8px;
  margin: 10px;
  padding: 10px;
}
.container-daily > div:hover {
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.3);
}
.daily-post {

}
.daily-input {
}



.prior-text {
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
  font-size: 18px;
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
button {
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
button:hover {
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
    background-color: #ff5b5f;
  }
  .yellow {
    background-color: #dbe918;
  }
  .green {
    background-color: #20bb0b;
  }
</style>
