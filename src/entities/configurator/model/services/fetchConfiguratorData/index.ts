import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchConfiguratorData = createAsyncThunk('configurator/fetchData', async () => {
    const response = await axios.get('http://localhost:3000/data')
    return response.data
})
