import { BrowserDoc } from "../components/BrowserDoc";

export default function Browser() {
    const containerStyle = {
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
    };

    return (
        <div className="Browser" style={containerStyle}>
            <BrowserDoc/>
        </div>
    );
}
