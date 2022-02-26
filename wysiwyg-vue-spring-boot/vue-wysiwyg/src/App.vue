<template>
  <div id="app">
    <div style="margin-bottom: 48px">
      <button
          class="btn"
          v-for="(route, index) in routes"
          :key="index"
          @click="to(route.name)"
      >
        {{ route.text }}
      </button>
    </div>
    <router-view/>
  </div>
</template>

<script>


export default {
  name: 'App',
  data: () => ({
    routes: [
      {name: 'basic-wysiwyg', text: 'Basic'},
      {name: 'example-bubble-menu', text: 'Bubble Menu'},
      {name: 'example-editor-buttons', text: 'Editor Buttons'},
      {name: 'example-add-image', text: 'Add Image'}
    ]
  }),
  methods: {
    to(name) {
      this.$router.push({ name: name })
    }
  }
}
</script>

<style>
.btn {
  font-size: 14px;
  padding: 6px 12px;
  margin: 0 16px 0 0;

  display: inline-block;
  text-decoration: none;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-image: none;
  border: 1px solid transparent;
}
.btn:focus,
.btn:active:focus {
  outline: thin dotted;
  outline: 5px auto -webkit-focus-ring-color;
  outline-offset: -2px;
}
.btn:hover,
.btn:focus {
  color: #333;
  text-decoration: none;
}
.btn:active {
  background-image: none;
  outline: 0;
  -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
  box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
}

/* default
---------------------------- */
.btn-default {
  color: #333;
  background-color: #fff;
  border-color: #ccc;
}
.btn-default:focus {
  color: #333;
  background-color: #e6e6e6;
  border-color: #8c8c8c;
}
.btn-default:hover {
  color: #333;
  background-color: #e6e6e6;
  border-color: #adadad;
}
.btn-default:active {
  color: #333;
  background-color: #e6e6e6;
  border-color: #adadad;
}
</style>
