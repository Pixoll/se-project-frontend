import LoginForm from "../components/LoginForm";

export default function PatientLoginPage() {
    return (
        <div>
            <LoginForm type={"patient"} redirectTo={"/home"}/>
        </div>
    );
}
