import { Link } from "react-router-dom";
import styles from "./styles.module.css";

function Login() {
	const googleAuth = () => {
		window.open(
			`http://localhost:8080/auth/google/callback`,
			"_self"
		);
	};
	
	return (
		<div className={styles.container} style={{marginTop:"10vh"}}>
					<button className={styles.google_btn} onClick={googleAuth}>
						<span>Sing in with Google</span>
					</button>
		</div>
	);
}

export default Login;
