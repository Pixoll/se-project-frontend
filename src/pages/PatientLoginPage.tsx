import { BackButton } from "../components/BackButton";
import LoginForm from "../components/LoginForm";

export default function PatientLoginPage() {
    return (
        <div>
            <BackButton/>
            <LoginForm type={"patient"} redirectTo={"/home"}/>
        </div>
    );
}
