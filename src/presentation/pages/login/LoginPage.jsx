import { useContext, useState } from "react"
import AuthContext from "../context/AuthContext"
import { Extend } from "../../global/components/breakpoints/Extend"
import Lottie from "lottie-react"
import workingLottie from "../../../../assets/working.json"
import { MainButton } from "../../global/buttons/MainButton"
import { Toaster, toast } from 'sonner'
import { Icon } from "@/presentation/global/components/Icon"
import { CircularProgress } from "@/presentation/global/components/spinners/CircularProgress"
import { useNavigate } from "react-router-dom"
import { emailIcon, loginIcon, passwordIcon, visibility, visibility_off } from "@/presentation/global/constants/Icons"
import TextFormField from "../Home/components/input/TextFormField"

export const LoginPage = () => {

    const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,12}$/


    const { login } = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const [enabled, setEnabled] = useState(true)
    const [viewPassword, setViewPassword] = useState(false)

    const navigate = useNavigate()

    const onLogin = async (e) => {
        e.preventDefault();

        let emailErrorMessage = "";
        let passwordErrorMessage = "";

        // 🔹 Validación de Email
        if (!email) {
            emailErrorMessage = "Ingrese su correo electrónico";
        } else if (!emailRegEx.test(email)) {
            emailErrorMessage = "Correo electrónico inválido";
        }

        // 🔹 Validación de Password con un array de reglas
        const passwordRules = [
            { test: !password, message: "Ingrese su contraseña" },
            { test: password.includes(" "), message: "La contraseña no debe contener espacios" },
            { test: password.length < 6 || password.length > 12, message: "La contraseña debe tener entre 6 y 12 caracteres" },
            { test: !/[a-z]/.test(password), message: "Debe incluir al menos una letra minúscula" },
            { test: !/[A-Z]/.test(password), message: "Debe incluir al menos una letra mayúscula" },
            { test: !/\d/.test(password), message: "Debe incluir al menos un número" }
        ];

        // 🔹 Encuentra la primera regla que no se cumple y asigna el mensaje de error
        passwordErrorMessage = passwordRules.find(rule => rule.test)?.message || "";

        // 🔹 Actualizar los errores en el estado
        setEmailError(emailErrorMessage);
        setPasswordError(passwordErrorMessage);

        // Si hay errores, detener la ejecución
        if (emailErrorMessage || passwordErrorMessage) return;

        setEnabled(false);
        if (viewPassword) {
            setViewPassword(false);
        }

        const response = await login(email, password);

        if (response.success) {
            navigate('/');
            setEmail('');
            setPassword('');
            toast.success('¡Bienvenido!');
        } else {
            // Mostrar el mensaje de error devuelto por Firebase en el toast
            toast.error(response.message || 'No se encontró la cuenta');
        }

        setEnabled(true);
    };


    /* const onViewPassword = () => {
        setViewPassword(prev => prev = !prev)
    } */

    return (
        <Extend modifier='justify-center items-center flex min-h-screen w-full p-4'>
            <div className='flex flex-col md:flex-row gap-2 w-full'>
                <div className="hidden md:flex flex-col items-center justify-center bg-[url('assets/backgroundLogin.jpg')] bg-cover bg-center md:min-h-[720px] min-h-[384px] w-full p-4 rounded-2xl shadow-2xl">
                    <Lottie
                        className='max-w-[320px] max-h-[320px] h-full shadow-2xl rounded-2xl'
                        animationData={workingLottie}
                        loop={true}
                        autoplay={true}
                    />
                </div>

                <div className='flex flex-col items-center justify-center w-full md:max-w-[640px] p-4 bg-green-100 rounded-2xl shadow-2xl gap-4'>
                    <img
                        className='drop-shadow-2xl w-full max-w-[320px] h-full max-h-[320px] object-contain'
                        src='assets/fullLogo.png'
                        alt='fullLogo'
                    />
                    <form className='flex flex-col w-full items-center gap-2' onSubmit={onLogin}>
                        <TextFormField
                            labelText='Correo'
                            type='email'
                            enabled={enabled}
                            leftIcon={<Icon path={emailIcon} />}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={emailError != '' && true}
                            autoComplete={true}
                        />
                        {emailError != null && <p className='text-red-500 w-full'>{emailError}</p>}
                        <TextFormField
                            labelText='Contraseña'
                            type={viewPassword ? 'text' : 'password'}
                            enabled={enabled}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={passwordError != '' && true}
                            leftIcon={<Icon path={passwordIcon} />}
                        />
                        {passwordError != null && <p className='text-red-500 w-full'>{passwordError}</p>}
                        <MainButton
                            enabled={enabled}
                            onClick={onLogin}
                            rightIcon={enabled ? <Icon path={loginIcon} /> : <CircularProgress />}
                        >Ingresar
                        </MainButton>
                    </form>
                </div>
            </div>
            <Toaster richColors />
        </Extend >
    )
}