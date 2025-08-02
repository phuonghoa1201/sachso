import { BellFilled } from "@ant-design/icons";
import { Badge } from "antd";
import avalogo from '../../assets/aiPracticeImg.png'
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";

function DashboardHeader() {
  const [user, setUser] = useState({name:"", avatar: ""})

  const {auth} = useContext(AuthContext)
  console.log(">>Check auth:", auth);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser){
      setUser(JSON.parse(storedUser));
    }
  },[])

  return (
    <header className="bg-blue-300 p-4 flex justify-end items-center gap-4">
      <div className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-blue-400 cursor-pointer">
        <Badge count={3}>
          <BellFilled className="text-xl" style={{ color: 'white'}} />
        </Badge>
      </div>
      <img
        src={user.avatar || avalogo}
        alt="avt"
        className="w-10 h-10 rounded-full object-cover"
      />
      <span className="text-sm text-white">{auth?.user?.name || "It Da nag"}</span>
    </header>
  );
}

export default DashboardHeader;
