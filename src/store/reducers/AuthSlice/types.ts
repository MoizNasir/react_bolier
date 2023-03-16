
export interface Auth {
  loading:boolean,
  success:string,
  error:string
}

export interface NewUserProps {
  username: string
  password: string
  mode: string
  remember?: boolean
}