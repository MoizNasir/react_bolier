import { Instance } from "./axios"
import { AxiosError } from "axios"

export interface MyKnownError {
    message: string;
  }

export const postRequest = async (url: string, data: {}, authorized: boolean = false, thunkApi: any) => {
    const headers = {
        "X-Access-Token": false,
    }
    if (authorized) {
        headers["X-Access-Token"] = await getToken()
    }
    try {
        const response = await Instance.post(url, data, { headers: headers })
        if (response.status !== 200) {
            return thunkApi.rejectWithValue(response.data as MyKnownError)
        }
        return response.data.data
    } catch (err: any) {
        const error: AxiosError<MyKnownError> = err.response.data.error
        if (err.response.status === 401) {//unautherized
            localStorage.clear()
            window.location.reload();
        }
        if (!error.response) {
            throw error
        }

        return thunkApi.rejectWithValue(error)
    }
}
export const multipartRequest = async (url: string, data: any, thunkApi: any) => {
    const headers = {
        "X-Access-Token": await getToken(),
        "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundaryIBgjdh7eHc9cIBOi",
    }
    let formData = new FormData();
    formData.append('organizationId', data.organizationId);
    formData.append('file', data.file)
    try {
        const response = await Instance.post(url, formData, { headers: headers })
        if (response.status !== 200) {
            return thunkApi.rejectWithValue(response.data as MyKnownError)
        }
        return response.data.data
    } catch (err: any) {
        const error: AxiosError<MyKnownError> = err.response.data.error.context ? err.response.data.error.context[0].message : err.response.data.error
        if (!error.response) {
            throw error
        }
        return thunkApi.rejectWithValue(error)
    }
}

const getToken = () => {
    const data = localStorage.getItem("@auth");
    if (data) {
        const token = (JSON.parse(data)).token;
        return token;
    }
    return '';
}
