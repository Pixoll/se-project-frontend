import LoginForm from "../components/LoginForm";

export default function AdminLoginPage() {
    return (
        <div>
            <LoginForm type={"admin"} redirectTo={"home"}/>
        </div>
    );
}
