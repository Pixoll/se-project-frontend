import BrowserDocDoctor from "../components/BrowserDocDoctor"; // Importar el componente correcto

export default function BrowserDoctor(){
    const containerStyle = {
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
    };
    return(
        <div className="BrowserDoctor" style={containerStyle}>
            <BrowserDocDoctor/>
        </div>
    );
}
