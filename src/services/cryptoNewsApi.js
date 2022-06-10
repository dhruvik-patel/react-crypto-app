import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const cryptoNewsHeaders = {
          'X-BingApis-SDK': 'true',
          'X-RapidAPI-Key': '599b2dd401mshe0a18008b5e9a64p141d84jsncf2d3462ec82',
          'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
        }

const baseUrl = 'https://bing-news-search1.p.rapidapi.com'

const createNewsRequest = url => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({newsCategory, count}) => createNewsRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),

        })
    })
})

export const { useGetCryptoNewsQuery } = cryptoNewsApi

// const options = {
//     method: 'GET',
//     url: 'https://bing-news-search1.p.rapidapi.com/news',
//     params: {safeSearch: 'Off', textFormat: 'Raw'},
//     headers: 
//   };