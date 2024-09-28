import { mock } from './MockAdapter'
import './fakeApi/authFakeApi'

mock.onAny().passThrough()
