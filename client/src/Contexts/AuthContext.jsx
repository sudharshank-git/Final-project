import {createContext, useState} from "react";

const AuthContext = createContext();

export function AuthProvider({children}) {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);


    const navigate = useNavigate();
    const location = useLocation();


    const handleLogin = async (loginFunction) => {
        setError("");
        setSubmitting(true);
        try {
            const result = await loginFunction({ email, password });
            if (result.response.length === 0) {
                setError("No user found. Please register first.");
                navigate("/register", { replace: true });
                return;
            }
            if (!result.token) {
                setError("No token received");
                return;
            }
            return result;
        } catch (err) {
            setError(err);
        } finally {
            setSubmitting(false);
        }
    };
    const handleRegister = async (registerFunction) => {
        setError("");
        setSubmitting(true);
        try {
            const result = await registerFunction({ username, email, password });
            if (result.response.length === 0) {
                setError("Cant register. Please try again.");
                navigate("/register", { replace: true });
                return;
            }
            if (!result.token) {
                setError("No token received");
                return;
            }
            return result;
        } catch (err) {
            setError(err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <AuthContext.Provider value={{ email, setEmail, password, setPassword, error, setError, submitting, setSubmitting, handleLogin, handleRegister }}>
            {children}
        </AuthContext.Provider>
    );
}

export {AuthContext} ;