import { createAsyncThunk } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { MyKnownError, postRequest } from "~/store/apiHelper"
import { NewUserProps } from "./types"

export const SignInUser = createAsyncThunk<
  any,
  NewUserProps,
  { rejectValue: MyKnownError }
>("auth/signIn", async (data: NewUserProps, thunkApi) => {
  try {
    return postRequest("/rpc/login", data, false, thunkApi)
  } catch (err: any) {
    const error: AxiosError<MyKnownError> = err.response.data.error

    if (!error.response) {
      throw error
    }
    return thunkApi.rejectWithValue(error)
  }
})
