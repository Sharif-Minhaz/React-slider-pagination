import { useContext } from "react"
import { CommonData } from "../../contexts/CommonData"

const AdminLoginPage = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(CommonData);
  return (
    <div>AdminLoginPage</div>
  )
}

export default AdminLoginPage