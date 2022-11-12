# @secrez/daccordo

The name _DAccordo_ comes from the Italian idiom "d'accordo", i.e., what people say when they agree on something.

A tool to make encrypted communications between servers.

# Intro

The idea is very simple. A server knows its own secretKey and the publicKey of any other server with which it has to have exchanges, and uses both to encrypt/decrypt the messages.

## Install as a CLI

```
npm i -g @secrez/daccordo
```

For help run
```
daccordo -h
```
and you will get
``` 
Options:
  -h, --help         This help.
  -g, --generate     Generate a new key pair
```

To generate a key pair call
``` 
daccordo -g
```

It will produce a JSON file like
``` 
{
  "publicKey": "737695ae59530b2df45803fc5fafe57e98c9d1351e7ebdd0a5607b5932490103",
  "secretKey": "06479e10d4cf9daa5f9fbcb5858b49998a4890ab23e49ba3b90a68ba2a257424"
}
```

## Used inside other tools

Install as usual
```  
npm i @secrez/daccordo
```

Suppose we have two API server: API1 and API2.

API1 is calling API2:

```
require("dotenv").config();
const DAccordo = require('@secrez/daccordo')

const bodyParams = {
    name: "Francesco",
    email: "francesco@sullo.co" 
}

const encryptedParams = DAccordo.encryptObject(
    bodyParams, 
    process.env.api1secretKey, 
    process.env.api2publicKey
);

superagent
    .post("https://api2.secrez.cc/v1/booking")
    .body({encryptedParams})
    .then(...)
    
```

API2 is receiving the request by API1:

```
require("dotenv").config();
const DAccordo = require('@secrez/daccordo')

router.post("/booking", async (req, res) => {
  const { encryptedParams } = req.body;

  try {
    const bodyParams = DAccordo.decryptJSONString(
        encryptedParams, 
        process.env.api2secretKey, 
        process.env.api1publicKey
    );
    ...
  } catch(e) {
    res.status(401).json({
        errorCode: 404,
        message: "Unauthorized"
    })
  }
...  
```

# Security

DAccordo handle the encryption via @secrez/crypto, which uses TweetNaCl (https://github.com/dchest/tweetnacl-js/blob/master/README.md#public-key-authenticated-encryption-box).

## Copyright

2022 (c) [Francesco Sullo](https://francesco.sullo.co)

## License

MIT

