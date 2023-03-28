import axios from 'axios'

export const getFinanceValue = async (
  url: string,
  token: string,
  from_currency:string,
  to_currency:string): Promise<unknown> => {
  try {
    const response = await axios.get(`${url}?function=CURRENCY_EXCHANGE_RATE&from_currency=${from_currency}&to_currency=${to_currency}&apikey=${token}`)
    return response.data

  } catch (err) {
    return console.error(`Error getting Value ${err}`)
  }
}