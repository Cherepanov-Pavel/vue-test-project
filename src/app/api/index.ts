/* eslint-disable @stylistic/block-spacing */
import {API_URL} from '@/app/shared/consts/env'
import {
	type StrictUseAxiosReturn,
	useAxios
} from '@vueuse/integrations/useAxios'
import axios, {
	type AxiosRequestConfig,
	type AxiosResponse
} from 'axios'

axios.defaults.baseURL = API_URL

export type MakeRequestResult<T> = StrictUseAxiosReturn<T, AxiosResponse<T, unknown>, unknown>
export const makeRequest = <T>({req = {}}: {'req'?: AxiosRequestConfig}): MakeRequestResult<T> => {
	const axios = useAxios<T>(req.url || '', req, {'immediate': false})

	return {...axios}
}