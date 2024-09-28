import MockAdapter from 'axios-mock-adapter'
import AxiosBase from '@/services/axios/AxiosBase'

export const mock = new MockAdapter(AxiosBase)
