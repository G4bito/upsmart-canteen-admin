<template>
  <div ref="reactRootRef" class="admin-wrapper"></div>
</template>

<script>
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import ReactDOM from 'react-dom/client'
import React from 'react'
import AdminApp from '../admin/AdminApp'
import '../admin/styles/admin.css'

export default defineComponent({
  name: 'AdminAppWrapper',
  emits: ['logout'],
  setup(props, { emit }) {
    const reactRootRef = ref(null)
    let rootInstance = null

    const handleAdminLogout = () => {
      emit('logout')
    }

    onMounted(() => {
      console.log('AdminAppWrapper mounted, reactRootRef:', reactRootRef.value)
      if (reactRootRef.value) {
        try {
          rootInstance = ReactDOM.createRoot(reactRootRef.value)
          rootInstance.render(React.createElement(AdminApp, { onLogout: handleAdminLogout }))
          console.log('React AdminApp mounted successfully')
        } catch (error) {
          console.error('Failed to mount React app:', error)
          if (reactRootRef.value) {
            reactRootRef.value.innerHTML = `<div style="color: red; padding: 20px;">Error loading admin dashboard: ${error.message}</div>`
          }
        }
      }
    })

    onUnmounted(() => {
      console.log('AdminAppWrapper unmounting')
      if (rootInstance) {
        rootInstance.unmount()
        rootInstance = null
      }
    })

    return { reactRootRef }
  }
})
</script>

<style scoped>
.admin-wrapper {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  margin: 0;
  padding: 0;
}

:deep(*) {
  margin: 0;
  padding: 0;
}
</style>
