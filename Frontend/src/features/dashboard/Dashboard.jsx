import { useAuth } from "../auth/AuthProvider";
import LogoutButton from "../auth/components/LogoutButton";

export default function Dashboard() {
  const { user, token } = useAuth();

  return (
    <div>
      <h1>Welcome, {user?.username || "User"}!</h1>
      <p>Email: {user?.email}</p>
      {token && <p>Your token (shortened): {token.slice(0, 20)}...</p>}
      <LogoutButton />
    </div>
  );
}
