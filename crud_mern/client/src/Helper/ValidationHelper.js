import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
class ValidationHelper{
    isEmpty(value){
        if(value.length===0){
            return true
        }else{
            return false;
        }
    }
    successToast(msg){
        toast.success(msg)
    }
    errorToast(msg){
        toast.warn(msg)
    }


}
export const {isEmpty,successToast,errorToast}= new ValidationHelper;