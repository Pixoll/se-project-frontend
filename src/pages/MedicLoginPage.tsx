import LoginForm from "../components/LoginForm";

export default function MedicLoginPage() {
    return (
        <div>
            <LoginForm type={"medic"} redirectTo={"home"}/>
        </div>
    );
}
