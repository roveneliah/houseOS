// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = Array<any>

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json([
    {
      "to":"0xC1f3af5DC05b0C51955804b2afc80eF8FeED67b9",
      "value":"0",
      "data":null,
      "contractMethod": {
        "inputs": [
          {
            "internalType":"address",
            "name":"recipient",
            "type":"address"
          },
          {
            "internalType":"uint256",
            "name":"deposit","type":"uint256"
          },
          {
            "internalType":"address",
            "name":"tokenAddress","type":"address"
          },
          {
            "internalType":"uint256",
            "name":"startTime",
            "type":"uint256"
          },
          {
            "internalType":"uint256",
            "name":"stopTime",
            "type":"uint256"
          }
        ],
        "name":"createStream",
        "payable":false
      },
      "contractInputsValues": {
        "recipient":"0x586D2Dc020bb532cE27f896231d8964CeC7A85fB",
        "deposit":"100",
        "tokenAddress":"0xC1f3af5DC05b0C51955804b2afc80eF8FeED67b9",
        "startTime":"1663979627",
        "stopTime":"1664066027"
      }
    }
  ])
}

