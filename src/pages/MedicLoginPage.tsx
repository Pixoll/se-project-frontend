import { BackButton } from "../components/BackButton";
import LoginForm from "../components/LoginForm";

export default function MedicLoginPage() {
    return (
        <div>
            <BackButton/>
            <LoginForm type={"medic"} redirectTo={"home"}/>
        </div>
    );
}
