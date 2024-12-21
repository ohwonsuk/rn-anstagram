const defaultUserInfoReducer = {
  list:[]
}

export const userInfoReducer = (state=defaultUserInfoReducer, action:any)=>{
  return {
    ...state
  }
}