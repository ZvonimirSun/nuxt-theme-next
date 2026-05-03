export interface BlogPost {
  path: string
  title?: string
  description?: string
  date?: string
  permalink?: string
  [key: string]: any
}
