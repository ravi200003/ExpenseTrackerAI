import { useAuth } from "../../AuthProvider";

export default function LogoutButton() {
  const { logout } = useAuth();
  return <button onClick={logout}>Logout</button>;
}
