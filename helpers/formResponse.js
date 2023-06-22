const response = (res,status,result=null) =>{
  let desc = ""
  switch(status){
    case 200:
      desc = "OK"
      break;
    case 201:
      desc = "Created"
      break;
    case 400:
      desc = "Bad Request"
      break;
    case 404:
      desc = "Not Found"
      break;
    case 401:
      desc = "Unautorized"
      break;
    case 500:
      desc = "Internal Server Error"
      break;
    case 501:
      desc = "Bad Gateway"
      break;
    case 303:
      desc = "Not Modified"
      break;
    default:
      desc= ""
  }
  const results = {
    status: status,
    description: desc,
    result: result
  }
  res.status(status).send(results)
}
module.exports = response