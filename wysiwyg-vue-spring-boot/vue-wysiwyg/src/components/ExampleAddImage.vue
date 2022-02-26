<template>
  <div>
    <div v-if="editor">
      <input type="file" @change="onFileChange">
    </div>
    <editor-content :editor="editor"/>
    <button @click="getJson">JSON</button>
    <button @click="getHtml">HTML</button>
    <button @click="getImages">Images</button>
    <button @click="getBlobs">Get blob</button>
    <button @click="getFiles">Get File</button>
    <button @click="setEditorContentWithUploadedImages">Set Content With Uploaded Image url</button>
    <pre>
      {{ content }}
    </pre>

    <!-- Display the content retrieved from tip-tap editor -->
    <!-- <span v-html="content"></span>-->

  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Image from '@tiptap/extension-image'
import Dropcursor from '@tiptap/extension-dropcursor'

export default {
  name: 'ExampleAddImage',

  components: {
    EditorContent,
  },

  data() {
    return {
      editor: null,
      content: null,
      imageFiles: {}
    }
  },

  methods: {
    onFileChange(e) {
      const file = e.target.files[0]
      const url = URL.createObjectURL(file)
      if (url) {
        this.editor.chain().focus().setImage({src: url, title: file.name}).run()
      }
    },
    getImages() {
      const contentJson = this.editor.getJSON()
      const images = contentJson.content.filter(c => c.type == 'image')
      this.content = images
      return this.content
    },
    async getBlobs() {
      const images = this.getImages()
      const blobPromises = images.map(image => fetch(image.attrs.src))
      const blobs = await Promise.all(blobPromises)
      return blobs
    },
    async getFiles() {
      const images = this.getImages()
      const imgLocalSrcs = images.map(image => image.attrs.src)
      const blobPromises = imgLocalSrcs.map(src => fetch(src))
      const fileNames = images.map(image => image.attrs.title)
      const blobs = await Promise.all(blobPromises)

      const files = {}
      for (let i = 0; i < blobs.length; i++) {
        const file = new File([blobs[i].blob()], fileNames[i], { type: 'images/jpeg'})
        const originSrc = imgLocalSrcs[i]
        files[originSrc] = file
      }
      this.imageFiles = files
      return files
    },
    async uploadImages() {
      const files = await this.getFiles()
      // upload images logic

      // temporary logic
      Object.keys(files).forEach(originSrc => files[originSrc] = 'put your uploaded image src')
      return files
    },
    async setEditorContentWithUploadedImages() {
      const uploadedImageSrcs = await this.uploadImages()
      const jsonContents = this.editor.getJSON().content
      for (let i = 0; i < jsonContents.length; i++) {
        if (jsonContents[i].type != 'image') continue
        const originSrc = jsonContents[i].attrs.src
        jsonContents[i].attrs.src = uploadedImageSrcs[originSrc]
      }

      this.editor.commands.setContent(jsonContents)
    },
    getJson() {
      this.content = this.editor.getJSON()
    },
    getHtml() {
      this.content = this.editor.getHTML()
    }
  },

  mounted() {
    this.editor = new Editor({
      extensions: [
        Document,
        Paragraph,
        Text,
        Image,
        Dropcursor,
      ],
      content: `
        <p>This is a basic example of implementing images. Drag to re-order.</p>
      `,
    })
  },

  beforeUnmount() {
    this.editor.destroy()
  },
}
</script>

<style lang="scss">
/* Basic editor styles */
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }

  img {
    max-width: 100%;
    height: auto;

    &.ProseMirror-selectednode {
      outline: 3px solid #68CEF8;
    }
  }
}
</style>