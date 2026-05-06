import { defineTransformer } from '@nuxt/content'

export default defineTransformer({
  name: 'pathHandler',
  extensions: ['.md'],
  transform(file) {
    if (file.id.startsWith('content/posts/')) {
      file.permalink = file.permalink || `${file.id.slice(7, -3)}/`
    }
    return file
  },
})
