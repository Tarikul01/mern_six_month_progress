import { Bangladesh } from "./data.js";
import { Helper} from './Helper.js';
import Upozial from "./Upozila.js";

 console.log("বাংলাদেশ এর সকল উপজেলা এর ওয়েবসাইট অ্যাড্রেস লিংক নিচে দেখানো হল ->->->->->->->-");
 console.log("");
Bangladesh.map((division)=>{
    const Dis=division['District'];
    const div_bn=division['bn_name'];
    // console.log(div_bn);
    Upozial(Dis,div_bn);

})