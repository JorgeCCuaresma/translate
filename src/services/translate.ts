import { Configuration, OpenAIApi, ChatCompletionRequestMessageRoleEnum } from 'openai'
import { type FromLanguage, type Language } from '../types.d'

const apikey = import.meta.env.VITE_API_KEY

const configuration = new Configuration(apikey)
const openai = new OpenAIApi(configuration)

export const translate = async (fromLanguage: FromLanguage, toLanguage: Language, text: string) => {
  const messages = [
    {
      role: ChatCompletionRequestMessageRoleEnum.System,
      content: 'You are AI that translates text. You receive a text from the user. Do not answer, just translate the text. The Original language is surrounded by `{{` and `}}`. You can also recive {{auto}} wich means that you have to detect the language. The language you translate to is surrounded by `[[` and `]]`  '

    },
    {
        
    }
  ]
}
