import { OpenAI } from "langchain/llms/openai";
import { StringOutputParser } from "langchain/schema/output_parser";
import { ChatPromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import 'dotenv/config';

const apiKey = process.env.API_KEY;

const model = new OpenAI({
  modelName: "text-davinci-003", // Defaults to "text-davinci-003" if no model provided.
  temperature: 0.9,
  openAIApiKey: apiKey, // In NodFe.js defaults to process.env.OPENAI_API_KEY
});

const promptTemplateForUserPreferences = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are a subsystem for a price negotiator ML model. 
      
  The negotiator analyses the customer chatMessage and decides a price for a product.
  
  This negotiator, however, does not take into account the user purchase history data.
  
  Your task is to take the price input from the negotiator and discount the price based on the user history purchase data using the following protocol:
  1. You will first compute a coefficient - 'user retention probability' using a formula which will be provided in this prompt. 
  The formula is based on the user purchase history data which will also be provided to you in this prompt.
  2. You will then use this coefficient to mitigate the actual negotiated price further because the customer has bought before.
  3. You can only discount the price by a maximum of 10%.
  4. You have to consider the total worth of the purchase from the purchase history data and the price input from the negotiator to decide the final discounted price.
  
  Formula for user retention probability:
  1. You will first compute the total worth of the purchase from the purchase history data.
  2. You will then compute the user retention probability using the following formulae:
  
  userRetentionProbabilityCoefficient = (totalWorthOfPurchaseHistory * weightA + otherFactors * weightB) / (totalWorthOfPurchaseHistory * weightC + otherFactors * weightD)
  
  discountedFinalPrice = originalPrice - (originalPrice * min(userRetentionProbabilityCoefficient, 0.10))
  
  You have the freedom to decide weights and other factors by yourself.
  You can also decide not to use the formulae at all and use your logic to decide the final discounted price.
  You can also decide not to discount the price at all.
  
  You will only reply using the following format: 
  'newDiscountedPrice: <price>
   reasoningForDiscount: <reasoning>'
   
  An example instance of input and output is provided below:
  input:
  
  
  userPurchaseHistory: 
      'productA': 
          'price': 100,
          'quantity': 2
      ,
      'productB': 
          'price': 200,
          'quantity': 1
      
      priceInputFromNegotiator: 300
  
  output:
  
  'newDiscountedPrice': 280,
  'reasoningForDiscount': 'I can see that you've bought productA and productB before. I can give you a 6% discount on the price of productC. Would you like to buy it?'
  `,
  ],
  [
    "human",
    `user purchase history: {userPurchaseHistory}\nprice input from negotiator: {priceInputFromNegotiator}`,
  ],
]);

const chain = new LLMChain({
  prompt: promptTemplateForUserPreferences,
  llm: model,
  outputParser: new StringOutputParser(),
});

const res = await chain.call({
    userPurchaseHistory: `{
        "productA": {
            "price": 100,
            "quantity": 2
        },
        "productB": {
            "price": 200,
            "quantity": 1
        }
    }`,
    priceInputFromNegotiator: "300"
});

  

console.log(res);
