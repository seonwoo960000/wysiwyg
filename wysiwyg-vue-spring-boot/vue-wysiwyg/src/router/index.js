import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter(
    {
        routes: [
            {
                path: '/',
                component: () => import('@/App.vue'),
                redirect: '/basic-wysiwyg',
            },
            {
                path: '/basic-wysiwyg',
                name: 'basic-wysiwyg',
                component: () => import('@/components/BasicWysiwyg.vue')
            },
            {
                path: '/example-bubble-menu',
                name: 'example-bubble-menu',
                component: () => import('@/components/ExampleBubbleMenu.vue')
            },
            {
                path: '/example-editor-buttons',
                name: 'example-editor-buttons',
                component: () => import('@/components/ExampleEditorButtons.vue')
            },
            {
                path: '/example-add-image',
                name: 'example-add-image',
                component: () => import('@/components/ExampleAddImage.vue')
            }
        ]
    }
)
