import { create } from "zustand";
import { toast } from "react-toastify";
import axiosInstance from "../helper/instance";
axiosInstance.defaults.withCredentials=true;

interface User {
  _id: string;
  email: string;
  username: string;
}

interface authState {
  isauthenticated: boolean;
  ischeckAuth: boolean,
  isverified: boolean;
  resetPending: boolean;
  user: User | null;  // user can either be an object or null
  signUp: (detail: detail_types, navigate: Function) => void;
  verify: (code: string, navigate: Function) => void;
  loginUser: Function;
  logoutUser: Function;
  checkAuth: Function;
  editUser: Function;
  forgot: Function;
  reset: Function;
}

interface detail_types {
  name: string;
  email: string;
  pass: string;
}

export const useStore = create<authState>((set, get) => ({
  isauthenticated: false,
  isverified: false,
  resetPending: false,
  ischeckAuth: false,
  user: null, 
  checkAuth: async ()=>{
    set({ischeckAuth: true});
      try {
        let respone=await axiosInstance.get("/auth/check");
        set({isauthenticated: true,isverified: respone.data.user?.ischecked,ischeckAuth: false,user: respone.data.user});
      } catch (err) {
        set({isauthenticated: false,isverified: false,ischeckAuth: false});
      }
  },
  signUp: async (detail, navigate) => {
    try {
      const response = await axiosInstance.post("/auth/register", {
        email: detail.email,
        username: detail.name,
        password: detail.pass,
      });
      set((state) => ({
        ...state,
        user: response.data.user,  // Preserve other state values
        isauthenticated: true,
      }));
      toast.success(response.data.message);
      navigate("/verify");
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  },
  verify: async (code, navigate) => {
    try {
      const response = await axiosInstance.post("/auth/verify/" + get().user?._id, {
        code: code,
      });
      set({ isverified: true });
      toast.success(response.data.message);
      navigate("/"); // Uncomment to navigate to home after verification
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  },
  loginUser: async(detail: any,navigate: Function)=>{
      try {
        const response = await axiosInstance.post("/auth/login", {
         email: detail.email,
         password: detail.pass
        });
         set({user: response.data.user,isauthenticated: true,isverified: response.data.user.ischecked});
         toast.success(response.data.message);
         navigate("/");
      } catch (error: any) {
        console.log(error);
         toast.error(error?.response?.data);
      }
  },
  editUser: async (detail:any)=>{
       try {
         const response=await axiosInstance.put("/auth/edit/"+get().user?._id,{
             username: detail.name,
             email: detail.mail
         })
         set({user: response.data.user});
         toast.success(response.data.message);
       } catch (error: any) {
          toast.error(error?.response?.data)
       }
  },
  forgot: async(email: string)=>{
    try {
      const response=await axiosInstance.post("/auth/forgot",{
          email
      })
      set({resetPending: true});
      toast.success(response.data.message);
    } catch (error: any) {
       toast.error(error.response?.data?.message)
    }
  },
  reset: async(password: string,id: string,navigate:  Function)=>{
    try {
      const response=await axiosInstance.post("/auth/reset/"+id,{
          password
      })
      toast.success(response.data.message);
      set({resetPending: false})
      navigate("/")
    } catch (error: any) {
       toast.error(error?.response?.data)
    }
  },
  logoutUser: async ()=>{
      await axiosInstance.get("/auth/logout");
      set(get());
      window.location.reload();
  }
}));
