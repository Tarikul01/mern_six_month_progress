import { Helper } from "./Helper.js";
const helper=new Helper();
const Upozila = (Dis,division) => {
  return ( Dis.map((Upozila)=>{
    // console.log(Upozila)
    const up_bn=Upozila['bn_name'];
    const url=Upozila['url']
    helper.print("বাংলাদেশ",division,up_bn,url);
})
  )
}

export default Upozila
