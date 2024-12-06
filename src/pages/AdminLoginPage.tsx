import { BackButton } from "../components/BackButton";
import LoginForm from "../components/LoginForm";

export default function AdminLoginPage() {
    return (
        <div>
            <BackButton/>
            <LoginForm type={"admin"} redirectTo={"home"}/>
        </div>
    );
}
